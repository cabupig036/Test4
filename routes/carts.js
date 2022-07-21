const router = require("express").Router();
const Orders = require("../models/Order");
const Users = require("../models/User");
const store = require("store");
router.get("/:gmail", async (req, res) => {
  try {
    const order = await Orders.find({
      gmail: req.params.gmail,
      isCheckout: false,
    });

    res.status(200).json(order[0].orderList);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/id/:gmail", async (req, res) => {
  try {
    const order = await Orders.find({
      gmail: req.params.gmail,
      isCheckout: false,
    });

    res.status(200).json(order[0]._id);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/:gmail", async (req, res) => {
  try {
    let newOrder = {
      bookId: req.body.bookId,
      price: req.body.price,
      amount: req.body.amount,
      bookName: req.body.bookName,
      img: req.body.img
    };

    const userInfo = await Users.find({
      gmail: req.params.gmail,
    });
    const order = await Orders.find({
      gmail: req.params.gmail,
      isCheckout: false,
    });
    if (order.length != 0) {
      let updateBookExist = false;
      await Orders.find({ gmail: req.params.gmail, isCheckout: false }).then((data) => {
        data[0].orderList.map((cartItem) => {
          console.log('log');
          if (cartItem.bookId === req.body.bookId) {
            console.log('updated');
            cartItem.amount += req.body.amount;
            updateBookExist = true
          }
        })
        data[0].save()});
      if (!updateBookExist) {
        console.log('insert new');
        var savedOrders = await Orders.updateOne(
          {
            gmail: req.params.gmail,
            isCheckout: false,
          },
          { $push: { orderList: newOrder } }
        );
      }
      res.status(200).json('ok');
    } else {
      let newOrder = {
        gmail: req.params.gmail,
        orderList: [
          {
            bookId: req.body.bookId,
            price: req.body.price,
            amount: req.body.amount,
          },
        ],
      };
      var newOrderSaved = await Orders.create(newOrder);
      res.status(200).json(newOrderSaved);
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

router.put("/:gmail", async (req, res) => {
  try {
    const currentCart = await Orders.find({
      gmail: req.params.gmail,
      isCheckout: false,
    });
    if (currentCart.length != 0) {
      var cartInDB = await Orders.find({
        gmail: req.params.gmail,
        isCheckout: false,
      }).then((cart) => {
        //https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
        cart[0].orderList.map((cartItem) => {
          if (cartItem.bookId === req.body.bookId) {
            cartItem.price = req.body.price;
            cartItem.amount = req.body.amount;
          }
        });
        cart[0].save(cartInDB);
      });
      res.status(200).json();
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.delete("/:gmail/:bookId", async (req, res) => {
  try {
    let newOrder = {
      bookId: req.params.bookId,
    };
    const order = await Orders.find({
      gmail: req.params.gmail,
      isCheckout: false,
    });
    if (order.length != 0) {
      var savedOrders = await Orders.updateOne(
        {
          gmail: req.params.gmail,
          isCheckout: false,
        },
        {
          $pull: {
            orderList: { bookId: req.params.bookId },
          },
        }
      );
      res.status(200).json(savedOrders);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
