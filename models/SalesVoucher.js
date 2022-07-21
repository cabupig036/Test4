const mongoose = require("mongoose");

const SalesVoucherSchema = new mongoose.Schema(
  {
    useVipMember: {type:boolean, default: false},
    name:String,
    discountPrice:Number,
    discountPercentage:Number,
    quantityOfVoucher:Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("SalesVoucher", SalesVoucherSchema,"SalesVoucher");
