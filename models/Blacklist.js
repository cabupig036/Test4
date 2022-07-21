const mongoose = require("mongoose");
const BlacklistSchema = new mongoose.Schema({
    numberPhoneBlack : String,
    addressUser : String,
    Username : String,
    profilePictureUser : String,
    Number : String,
},);

module.exports = mongoose.model("Blacklist", BlacklistSchema, "Blacklist");