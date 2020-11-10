const db = require("../model/db");
const manipulateDate = require("./manipulateDate");

const getAllReferral = (id) => {
    
    return new Promise((res, rej) => {
        db.query("SELECT * FROM users WHERE referby = ?", id, (err, result) => {
            if (err) {
                rej(err)
            } else {
                result.map(r => r.created_At = manipulateDate(r.created_At))
                res(result)
            }
        })
    })
}

module.exports = getAllReferral