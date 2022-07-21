const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    orderId: String,
    isDelivery: {type:Boolean, default: false},
    isSucessful: {type:Boolean, default: false},
    paymentMethod:String,
    totalPayment: Number,
    gmail: String,
    sdt:String,
    address:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", BillSchema,"Bill");
