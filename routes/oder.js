const router = require("express").Router();

const Discount = require("../models/Discount");
const Support = require("../models/Support");
const Users = require("../models/User");
const Admin = require("../models/Admin");
const Shipper = require("../models/Shipper");
const Blog = require("../models/Blog");
const Oder = require("../models/Oder");
const sendMail = require("../common/email");
const bodyParser = require("body-parser");
const Image = require("../models/Image");
const config = require("../config/authconfig");
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
}).fields([{
  name: "image",
  maxCount: 1
}, {
  name: "imageProduct",
  maxCount: 1
}]);


//Them don
router.post("/insertOder/:gmailUser", async (req, res) => {
  try {
    var imageSP = "";
    var imagePro = "";

    upload(req, res, (err) => {
      if (err) {
        return res.status(401).json(err);
      }
      if (req.files.image == undefined || req.files.imageProduct == undefined) {
        return res.status(404).json({
          messeger: "Them hinh please"
        })
      } else {
        const img = {
          imgName: req.files.image[0].originalname,
          image: {
            data: fs.readFileSync(path.join('img/' + req.files.image[0].filename)),
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
        const IMG = {
          imgName: req.files.imageProduct[0].originalname,
          image: {
            data: fs.readFileSync(path.join('img/' + req.files.imageProduct[0].filename)),
            contentType: 'image/png'
          }
        }
        Image.create(IMG, (err, item) => {
          if (err) {
            res.status(401).json(err);
          } else {
            item.save();
          }
        });
        imagePro = req.files.imageProduct[0].originalname;


        imageSP = req.files.image[0].originalname;


        let newOder = {
          phoneRev: req.body.phoneRev,
          nameRev: req.body.nameRev,
          city: req.body.city,
          district: req.body.district,
          ward: req.body.ward,
          address: req.body.address,
          addressDetail: req.body.address + " " + req.body.ward + " " + req.body.district + " " + req.body.city,
          cod: req.body.cod,
          price: req.body.price,
          productImg: "http://localhost:3000/api/image/" + imagePro,
          detailsPro: "http://localhost:3000/api/image/" + imageSP,
          Note: req.body.Note,
          optionsPayment: req.body.optionsPayment,
          status: "Waiting",
        };
        Oder.create(newOder, (err, oder) => {
          if (err) {
            res.status(401).json(err);
          } else {
            oder.save();

            function sendOder(newOder) {
              return `<table class="body-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">
                      <tbody>
                          <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                              <td style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>
                              <td class="container" width="600" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">
                                  <div class="content" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">
                                      <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope="" itemtype="http://schema.org/ConfirmAction" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; margin: 0; border: none;">
                                          <tbody><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                              <td class="content-wrap" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;padding: 30px;border: 3px solid #67a8e4;border-radius: 7px; background-color: #fff;" valign="top">
                                                  <meta itemprop="name" content="Confirm Email" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                  <table width="100%" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                      <tbody><tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                          Congratulations, You Have Successfully Create New Oder.
                                                          </td>
                                                      </tr>
                                                      <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                          nameRev: <b>${req.body.nameRev}</b>
                                                          </td>
                                                      </tr>
                                                      <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                      <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                      phoneRev: <b>${req.body.phoneRev}</b>
                                                      </td>
                                                  </tr>
                                                  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                  <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                  address: <b>${req.body.address}</b>
                                                  </td>
                                              </tr>
                                              <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                              <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                              ward: <b>${req.body.ward}</b>
                                              </td>
                                          </tr>
                                          <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                          district: <b>${req.body.district}</b>
                                          </td>
                                      </tr>
                                      <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                      <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                      city: <b>${req.body.city}</b>
                                      </td>
                                  </tr>
                                  <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                  <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                  cod: <b>${req.body.cod}</b>
                                  </td>
                              </tr>
                          <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                          price: <b>${req.body.price}</b>
                          </td>
                          </tr>
                          <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                          Note: <b>${req.body.Note}</b>
                          </td>
                          </tr>
                          <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                          optionsPayment: <b>${req.body.optionsPayment}</b>
                          </td>
                          </tr>
                          <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                          status: <b>Waiting</b>
                          </td>
                          </tr>
                          <tr style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">
                                                          <td class="content-block" style="font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">
                                                              <b>Admin</b>
                                                              <p>Support Team</p>
                                                          </td>
                                                      </tr>
                  
                                                  </tbody></table>
                                              </td>
                                          </tr>
                                      </tbody></table>
                                  </div>
                              </td>
                          </tr>
                      </tbody>
                  </table>`;

            }

            var togmail = req.params.gmailUser;
            console.log("togmail: " + togmail);
            console.log(newOder);
            var user = Users.findOne({
              // _id: req.body._id,
              gmailUser: req.params.gmailUser
            });

            try {
              let body = sendOder(newOder);
              sendMail(togmail, "Send Oder", body);
              res.status(200).json({
                "status": 200,
                "message": "Send Oder Success"
              });


            } catch (error) {

              res.status(500).json(user);
            }
          }
        });
      }

    })
  } catch (error) {
    res.status(404).json(error);
    console.log(error);
  }
});

//Xem all Oder
router.get("/allOder", async (req, res) => {
  try {
    const oder = await Oder.find({});
    res.status(200).json(oder);
  } catch (error) {
    res.status(404).json(error);
  }
});
//Xem all Oder
router.get("/:_id", async (req, res) => {
  try {
    const oder = await Oder.findById({
      _id: req.params._id
    });
    res.status(200).json(oder);
  } catch (error) {
    res.status(404).json(error);
  }
});
//Xem hang dang giao
router.get("/allOder/Delivering", async (req, res) => {
  try {
    const oder = await Oder.find({
      status: {
        $eq: "Delivering"
      }
    });
    res.status(200).json(oder);
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem hang hoan thanh
router.get("/allOder/Completed", async (req, res) => {
  try {
    const oder = await Oder.find({
      status: {
        $eq: "Completed"
      }
    });
    res.status(200).json(oder);
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem hang da huy
router.get("/allOder/Canceled", async (req, res) => {
  try {
    const oder = await Oder.find({
      status: {
        $eq: "Canceled"
      }
    });
    res.status(200).json(oder);
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem hang chua duoc shipper nhan
router.get("/allOder/Inventory", async (req, res) => {
  try {
    const oder = await Oder.find({
      status: {
        $eq: "inventory"
      }
    });
    res.status(200).json(oder);
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem hang cho lay
router.get("/allOder/Pickup", async (req, res) => {
  try {
    const oder = await Oder.find({
      status: {
        $eq: "Pickup"
      }
    });
    res.status(200).json(oder);
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem hang chua duoc shipper nhan
router.get("/allOder/Waiting", async (req, res) => {
  try {
    const oder = await Oder.find({
      status: {
        $eq: "Waiting"
      }
    });
    res.status(200).json(oder);
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xoa don
router.get("/deleteOder/:_id", async (req, res) => {
  try {

    const oder = await Oder.deleteOne({
      _id: req.params._id
    });
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(404).json(error);
  }
});

//Sua don
router.put("/updateOder/:_id", async (req, res) => {
  try {
    Oder.findOne({
      _id: req.params._id
    }).exec((err, oder) => {
      if (err) {
        res.json({
          message: "Update Failed"
        });
      }
      oder.NameOder = req.body.NameOder,
        oder.OptionsPayment = req.body.OptionsPayment,
        oder.cod = req.body.cod,
        oder.OptionsDelivery = req.body.OptionsDelivery,
        oder.DateOder = req.body.DateOder,
        oder.ImageOder = req.body.ImageOder,
        oder.NoteOder = req.body.NoteOder,
        oder.RevAddress = req.body.RevAddress,
        oder.RevName = req.body.RevName,
        oder.RevPhone = req.body.RevPhone,
        oder.phoneUser = req.body.phoneUser,
        oder.status = req.body.status,
        oder.save();
      return res.status(200).json({
        message: "Update Completely"
      });
    });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

//Hoan thanh
router.put("/CompletedOder/:_id", async (req, res) => {
  try {
    Oder.findOne({
      _id: req.params._id
    }).exec((err, oder) => {
      oder.status = "Completed";
      oder.save();
      return res.status(200).json({
        message: "Completed"
      })
    });
  } catch (error) {
    res.status(404).json("Fail");
  }
});

//Huy don
router.put("/CancelOder/:_id", async (req, res) => {
  try {
    Oder.findOne({
      _id: req.params._id
    }).exec((err, oder) => {
      oder.status = "Canceled";
      oder.save();
      return res.status(200).json({
        message: "Canceled"
      })
    });
  } catch (error) {
    res.status(404).json("Fail");
  }
});

//Dang giao
router.put("/DeliveringOder/:_id", async (req, res) => {
  try {
    const shipper = await Shipper.findById(req.body.id);
    Oder.findOne({
      _id: req.params._id
    }).exec((err, oder) => {
      oder.status = "Delivering";
      oder.Number = shipper.gmailShipper
      oder.save();
      shipper.Number++;
      return res.status(200).json({
        message: "Delivering"
      })
    });

  } catch (error) {
    res.status(404).json("Fail");
  }
});

//Chờ lay hang
router.put("/WaitingOder/:_id", async (req, res) => {
  try {
    Oder.findOne({
      _id: req.params._id
    }).exec((err, oder) => {
      oder.status = "Waiting";
      oder.save();
      return res.status(200).json({
        message: "Waiting"
      })
    });
  } catch (error) {
    res.status(404).json("Fail");
  }
});

//Đang chờ bàn giao
router.put("/Pickup/:_id", async (req, res) => {
  try {
    Oder.findOne({
      _id: req.params._id
    }).exec((err, oder) => {
      oder.status = "Pickup";
      oder.save();
      return res.status(200).json({
        message: "Pickup"
      })
    });
  } catch (error) {
    res.status(404).json("Fail");
  }
});

//#####################################################
//Xem đơn hoàn thành bằng SDT của User
router.get("/CompletedView/:idUser", async (req, res) => {
  try {
    User.findOne({
      idUser: req.params.idUser
    }).exec((err, users) => {
      if (err) {
        res.json({
          message: "Failed"
        });
      } else {
        const oder = Oder.find({
          status: {
            $eq: "Completed"
          }
        });
        res.status(200).json(oder);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem đơn đã hủy bằng SDT của User
router.get("/CanceledView/:idUser", async (req, res) => {
  try {
    User.findOne({
      idUser: req.params.idUser
    }).exec((err, users) => {
      if (err) {
        res.json({
          message: "Failed"
        });
      } else {
        const oder = Oder.find({
          status: {
            $eq: "Canceled"
          }
        });
        res.status(200).json(oder);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem đơn đang giao bằng SDT của User
router.get("/DeliveringView/:idUser", async (req, res) => {
  try {
    User.findOne({
      idUser: req.params.idUser
    }).exec((err, users) => {
      if (err) {
        res.json({
          message: "Failed"
        });
      } else {
        const oder = Oder.find({
          status: {
            $eq: "Delivering"
          }
        });
        res.status(200).json(oder);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem đơn Chờ lay hang bằng SDT của User
router.get("/WaitingView/:idUser", async (req, res) => {
  try {
    User.findOne({
      idUser: req.params.idUser
    }).exec((err, users) => {
      if (err) {
        res.json({
          message: "Failed"
        });
      } else {
        const oder = Oder.find({
          status: {
            $eq: "Waiting"
          }
        });
        res.status(200).json(oder);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem đơn Đang chờ bàn giao bằng SDT cua User
router.get("/WaitingForHandoverView/:idUser", async (req, res) => {
  try {
    User.findOne({
      idUser: req.params.idUser
    }).exec((err, users) => {
      if (err) {
        res.json({
          message: "Failed"
        });
      } else {
        const oder = Oder.find({
          status: {
            $eq: "WaitingForHandover"
          }
        });
        res.status(200).json(oder);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
});
//#####################################################################
//Xem đơn hoàn thành bằng SDT của Shipper
router.get("/CompletedView/:idShipper", async (req, res) => {
  try {
    Shipper.findOne({
      idShipper: req.params.idShipper
    }).exec((err, shipper) => {
      if (err) {
        res.json({
          message: "Failed"
        });
      } else {
        const oder = Oder.find({
          status: {
            $eq: "Waiting"
          }
        });
        res.status(200).json(oder);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem đơn đã hủy bằng SDT của Shipper
router.get("/CanceledView/:idShipper", async (req, res) => {
  try {
    Shipper.findOne({
      idShipper: req.params.idShipper
    }).exec((err, shipper) => {
      if (err) {
        res.json({
          message: "Failed"
        });
      } else {
        const oder = Oder.find({
          status: {
            $eq: "Canceled"
          }
        });
        res.status(200).json(oder);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem đơn đang giao bằng SDT của Shipper
router.get("/DeliveringView/:idShipper", async (req, res) => {
  try {
    Shipper.findOne({
      idShipper: req.params.idShipper
    }).exec((err, users) => {
      if (err) {
        res.json({
          message: "Failed"
        });
      } else {
        const oder = Oder.find({
          status: {
            $eq: "Delivering"
          }
        });
        res.status(200).json(oder);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem đơn Chờ lay hang bằng SDT của Shipper
router.get("/WaitingView/:idShipper", async (req, res) => {
  try {
    Shipper.findOne({
      idShipper: req.params.idShipper
    }).exec((err, users) => {
      if (err) {
        res.json({
          message: "Failed"
        });
      } else {
        const oder = Oder.find({
          status: {
            $eq: "Waiting"
          }
        });
        res.status(200).json(oder);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

//Xem đơn Đang chờ bàn giao bằng SDT cua Shipper
router.get("/WaitingForHandoverView/:idShipper", async (req, res) => {
  try {
    Shipper.findOne({
      idShipper: req.params.idShipper
    }).exec((err, users) => {
      if (err) {
        res.json({
          message: "Failed"
        });
      } else {
        const oder = Oder.find({
          status: {
            $eq: "WaitingForHandover"
          }
        });
        res.status(200).json(oder);
      }
    });
  } catch (error) {
    res.status(404).json(error);
  }
});
module.exports = router;