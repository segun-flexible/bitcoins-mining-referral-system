
const { isAuth } = require("../helpers/isAuth");

const logout = require("express").Router();


logout.get("/logout", isAuth, (req, res) => {
    res.clearCookie("__btc_user_login");
    res.redirect("/login")
})

module.exports = logout