const nodemailer = require("nodemailer");
const transporter = require("./transporter")

const verifyEmail = (user) => {
    

const mailOptions = {
  from: 'youremail@gmail.com',
  to: user.email,
  subject: 'i want you to verify ',
    html: `
    your token: <a href='${process.env.URL}/verify-email?token=${user.token}&${user.ref && 'ref=' + user.ref}'>VERIFY NOW </a>
  `
    };
    

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            return console.log(err)
        }

        console.log("SENT")
    })

}

module.exports = verifyEmail