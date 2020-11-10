require("dotenv").config()
const express = require('express');

const cookieParser = require('cookie-parser');

const homepage = require('./routes/index');
const login = require('./routes/login');
const register = require('./routes/register');
const userDashBoard = require("./routes/userDashboard");
const logout = require("./routes/logout");
const adminDashboard = require("./routes/adminDashboard");
const forgotPasswordRoute = require("./routes/forgot-password-route");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

// view engine setup
app.set('view engine', 'ejs');

app.use(homepage)
app.use(login)
app.use(logout)
app.use(register)
app.use(forgotPasswordRoute)
app.use(userDashBoard)
app.use(adminDashboard)

//Listen to server
app.listen(5000)