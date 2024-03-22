var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const LOGIN = require('../Model/Login')
const nodemailer = require("nodemailer");

/* GET home page. */

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "virajrathod9139@gmail.com",
      pass: "rpndkkxaguazwkhi",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main(email) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'virajrathod9139@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }



router.post('/signup', async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const data = await LOGIN.create(req.body)
        main(req.body.email)
        res.status(201).json({
            status: "Successfull",
            message: "User Created",
            data: data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
});

router.post('/login', async function (req, res, next) {

    try {
        const checkuser = await LOGIN.findOne({ email: req.body.email })

        if (!checkuser) {
            throw new error('Please Enter valid Email')
        }

        const checkpass = await bcrypt.compare(req.body.password, checkuser.password)

        if (!checkpass) {
            throw new error('Please Enter Valid Password')
        }
        res.status(201).json({
            status: "Success",
            message: "User Login",
            data: checkuser
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
})

module.exports = router;
