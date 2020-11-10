const jwt = require("jsonwebtoken");

const generateNewLoginToken = obj => {
return jwt.sign(obj,process.env.TOKEN_SECRET,{expiresIn:"6d"})
}

module.exports = generateNewLoginToken