const db = require("../model/db");

const getAvatar = id => {
    return new Promise((resolve, reject) => {
        db.query("SELECT avatar from users WHERE id = ?", id, (err, result) => {
            if (err) {
                reject(err)
            } else {
                
                try {
                    resolve(result[0].avatar)
                } catch (error) {
                    reject(error)
                }
            }
        })
    })
}

module.exports = getAvatar


