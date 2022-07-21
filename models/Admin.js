const mongoose = require("mongoose");
const AdminSchema = new mongoose.Schema({
    passwordHash : String,
    Adminname  : String,
    addressAdmin  : String,
    gmailAdmin  : String,
    phoneAdmin  : String,
    profilePictureAdmin  : String,
    Number: String,
},);

module.exports = mongoose.model("Admin", AdminSchema, "Admin");