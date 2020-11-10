//hash Password
const bycript = require("bcrypt");
function hashPassword(req, res, next) {
    bycript.hash(req.body.password, 8, (err, hash) => {
        if (err) {
           return res.status(500).send()
        }
        
        req.body.password = hash;
        next()
   });
    
    
}

module.exports = hashPassword
