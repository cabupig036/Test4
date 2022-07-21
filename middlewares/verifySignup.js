const User = require("../models/User");
checkDuplicateGmail = (req, res, next) => {
    // Gmail
    User.findOne({
        gmail: req.body.gmail
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        }
        if (user) {
            res.status(400).send({
                message: "Failed! Gmail is already in use!"
            });
            return;
        }
        next();
    });
};
const verifySignUp = {
    checkDuplicateGmail
};
module.exports = verifySignUp;