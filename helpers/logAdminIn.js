const db = require("../model/db");
const bcrypt = require("bcrypt");
const logAdminin = (obj) => {
    console.log(obj)
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE email = ? AND role = 'admin' LIMIT 1", obj.email.toLowerCase(), (err, result) => {
            //CHeck Email Found

            //first check is sever error
            if (err) {
                return reject(err)
            }

            //then check if any user return
            if (result.length > 0) {

                const user = result[0];
               //then check if password match
                bcrypt.compare(obj.password, user.password, (err, same) => {
                    if (same) resolve(user)
                    else reject({error:"Incorrect Password"})
                })
            }
            //user not found
            else {
                reject({error:"Email is not found!!"})
            }
        })
    })
}


module.exports = logAdminin