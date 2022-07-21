const router = require("express").Router();
const { ObjectId } = require("bson");
const { crossOriginResourcePolicy } = require("helmet");
const Books = require("../models/Book");
const Users = require("../models/User");



router.get("/", async(req, res) => {
    try {
        const books = await Books.find({

        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:_id", async(req, res) => {
    try {
        const book = await Books.find({
            _id: req.params._id

        });

        var ratingUser;
        book.forEach(item => {
            var ratings = item.rating;
            ratings.forEach((r) => {
                if (r.gmail == req.body.gmail) {
                    ratingUser = r;
                }
            })

        });

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/:_id", async(req, res) => {
    try {
        var user = await Users.find({
            gmail: req.body.gmail,
        });

        console.log("user: ", user.length);

        var newRating = {};
        if (user.length != 0) {
            newRating = {
                gmail: req.body.gmail,
                ratingValue: req.body.ratingValue,
                commentText: req.body.commentText,
                username: user[0].username
            };

        } else {
            newRating = {
                gmail: req.body.gmail,
                ratingValue: req.body.ratingValue,
                commentText: req.body.commentText,
                username: "Người Dùng Ẩn Danh"
            };
        }


        console.log("newRating:", newRating);
        if (req.body.ratingValue >= 1 && req.body.ratingValue <= 5) {
            const book = await Books.find({
                _id: req.params._id,
            });

            var bookI = await Books.find({
                _id: req.params._id,
            }).then((a) => {
                try {
                    a.forEach((v) => {
                        var ratingList = v.rating;
                        // var checkMail = false;
                        // ratingList.forEach((i) => {
                        //     if (i.gmail == req.body.gmail) {
                        //         checkMail = true;
                        //     }
                        // });
                        // if (checkMail) {
                        //     res.status(200).json({ 'status': 400, 'message': 'Mail existed ' });
                        // } else {
                        //ratingList.push(req.body);
                        // }

                        ratingList.push(newRating);
                        v.save(bookI);
                    });
                    res.status(200).json({ 'status': 200, 'message': 'Add commentText Success!! ' });

                } catch (error) {
                    res.status(500).json({
                        'status': '500',
                        'message': 'Add commentText Failed!!'
                    });
                }
            });

        } else {
            res.status(500).json({ 'status': 500, 'message': 'RatingValue >= 1 && RatingValue <= 5, Could you insert again!' });
        }
    } catch (error) {

        res.status(500).json({ 'status': 500, 'message': 'Add commentText Failed!!' });
    }
});


router.put("/:_id", async(req, res) => {
    try {
        if (req.body.ratingValue >= 1 && req.body.ratingValue <= 5) {
            const currentBook = await Books.find({
                _id: req.params._id,
            });
            if (currentBook.length != 0) {
                var bookC = await Books.find({
                    _id: req.params._id,
                }).then((b) => {
                    try {
                        b.forEach((c) => {
                            c.rating.map((item) => {
                                if (item.gmail === req.body.gmail) {
                                    item.ratingValue = req.body.ratingValue;
                                }
                            });
                            c.save(bookC);
                        });
                    } catch (error) {
                        // console.log(error);
                        res.status(500).json({ 'status': 500, 'message': ' Update Failed ' });
                    }
                });
                const cb = await Books.find({
                    _id: req.params._id,
                });
                res.status(200).json({ 'status': 200, 'message': 'Updated success ' });
            } else {
                res.status(500).json({ 'status': 500, 'message': ' _id not exists ' });
            }
        } else {
            res.status(500).json({ 'status': 500, 'message': 'RatingValue >= 1 && RatingValue <= 5, Could you update again!' });
        }
    } catch (error) {

        res.status(500).json({ 'status': 500, 'message': ' Update Failed ' });
    }

});

//sap xep comment rating theo comment moi nhat

router.get("/commentSort/:_id", async(req, res) => {
    try {
        const book = await Books.find({
            _id: req.params._id
        });

        var commentSort = [];
        book[0].rating.forEach((b) => {
            console.log("b:", b);
            commentSort.unshift(b);
        });

        res.status(200).json(commentSort);

    } catch (error) {
        res.status(500).json({ 'status': 500, 'message': '_id book not exists' });
    }
});

module.exports = router;