const db = require("../model/db");

const whoRefer = (id,refPrice) => {
    return new Promise((res, rej) => {
        db.query(`UPDATE users SET referral = referral + 1, earning = earning + ? WHERE id = ?`, [refPrice,id], (err, result) => {
            if (err) {
                return rej(err)
            }
            else {
                
                return res(result)
            }
        })
    })
}



module.exports = whoRefer