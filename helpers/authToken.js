const jwt = require("jsonwebtoken");

const generateEmailToken = (email) => {
    
    const token = jwt.sign({ email }, process.env.TOKEN_SECRET, { expiresIn: '2d' });
    return token
}





const verifyToken = (token) => {
    
   return jwt.verify(token, process.env.TOKEN_SECRET);
}



module.exports = {
    generateEmailToken,
    verifyToken
}