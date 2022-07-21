const router = require("express").Router();
const Book = require("../models/Book");

router.get("/:suppiler", async (req, res) => {
  try {
      const books = await Book.find({
        suppiler: req.params.suppiler
      });
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
