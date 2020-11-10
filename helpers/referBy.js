const db = require("../model/db");

const setReferBy = (currentUserId,referreeId) => {
    return new Promise((res, rej) => {
        db.query(`UPDATE users SET referby = ? WHERE id = ?`, [referreeId,currentUserId], (err, result) => {
            if (err) {
                return rej(err)
            }
            else {
                
                return res(result)
            }
        })
    })
}



module.exports = setReferBy