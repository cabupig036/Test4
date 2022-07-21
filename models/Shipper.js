const mongoose = require("mongoose");
const ShipperSchema = new mongoose.Schema({
    passwordHash : String,
    Shippername  : String,
    addressShipper  : String,
    gmailShipper  : String,
    phoneShipper  : String,
    profilePictureShipper  : String,
    Number:String,
},);

module.exports = mongoose.model("Shipper", ShipperSchema, "Shipper");