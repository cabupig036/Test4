const mongoose = require("mongoose");
const RecruitSchema = new mongoose.Schema({
    NameRecruit : String,
    EmailRecruit : String,
    PhoneRecruit : String,
    AddressRecruit : String,
    CV : String,
    dateRecruit : String
},);

module.exports = mongoose.model("Recruit", RecruitSchema, "Recruit");