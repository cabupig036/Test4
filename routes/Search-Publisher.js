const router = require("express").Router();
const Book = require("../models/Book");

router.get("/:publisher", async (req, res) => {
  try {
      const books = await Book.find({
        publisher: req.params.publisher
      });
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
