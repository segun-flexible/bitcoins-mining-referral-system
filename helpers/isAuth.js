const db = require("../model/db");
const jwt = require("jsonwebtoken")


const isAuth = (req, res, next) => {
    const token = req.cookies.__btc_user_login;

    if (!token) {
       return res.render("mics/error", {
            heading: "Not Authorized",
            text: "Login to access this page",
            showGoHome: true
        })
    } else {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
            if (err) {
             return  res.render("mics/error", {
            heading: "Invalid Auth Token",
            text: "Login to access this page",
            showGoHome: true
        })
            }

            db.query('SELECT * FROM users WHERE id = ?', decode.id, (err, result) => {
                if (err) {
                    return  res.render("mics/error", {
            heading: "Something went wrong",
            text: "Check back in a minute",
            showGoHome: true
        })
                }

                //check if user is not a guest
                const currentUser = { ...result[0] };
                if (currentUser.role !== "guest") {
                    req.id = decode.id
                    next()
                }
                //if is guest
                else {
                    return res.render("mics/error", {
            heading: "Unverified Account",
            text: "Check your email and verify account",
            showGoHome: false
        })
                }
                
            })
            
        })
        
    }
}




const isLogin = (req, res, next) => {
    if (!req.cookies.__btc_user_login) {
        next()
    } else {
        res.redirect("/dashboard")
    }
    
}


//isCurrentUser
const isCurrentUser = (req, res, next) => {
    
    try {
        const token = req.cookies.__btc_user_login;

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => { 
        req.id = decode.id;
        next()
    })
    } catch (error) {
        next()
    }
        
    
}

module.exports = {
    isAuth,
    isLogin,
    isCurrentUser
}
