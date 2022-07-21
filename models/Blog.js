const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
    contentBlog : String,
    imageBlog  : String,
    titleBlog  : String,
    dateBlog : String
},);

module.exports = mongoose.model("Blog", BlogSchema, "Blog");