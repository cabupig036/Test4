const router = require("express").Router();
const Book = require("../models/Book");

router.get("/local", async (req, res) => {
  try {
      const books = await Book.find({
        "translator": "Trống"});
      res.status(200).json(books); 
  }
 catch (error) {
    res.status(500).json(err);
  } 
});
router.get("/global", async (req, res) => {
  try {
      const books = await Book.find({"translator": { $ne: "Trống"}});
      res.status(200).json(books); 
    }

 catch (error) {
    res.status(500).json(err);
  } 

});


module.exports = router;
