const nodemailer = require('nodemailer');

module.exports = function(toUser, subject, text) {
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "DH51805899@student.stu.edu.vn",
            pass: "181100Covid"
                // user: "ningendo.shinra03090@gmail.com",
                // pass: "dxfwloobeighjghp"
        }
    });

    message = {
        from: "admin@bookStore.com",
        to: toUser,
        subject: subject,
        html: text
    }

    transporter.sendMail(message, function(err, info) {
        if (err) {
            console.log(err)
        } else {}
    })

}