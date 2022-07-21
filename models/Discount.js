const mongoose = require("mongoose");
const DiscountSchema = new mongoose.Schema({
    gmailUser : String,
    Discount30  : String,
    Discount50  : String,
},);

module.exports = mongoose.model("Discount", DiscountSchema, "Discount");