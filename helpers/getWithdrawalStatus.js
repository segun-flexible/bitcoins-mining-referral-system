const db = require("../model/db");
const manipulateDate = require("./manipulateDate");

const getWithdrawalStatus = (id,status) => {
    
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM withdrawal WHERE userid = ? AND status = ?", [id,status], (err, result) => {
            if (err) {
                reject(err)
            } else {
                result.map(r => r.withdraw_At = manipulateDate(r.withdraw_At))
                
                resolve(result)
            }
        })
    })
}


module.exports = getWithdrawalStatus