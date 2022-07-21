const router = require("express").Router();




const {
  json
} = require("express");
const Blacklist = require("../models/Blacklist");

//Xem all User
router.get("/allBlackList", async (req, res) => {
  try {
    const blacklist = await Blacklist.find({});
    res.status(200).json(blacklist);
  } catch (error) {
    res.status(404).json(err);
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

//Xoa Blacklist
router.get("/deleteBlackList/:numberPhoneBlack", async (req, res) => {
  try {
    const blacklist = await Blacklist.deleteOne({
      numberPhoneBlack: req.params.numberPhoneBlack
    });
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;