const router = require("express").Router();

const Discount = require("../models/Discount");
const Support = require("../models/Support");
const User = require("../models/User");
const Shipper = require("../models/Shipper");
const Blog = require("../models/Blog");
const Image = require("../models/Image");
const bodyParser = require("body-parser");
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

//Xem all Blog
router.get("/allBlog", async (req, res) => {
  try {
    const blog = await Blog.find({});
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json(err);
  }
});

//Xem Blog theo ID
router.get("/:_id", async (req, res) => {
  try {
    const blog = await Blog.findById({_id:req.params._id});
    res.status(200).json(blog);
  } catch (error) {
    res.status(404).json(err);
  }
});
//Them Blog
router.post("/insertBlog", async (req, res) => {
  try {
    Blog.findOne({
      titleBlog: req.body.titleBlog
    }).exec((err, user) => {
      if (err) {
        res.json({
          message: "TitleBlog Used "
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
      let newBlog = {
        contentBlog: req.body.contentBlog,
        dateBlog: req.body.dateBlog,
        imageBlog: "http://localhost:3000/api/image/" + req.file.originalname,
        titleBlog: req.body.titleBlog,
      };
      Blog.create(newBlog, (err, blog) => {
        if (err) {
          res.status(401).json(err);
        } else {
          blog.save();
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

//Sua Blog
router.put("/updateBlog/:_id", async (req, res) => {
  try {
    Blog.findOne({
      _id: req.params._id
    }).exec((err, blog) => {
      if (err) {
        res.json({
          message: "Update Failed"
        });
      }       
      if (req.body.contentBlog == undefined ||
        req.body.dateBlog == undefined || 
        req.body.imageBlog == undefined ||
        req.body.titleBlog == undefined) {
       return res.json({
         message: "Thông tin rỗng hoặc không hợp lệ"
       });
     } 
      else {
        blog.contentBlog = req.body.contentBlog,
        blog.dateBlog = req.body.dateBlog,
        blog.imageBlog = "http://localhost:3000/api/image/" + req.file.originalname,
        blog.titleBlog = req.body.titleBlog,
        blog.save();
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

//Xoa Blog
router.get("/deleteBlog/:_id", async (req, res) => {
  try {
    const blog = await Blog.deleteOne({
      _id: req.params._id
    });
    console.log("Deleted");
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(404).json(error);
  }
});
module.exports = router;