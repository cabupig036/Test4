const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    gmailUser: String,
    passwordHash : String,
    addressUser : String,
    isVipMember : String,
    phoneUser : String,
    Username :  String,
    profilePictureUser : String,
    Discount50 : String,
    Discount30 : String,
    PointVIP : String,
    BlackList : String,
    id : String
},);

module.exports = mongoose.model("User", UserSchema, "User");