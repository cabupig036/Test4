const mongoose = require("mongoose");
const DeliveryDetailSchema = new mongoose.Schema({
    NameProduct : String,
    PriceProduct  : String,
    WeightProduct  : String
},);

module.exports = mongoose.model("DeliveryDetail", DeliveryDetailSchema, "DeliveryDetail");