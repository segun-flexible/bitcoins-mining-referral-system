const forgotPasswordRoute = require("express").Router();
const validator = require("validator");
const resetPassword = require("../email/resetPassword");
const { verifyToken } = require("../helpers/authToken");
const hashPassword = require("../helpers/hashPassword");
const { isLogin, isAdminLogin } = require("../helpers/isAuth");
const updateSettings = require("../helpers/updateSettings");
const db = require("../model/db");

//reset password
forgotPasswordRoute.post("/reset-password", (req, res) => {
    const type = req.body.type;

    //if is email
    if (validator.isEmail(type)) {
        
        //Checking if email is in the DB
        db.query("SELECT email FROM users WHERE email = ?", type, async (err, result) => {
            if (err) console.log(err)
            
            if (result.length > 0) {

                //send reset link
                resetPassword(result[0])
                res.send()
            }
            else res.status(404).send()
        })
    }
    //if is Username
    {
        //Checking if  username is in the DB
        db.query("SELECT username FROM users WHERE username = ?", type, (err, result) => {
            if (err) console.log(err)
            
            if (result.length > 0) {
                //send reset link
                resetPassword(result[0])
                res.send()
            }
            else res.status(404).send()
        })
    }
})


//Here i will check if token is still valud

forgotPasswordRoute.get("/reset-password", isLogin, isAdminLogin, (req, res) => {

   res.render("auth/resetPasswordForm") 
   
})


forgotPasswordRoute.post("/set-new-password", isLogin, isAdminLogin, hashPassword, (req, res) => {
    
    try {
        const email = verifyToken(req.body.token);
        const password = { password: req.body.password }
        
        updateSettings(password, email.email.toLowerCase(), "password2").then(result => {
            console.log(result)
            res.send()
        }).catch(err => {
            
            res.status(400).send()
        })
    } catch (error) {
        res.status(400).send()
    }
    
    
})
module.exports = forgotPasswordRoute

