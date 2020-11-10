const nodemailer = require("nodemailer")
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

module.exports = transporter