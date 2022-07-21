const mongoose = require("mongoose");
const CODSchema = new mongoose.Schema({
    NameHolder : String,
    AccountNumber  : String,
    NameBank  : String,
    BrandBank  : String,
    PriceCOD  : String,
    PriceRefund  : String,
    PriceDelivery  : String,
    PriceTransfer  : String,
    Surplus : String,
    Status  : String,
},);

module.exports = mongoose.model("COD", CODSchema, "COD");