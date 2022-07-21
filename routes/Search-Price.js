const router = require("express").Router();
const Book = require("../models/Book");

router.get("/lte50", async (req, res) => {
  try {
      const books = await Book.find({ price: {$lte: 50000}});
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});
router.get("/range-50-150", async (req, res) => {
  try {
      const books = await Book.find( { $and: [ { price: { $gte: 50000 } }, { price: { $lte: 150000 } } ] } );
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});
router.get("/range-150-300", async (req, res) => {
  try {
      const books = await Book.find( { $and: [ { price: { $gte: 150000 } }, { price: { $lte: 300000 } } ] } );
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});

router.get("/gte300", async (req, res) => {
  try {
      const books = await Book.find( { price: {$gte: 300000}});
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});

router.get("/recomend", async (req, res) => {
  try {
      const books = await Book.find( { numberDelivery : {$gte: 10}});
      res.status(200).json(books); 
    }
 catch (error) {
    res.status(500).json(err);
  }
});


module.exports = router;
