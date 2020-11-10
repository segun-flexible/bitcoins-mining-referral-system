const db = require("../model/db");

const { generateEmailToken, verifyToken } = require("../helpers/authToken");
const verifyEmail = require("../email/verifyEmail");
const checkDuplicateEmail = require("../helpers/checkDuplicateEmail");
const { isLogin } = require("../helpers/isAuth");
const whoRefer = require("../helpers/whoRefer");
const setReferBy = require("../helpers/referBy");
const hashPassword = require("../helpers/hashPassword");
const setDefaultAvatar = require("../helpers/setDefaultAvatar");
const register = require("express").Router();



register.get("/register", isLogin, (req,res)=>{
    res.render("auth/signup", {
      title: "Register"
  })
})


register.post("/register", checkDuplicateEmail, hashPassword, setDefaultAvatar, (req, res) => {

    const SQL = "INSERT INTO users SET ?"
    db.query(SQL, req.body, (err, result) => {
        if (err) {
            return res.render("mics/error",{text:"Something went wrong!"})
        }
        
    })

    const token = generateEmailToken(req.body.email)
    verifyEmail({ ...req.body, token,ref:req.query.ref });
    return res.render("mics/success",{heading:"Verify Account",text:"Check your email for verification link!",showLogin:false})
})







register.get("/verify-email", isLogin, (req, res) => {
    try {
    const decodeData = verifyToken(req.query.token);
      
  
      db.query(`SELECT * FROM users WHERE email = ?`, decodeData.email, async (err, result) => {
        if (err) {
         return res.send(err)
        }

        let user = result[0];
        if (user.role === "guest") {
          db.query('UPDATE users SET role = ? WHERE email = ?', ["member", user.email], (err, result) => {
            if (err) {
              return res.render("mics/error",{text:"Something went wrong!",heading:"Error Occur",showGoHome:true})
            }
            //Verify Successful
            //Updating Referral
            if (req.query.ref) {
              //get the current referral bonus
              db.query("SELECT referral FROM earnings", (err, referralPrice) => {
                if (err) {
                 return console.log(err)
                }
                  whoRefer(req.query.ref, referralPrice[0].referral).then(res => { }).catch(err => console.log(err));
              setReferBy(user.id,req.query.ref).then(res => { }).catch(err => console.log(err));
              })
              
              
            }
            return res.render("mics/success",{heading:"Verified Successfully!",text:"Login into your account now",showLogin:true})

          })
        } else {
         return res.redirect("/login")
        }

      })

    } catch (error) {
      res.render('mics/error', {
        text: 'Token have expired!',
        heading: "Verification Expired",
        showGoHome:true
      })
    }

})

register.get("/register/verifyemail/mail", (req, res) => {
  res.render("mics/success", {heading:"Verify Account",text:"Check your email for verification link!",showLogin:false})
})

module.exports = register



