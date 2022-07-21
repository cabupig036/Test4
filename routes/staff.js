const router = require("express").Router();

const bodyParser = require("body-parser");
const Image = require("../models/Image");
const config = require("../config/authconfig");
const User = require("../models/User");
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


//Xem all Admin
router.get("/allAdmin", async (req, res) => {
  try {
    const admin = await Admin.find({});
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json(err);
  }
});
//Xem Admin by ID
router.get("/:_id", async (req, res) => {
  try {
    const admin = await Admin.findById({_id: req.params._id});
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json(err);
  }
});

//Them Admin
router.post("/insertAdmin", async (req, res) => {
  try {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 8; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    Admin.findOne({
      gmailAdmin: req.body.gmailAdmin
    }).exec((err, user) => {
      if (err) {
        res.json({
          message: "Gmail Used "
        });
      } else {
    upload(req, res, (err) => {
      if (err) {
        return res.status(401).json(err);
      }
      const img = {
        imgName: req.file.originalname,
        image: {
          data: fs.readFileSync(path.join('img/' + req.file.filename)),
          contentType: 'image/png'
        }
      }
      Image.create(img, (err, item) => {
        if (err) {
          res.status(401).json(err);
        } else {
          item.save();
        }
      });
   
      let newAdmin = {
        
        Number : "AD" + OTP,
        Adminname: req.body.Adminname,
        addressAdmin: req.body.addressAdmin,
        gmailAdmin: req.body.gmailAdmin,
        phoneAdmin: req.body.phoneAdmin,
        profilePictureAdmin: "http://localhost:3000/api/image/" + req.file.originalname,
        dateAdmin: req.body.dateAdmin,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 8)
      };
      Admin.create(newAdmin, (err, admin) => {
        if (err) {
          res.status(401).json(err);
        } else {
          admin.save();
          return res.status(200).json("Inserted");
        }
      });
    
    });
  }
});
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
});

//Xoa Admin
router.get("/deleteAdmin/:_id", async (req, res) => {
  try {
    const admin = await Admin.deleteOne({
      _id: req.params._id
    });
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(404).json(error);
  }
});

//Sua Admin
router.put("/updateAdmin/:_id", async (req, res) => {
  try {
    Admin.findOne({
      _id: req.params._id
    }).exec((err, admin) => {
      if (err) {
        res.json({
          message: "Update Failed"
        });
      } 
      if (req.body.Adminname == undefined ||
        req.body.addressAdmin == undefined || 
        req.body.gmailAdmin == undefined ||
        req.body.phoneAdmin == undefined ||
        req.body.profilePictureAdmin == undefined) {
       return res.json({
         message: "Thông tin rỗng hoặc không hợp lệ"
       });
     } 
      else {
        admin.Adminname = req.body.Adminname,
        admin.addressAdmin = req.body.addressAdmin,
        admin.gmailAdmin = req.body.gmailAdmin,
        admin.phoneAdmin = req.body.phoneAdmin,
        admin.profilePictureAdmin = "http://localhost:3000/api/image/" + req.file.originalname,
        admin.passwordHash= bcrypt.hashSync(req.body.passwordHash, 8)
        admin.save();
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