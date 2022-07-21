const {verifySignUp} = require("../middlewares");
const controller = require("../controllers/AuthController");
const express = require("express");
const verifySignUpStaff = require("../middlewares/verifySignup");
const app = express();
app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
app.post("/signup", [verifySignUp.checkDuplicateGmail], controller.signup);
app.post("/signin", controller.signin);

app.post("/signupStaff", [verifySignUpStaff.checkDuplicateGmail], controller.signupStaff);
app.post("/signinStaff", controller.signinStaff);
module.exports = app