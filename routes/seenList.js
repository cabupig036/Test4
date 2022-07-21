const router = require("express").Router();
const Users = require("../models/User");
router.get("/:gmail", async (req, res) => {
  try {
    const user = await Users.find({
      gmail: req.params.gmail,
    });
    res.status(200).json(user[0].seenList);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:gmail", async (req, res) => {
  try {
    const user = await Users.find({
      gmail: req.params.gmail,
    });
    if (user[0].seenList.length < 5) {
      let alreadyExist = false;
      user[0].seenList.map((element)=>{
        if (element.bookId === req.body.bookId) {
          alreadyExist = true;
        }
      })
      if (!alreadyExist) {
        await Users.updateOne({
          gmail: req.params.gmail,
        },{
          $push:{
            seenList: {
              bookId: req.body.bookId,
              price: req.body.price,
              amount: req.body.amount,
              bookName: req.body.bookName,
              img: req.body.img
            }
          }
        })
        const user = await Users.find({
          gmail: req.params.gmail,
        });
        res.status(200).json(user);
      }
    } else {
      try {
        const user = await Users.find({
          gmail: req.params.gmail,
        });
        let alreadyExist = false;
      user[0].seenList.map((element)=>{
        if (element.bookId === req.body.bookId) {
          alreadyExist = true;
        }
      })
      if (!alreadyExist) {
        let index = user[0].seenList.length - 1;
        user[0].seenList.map((element) => {
          if (index != 0) {
            user[0].seenList[index].bookId = user[0].seenList[index - 1].bookId;
            user[0].seenList[index].price = user[0].seenList[index - 1].price;
            user[0].seenList[index].amount = user[0].seenList[index - 1].amount;
            user[0].seenList[index].bookName = user[0].seenList[index - 1].bookName;
            user[0].seenList[index].img = user[0].seenList[index - 1].img;
            index--;
          }
        });
        user[0].seenList[0].bookId = req.body.bookId;
        user[0].seenList[0].price = req.body.price;
        user[0].seenList[0].amount = req.body.amount;
        user[0].seenList[0].bookName = req.body.bookName;
        user[0].seenList[0].img =req.body.img
        user[0].save();
        res.status(200).json(user[0].seenList);
      }else{
        res.status(200).json(user[0].seenList);
      }} catch (error) {
        res.status(500).json(error);
        console.log(error);
      }
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    if (req.body.gmail == "admin@gmail.com") {
      const orders = await Orders.find({});
      res.status(200).json(orders);
    } else {
      res.status(404).json("Not have permission");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});


module.exports = router;
