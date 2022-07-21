const config = require("../config/authconfig");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
//Register
exports.signup = (req, res) => {
    const user = new User({
        gmail: req.body.gmail,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 8),
        username: req.body.username,
        phone: req.body.phone
    });
    user.save(err => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        } else {
            res.send({
                message: "User was registered successfully!"
            });
        }
    });
};
//Login
exports.signin = (req, res) => {
    User.findOne({
            gmail: req.body.gmail
        })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: err
                });
                return;
            }
            if (!user) {
                return res.send({
                    message: "User Not found."
                });
            }
            //check password
            var passwordIsValid = bcrypt.compareSync(
                req.body.passwordHash,
                user.passwordHash
            );
            if (!passwordIsValid) {
                return res.send({
                    message: "Invalid Password!"
                });
            }
            //đăng ký token
            var token = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: 86400 // tồn tại trong 24 hours
            });
            //trả về account
            res.status(200).send({
                message: "Login successful",
                USER: {
                    id: user._id,
                    gmail: user.gmail,
                    accessToken: token
                }
            });
        });
};