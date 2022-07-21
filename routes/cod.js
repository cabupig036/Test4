const router = require("express").Router();

const bodyParser = require("body-parser");
const Image = require("../models/Image");
const config = require("../config/authconfig");
const User = require("../models/User");
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



//Xem all User
router.get("/allUser", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});
//Xem User bang ID
router.get("/:_id", async (req, res) => {
  try {
    const user = await User.findById({ 
      _id : req.params._id
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
  }
});
//Them user
router.post("/insertUser", async (req, res) => {
  try {
    User.findOne({
      gmailUser: req.params.gmailUser
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
      let newUser = {
        isVipMember: "False", //Auto ko can them
        Username: req.body.Username,
        profilePictureUser: "http://localhost:3000/api/image/" + req.file.originalname,
        gmailUser: req.body.gmailUser,
        addressUser: req.body.addressUser,
        phoneUser: req.body.phoneUser,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 8),
      }
      console.log(newUser)
      User.create(newUser, (err, users) => {
        if (err) {
          res.status(401).json(err);
        } else {
          users.save();
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


//Xoa User
router.get("/deleteUser/:_id", async (req, res) => {
  try {
    const user = await User.deleteOne({
      _id: req.params._id
    });
    console.log("Deleted");
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(404).json(error);
  }
});

//Sua user
router.put("/updateUser/:_id", async (req, res) => {
  try {
    User.findOne({
      gmailUser: req.params.gmailUser
    }).exec((err, user) => {
      if (err) {
        res.json({
          message: "Update Failed"
        });
      } 
      if (req.body.Username == undefined ||
        req.body.isVipMember == undefined || 
        req.body.gmailUser == undefined ||
        req.body.addressUser == undefined ||
        req.body.phoneUser == undefined) {
       return res.json({
         message: "Thông tin rỗng"
       });
     } 
      else {
        user.isVipMember = req.body.isVipMember,
        user.Username = req.body.Username,
        user.profilePictureUser = req.body.profilePictureUser,
        user.gmailUser = req.body.gmailUser,
        user.addressUser = req.body.addressUser,
        user.phoneUser = req.body.phoneUser,
        user.passwordHash= bcrypt.hashSync(req.body.passwordHash, 8)
        user.save();
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

//Ap dung discount
router.put("/useDiscount/:gmailUser", async(req, res) => {
  try {
      User.findOne({
        gmailUser: req.params.gmailUser
      }).exec((err, user) => {
        if(user.Discount30 != "1"){
          res.status(404).json({"message":"Yes"});
        }
      });
    } catch (error) {
      res.status(404).json("Update Fail");
    }
  });
//Block user to Blacklist
router.put("/addBlacklist/:phoneUser", async(req, res) => {
  try {
      User.findOne({
        phoneUser: req.params.phoneUser
      }).exec((err, user) => {
          user.BlackList = "true";
          user.save();
          return res.status(200).json({
            message: "Update Completely"
          })
      });
    } catch (error) {
      res.status(404).json("Update Fail");
    }
  });

//Unblock user to Blacklist
router.put("/unblockBlacklist/:phoneUser", async(req, res) => {
  try {
      User.findOne({
        phoneUser: req.params.phoneUser
      }).exec((err, user) => {
          user.BlackList = "false";
          user.save();
          return res.status(200).json({
            message: "Update Completely"
          })
      });
    } catch (error) {
      res.status(404).json("Update Fail");
    }
  });

  //Them Blacklist
router.post("/insertBlackList", async (req, res) => {
  try {
      let newBlacklist = {
        numberPhoneBlack: req.body.numberPhoneBlack,
        addressUser: req.body.addressUser,
        Username: req.body.Username,
        profilePictureUser: req.body.profilePictureUser,
        Number: req.body.Number,

      };
      if (req.body.numberPhoneBlack == undefined ||
        req.body.Username == undefined ||
        req.body.addressUser == undefined ||
        req.body.profilePictureUser == undefined) {
       return res.json({
         message: "Thông tin rỗng"
       });
     } else{
      Blacklist.create(newBlacklist, (err, blacklist) => {
        if (err) {
          res.status(401).json(err);
        } else {
          blacklist.save();
          return res.status(200).json("Inserted");
        }
      });
    }
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
});
router.get("/OTP", async(req, res) => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return res.status(200).json({OTP});
  });

module.exports = router;