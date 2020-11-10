const homepage = require("express").Router();

homepage.get("/",(req,res)=>{
  res.render("user/index", {
    title: "Home"
  })
})

module.exports = homepage