const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({ gmail: String, ratingValue: Number, ratingDate: { type: Date, default: Date.now }, commentText: String, username: String })
const BookSchema = new mongoose.Schema({
    name: String,
    publisher: String,
    suppiler: String,
    numberInStock: Number,
    numberDelivery: Number,
    rating: [ratingSchema],
    author: String,
    translator: String,
    publishYear: Number,
    bookLayout: String,
    price: Number,
    quantityOfPage: Number,
    describe: String,
    img: [String]
}, { timestamps: true });

module.exports = mongoose.model("Books", BookSchema, "Books");