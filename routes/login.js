
const { isLogin} = require("../helpers/isAuth");
const db = require("../model/db");
const login = require("express").Router();
const bcrypt = require("bcrypt");
const generateNewLoginToken = require("../helpers/generateNewLoginToken");




login.get("/login", isLogin,(req,res)=>{
  res.render("auth/login",{title:"Login"})
})


login.post("/login", (req, res) => {
  db.query("SELECT * FROM users WHERE email = ?", req.body.email, (err, result) => {
    let user = { ...result[0] };
    
    if (!user.email) {
     return res.status(400).send({error:"Invalid Email"})
    } else if(user.email && user.role !== "guest") {
      bcrypt.compare(req.body.password, user.password, (err, same) => {
        if (err) {
          return res.status(400).send({error:err})
        } else {
          //Check if password is correct
          if (same) {
            const myToken = generateNewLoginToken({id:user.id})
            res.cookie("__btc_user_login", myToken)
            res.send()
          } else {
            return res.status(400).send({error:"Incorrect Password"})
          }
        }
      })
    }
    else {
      //The user is guest
      return res.render("mics/error", {
            heading: "Unverified Account",
            text: "Check your email and verify account",
            showGoHome: false
        })
    }
  })
  /* res.send(req.body) */
})


module.exports = login