const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ayodelesegun570@gmail.com',
    pass: 'ayodeleomoalidu1'
      },
  tls: {
      rejectUnauthorized: false
    },
});

const verifyEmail = (user) => {
    

const mailOptions = {
  from: 'youremail@gmail.com',
  to: user.email,
  subject: 'i want you to verify ',
    html: `
    your token: <a href='http://localhost:5000/verify-email?token=${user.token}&${user.ref && 'ref=' + user.ref}'>VERIFY NOW </a>
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