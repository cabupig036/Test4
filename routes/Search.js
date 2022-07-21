const router = require("express").Router();
const Book = require("../models/Book");

//--------------------Search Price with Translator------------------//

router.get("/SearchAll/:number", async (req, res) => {
  var number = req.params.number;
  console.log(typeof (number));
  switch (number) {
    case "1":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $ne: "Trống"
            }
          }, {
            price: {
              $lte: 50000
            }
          }]
        });
        res.status(200).json(books);

      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "2":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $ne: "Trống"
            }
          }, {
            price: {
              $gte: 50000
            }
          }, {
            price: {
              $lte: 150000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "3":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $ne: "Trống"
            }
          }, {
            price: {
              $gte: 150000
            }
          }, {
            price: {
              $lte: 300000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "4":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $ne: "Trống"
            }
          }, {
            price: {
              $gte: 300000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;



    case "5":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $eq: "Trống"
            }
          }, {
            price: {
              $lte: 50000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "6":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $eq: "Trống"
            }
          }, {
            price: {
              $gte: 50000
            }
          }, {
            price: {
              $lte: 150000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "7":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $eq: "Trống"
            }
          }, {
            price: {
              $gte: 150000
            }
          }, {
            price: {
              $lte: 300000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "8":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $eq: "Trống"
            }
          }, {
            price: {
              $gte: 300000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;



    case "9":
      try {
        const books = await Book.find({
          $and: [{
            publisher: req.body.publisher
          }, {
            price: {
              $lte: 50000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "10":
      try {
        const books = await Book.find({
          $and: [{
            publisher: req.body.publisher
          }, {
            price: {
              $gte: 50000
            }
          }, {
            price: {
              $lte: 150000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "11":
      try {
        const books = await Book.find({
          $and: [{
            publisher: req.body.publisher
          }, {
            price: {
              $gte: 150000
            }
          }, {
            price: {
              $lte: 300000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "12":
      try {
        const books = await Book.find({
          $and: [{
              publisher: req.body.publisher
            },
            {
              price: {
                $gte: 300000
              }
            }
          ]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;




    case "13":
      try {
        const books = await Book.find({
          $and: [{
            publisher: req.body.publisher
          }, {
            translator: {
              $ne: "Trống"
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "14":
      try {
        const books = await Book.find({
          $and: [{
            publisher: req.body.publisher
          }, {
            translator: {
              $eq: "Trống"
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;



    case "15":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $ne: "Trống"
            }
          }, {
            publisher: req.body.publisher
          }, {
            price: {
              $lte: 50000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "16":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $ne: "Trống"
            }
          }, {
            publisher: req.body.publisher
          }, {
            price: {
              $gte: 50000
            }
          }, {
            price: {
              $lte: 150000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "17":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $eq: "Trống"
            }
          }, {
            publisher: req.body.publisher
          }, {
            price: {
              $gte: 150000
            }
          }, {
            price: {
              $lte: 300000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "18":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $eq: "Trống"
            }
          }, {
            publisher: req.body.publisher
          }, {
            price: {
              $gte: 300000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;


    case "19":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $ne: "Trống"
            }
          }, {
            publisher: req.body.publisher
          }, {
            price: {
              $lte: 50000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "20":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $ne: "Trống"
            }
          }, {
            publisher: req.body.publisher
          }, {
            price: {
              $gte: 50000
            }
          }, {
            price: {
              $lte: 150000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "21":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $ne: "Trống"
            }
          }, {
            publisher: req.body.publisher
          }, {
            price: {
              $gte: 150000
            }
          }, {
            price: {
              $lte: 300000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case "22":
      try {
        const books = await Book.find({
          $and: [{
            translator: {
              $ne: "Trống"
            }
          }, {
            publisher: req.body.publisher
          }, {
            price: {
              $gte: 300000
            }
          }]
        });
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json(error);
      }
      break;

  }
});


module.exports = router;