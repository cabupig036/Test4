const mongoose = require("mongoose");
const OrderItemSchema = new mongoose.Schema({ bookId: String, price: Number, amount: Number, bookName: String, img:String });
const OrderSchema = new mongoose.Schema({
    gmail: String,
    orderList: [OrderItemSchema],
    isAccpeted: { type: Boolean, default: false },
    isCheckout: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model("Orders", OrderSchema, "Orders");