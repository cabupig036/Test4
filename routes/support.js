const router = require("express").Router();

const Discount = require("../models/Discount");
const Support = require("../models/Support");
const User = require("../models/User");
const Shipper = require("../models/Shipper");
const Blog = require("../models/Blog");
const bodyParser = require("body-parser");
const Image = require("../models/Image");
const config = require("../config/authconfig");
const Admin = require("../models/Admin");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



const {
  json
} = require("express");

// const session = require('express-session');
const multer = require("multer");
const fs = require('fs');
const path = require('path');
//Storage
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({
  storage: Storage
}).single('image');


//Xem Support
router.get("/allSupport", async (req, res) => {
  try {
    const support = await Support.find({});
    res.status(200).json(support);
  } catch (error) {
    res.status(404).json(err);
  }
});

//Xem Support by ID
router.get("/:_id", async (req, res) => {
  try {
    const support = await Support.findById({ _id : req.params._id});
    res.status(200).json(support);
  } catch (error) {
    res.status(404).json(err);
  }
});
//Them support
router.post("/insertSupport", async (req, res) => {
  try {
    Support.findOne({
      TitleSupport: req.body.TitleSupport
    }).exec((err, user) => {
      if (err) {
        res.json({
          message: "TitleSupport Used "
        });
      } else {
      let newSupport = {
        TitleSupport: req.body.TitleSupport,
        ContentSupport: req.body.ContentSupport,
        ImageSupport: req.body.ImageSupport,
        EmailSupport: req.body.EmailSupport,
        DateSupport: req.body.DateSupport,
      };
      if (req.body.TitleSupport == undefined ||
        req.body.ContentSupport == undefined || 
        req.body.ImageSupport == undefined ||
        req.body.EmailSupport == undefined ||
        req.body.DateSupport == undefined) {
       return res.json({
         message: "Thông tin rỗng hoặc không hợp lệ"
       });
     } else {
      Support.create(newSupport, (err, support) => {
        if (err) {
          res.status(401).json(err);
        } else {
          support.save();
          return res.status(200).json("Inserted");
        }
      });
     }
    }
  });
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
});

//Xoa Support
router.get("/deleteSupport/:_id", async (req, res) => {
  try {
    const support = await Support.deleteOne({
      _id: req.params._id
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

//Sua Support
router.put("/updateSupport/:_id", async (req, res) => {
  try {
    Support.findOne({
      _id: req.params._id
    }).exec((err, support) => {
      if (err) {
        res.json({
          message: "Update Failed"
        });
      } 
      if (req.body.TitleSupport == undefined ||
        req.body.ContentSupport == undefined || 
        req.body.ImageSupport == undefined ||
        req.body.EmailSupport == undefined ||
        req.body.DateSupport == undefined) {
       return res.json({
         message: "Thông tin rỗng"
       });
     } 
      else {
        support.TitleSupport =  req.body.TitleSupport,
        support.ContentSupport = req.body.ContentSupport,
        support.ImageSupport= "http://localhost:3000/api/image/" + req.file.originalname,
        support.EmailSupport= req.body.EmailSupport,
        support.DateSupport= req.body.DateSupport,
        support.save();
            return res.status(200).json({
              message: "Update Completely"
            });
          }
    });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});
module.exports = router;