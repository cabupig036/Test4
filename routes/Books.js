const router = require("express").Router();
const Book = require("../models/Book");
const Image = require("../models/Image");
const {
  json
} = require("express");
// const session = require('express-session');
const multer = require("multer");
const fs = require('fs');
const path = require('path');
//Storage
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({
  storage: Storage
}).single('image');


router.post("/insertBook", async (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        return res.status(401).json(err);
      }
      const img = {
        imgName: req.file.originalname,
        image: {
          data: fs.readFileSync(path.join('img/' + req.file.filename)),
          contentType: 'image/png'
        }
      }
      Image.create(img, (err, item) => {
        if (err) {
          res.status(401).json(err);
        } else {
          item.save();
        }
      });
      let newBook = {
        name: req.body.name,
        publisher: req.body.publisher,
        suppiler: req.body.suppiler,
        numberInStock: req.body.numberInStock,
        numberDelivery: req.body.numberDelivery,
        author: req.body.author,
        translator: req.body.translator,
        publishYear: req.body.publishYear,
        bookLayout: req.body.bookLayout,
        price: req.body.price,
        quantityOfPage: req.body.quantityOfPage,
        describe: req.body.describe,
        img: "https://serverbookstore.herokuapp.com/api/image/" + req.file.originalname,
      };
      console.log(newBook);
      Book.create(newBook, (err, book) => {
        if (err) {
          res.status(401).json(err);
        } else {
          book.save();
          return res.status(200).json("Inserted");
        }
      });
    
    });
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
});
router.get("/id/:id", async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:name", async (req, res) => {
  try {
    const books = await Book.find({
      name: req.params.name
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({

    });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/delete/:_id", async (req, res) => {
  try {
    const books = await Book.deleteOne({
      _id: req.params._id
    });
    console.log("Deleted");
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/updateBook/:_id", async (req, res) => {
  try {
    Book.findOne({
      _id: req.params._id
    }).exec((err, book) => {
      if (err) {
        res.json({
          message: "Update Failed"
        });
      } else {
        upload(req, res, (err) => {
          if (err) {
            res.status(304).json(err);
          } else {
            const img = {
              imgName: req.file.originalname,
              image: {
                data: fs.readFileSync(path.join('img/' + req.file.filename)),
                contentType: 'image/png'
              }
            }
            Image.create(img, (err, item) => {
              if (err) {
                res.status(401).json(err);
              } else {
                item.save();
              }
            });
            book.name = req.body.name;
            book.publisher = req.body.publisher;
            book.suppiler = req.body.suppiler;
            book.numberInStock = req.body.numberInStock;
            book.numberDelivery = req.body.numberDelivery;
            book.author= req.body.author;
            book.translator = req.body.translator;
            book.publishYear = req.body.publishYear;
            book.bookLayout = req.body.bookLayout;
            book.price = req.body.price;
            book.quantityOfPage = req.body.quantityOfPage;
            book.describe = req.body.describe;
            if (req.file != undefined) {
              book.img = "https://serverbookstore.herokuapp.com/api/image/" + req.file.originalname;
            }
            book.save();
            return res.status(200).json({
              message: "Update Completely"
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});
router.get("/review/:id", async (req, res) => {
  try {
    const books = await Book.findById(req.params.name);
    res.status(200).json(books.rating);
  } catch (error) {
    res.status(500).json(err);
  }
});
module.exports = router;