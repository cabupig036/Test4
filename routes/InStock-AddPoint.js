const router = require("express").Router();
const Book = require("../models/Book");
const Bills = require("../models/Bill");
const Orders = require("../models/Order");
const User = require("../models/User");

router.put("/:_id", async (req, res) => {
    try {
        Bills.findOne({
            _id: req.params._id
        }).exec((err, bill) => {
            if (err) {
                res.status(500).json({
                    message: "Không tìm thấy Bill này"
                });
            } else {
                if (bill.isSucessful == true) {
                    Orders.findOne({
                        _id: bill.orderId
                    }).exec((err, order) => {
                        if (err) {
                            res.status(500).json({
                                message: "Không tìm thấy Order này"
                            });
                        } else {
                            order.orderList.forEach((item) => {
                                Book.findOne({
                                    name: item.bookName
                                }).exec((err, book) => {
                                    if (err) {
                                        res.status(500).json({
                                            message: "Không tìm thấy Book này"
                                        });
                                    } else {
                                        book.numberDelivery = book.numberDelivery - item.amount;
                                        book.save();
                                    }
                                });
                            });
                            res.status(200).json({
                                message: "Update Completely"
                            })
                        }
                    });
                } else {
                    Orders.findOne({
                        _id: bill.orderId
                    }).exec((err, order) => {
                        if (err) {
                            res.status(500).json({
                                message: "Không tìm thấy Order này"
                            });
                        } else {
                            order.orderList.forEach((item) => {
                                Book.findOne({
                                    name: item.bookName
                                }).exec((err, book) => {
                                    if (err) {
                                        res.status(500).json({
                                            message: "Không tìm thấy Book này"
                                        });
                                    } else {
                                        book.numberInStock = book.numberInStock + item.amount;
                                        book.save();
                                    }
                                });
                            });
                            res.status(200).json({
                                message: "Update Completely"
                            });
                        }
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
});
module.exports = router;