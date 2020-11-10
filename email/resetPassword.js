const nodemailer = require("nodemailer");
const { generateEmailToken } = require("../helpers/authToken");
const transporter = require("./transporter")


const resetPassword = (user) => {

const token = generateEmailToken(user.email);
 
    console.log(token)

const mailOptions = {
  from: 'youremail@gmail.com',
  to: user.email,
  subject: 'Reset Password',
    html: `
    Reset Password: <a href='${process.env.URL}/reset-password?token=${token}'>RESET PASSWORD </a>
  `
    };
    

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            return console.log(err)
        }

        console.log("SENT")
    })

}

module.exports = resetPassword