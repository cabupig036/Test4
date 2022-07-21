const mongoose = require("mongoose");
const SupportSchema = new mongoose.Schema({
    TitleSupport : String,
    ContentSupport  : String,
    ImageSupport  : String,
    EmailSupport  : String,
    DateSupport  : String
},);

module.exports = mongoose.model("Support", SupportSchema, "Support");