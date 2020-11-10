const adminDashboard = require("express").Router();
const generateNewLoginToken = require("../helpers/generateNewLoginToken");
const {isAdminLogin,isAdminAuth} = require("../helpers/isAuth");
const logAdminin = require("../helpers/logAdminIn");



//Admin Login Page
adminDashboard.get("/auth/admin/login", isAdminLogin,(req, res) => {
    res.render("auth/adminLogin")
})

//Admin Forgot Password Page
adminDashboard.get("/auth/admin/forgot-password", (req, res) => {
    res.render("auth/adminForgotPassword")
})

//Make A POST Request to login
adminDashboard.post("/auth/admin/login", async (req, res) => {
    
    await logAdminin(req.body).then(result => {
        const myToken = generateNewLoginToken({id:result.id})
        res.cookie("__btc_admin_login", myToken)
        res.send()
    }).catch(err => res.status(500).send(err))
    
})




//Welcome to dashboard
adminDashboard.get("/auth/admin/dashboard", isAdminAuth, (req, res) => {
    res.render("admin/overview/dashboard")
})







module.exports = adminDashboard