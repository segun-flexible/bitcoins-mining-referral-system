/* const db = require("./model/db");

db.query("SELECT referral FROM earnings", (err, referralPrice) => {
                if (err) {
                 return console.log(err)
                }console.log(referralPrice[0].referral)
              }) */

const jwt = require("jsonwebtoken")
require("dotenv").config()
              const verifyToken = (token) => {
    
    const tk = jwt.verify(token, process.env.TOKEN_SECRET);
    return tk
}

try {
  const tk = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZsZXhpYmxlYXlvZGVsZUBnbWFpbC5jb20iLCJpYXQiOjE2MDUwNDE3MTYsImV4cCI6MTYwNTIxNDUxNn0.aSIygQEwhbteVdpl2Bp0-S2GuhATG1UnoXXeNd8un40")
  console.log(tk)
} catch (error) {
 
}



