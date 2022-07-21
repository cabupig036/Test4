const mongoose = require("mongoose");
const OderSchema = new mongoose.Schema({
    phoneRev : String,
    nameRev : String,
    city : String,
    district : String,
    ward : String,
    address : String,
    addressDetail: String,
    cod : String,
    price : String,
    productImg : String,
    detailsPro : String,
    Note : String,
    optionsPayment : String,
    gmailUserSend: String,
    status : String,
},);

module.exports = mongoose.model("Oder", OderSchema, "Oder");