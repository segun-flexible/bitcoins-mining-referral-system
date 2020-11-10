const db = require("../model/db");

const getSomeProfileInfo = (id) => {

    return new Promise((res, rej) => {
        db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
            if (err) rej(err)
            res({...result[0]})
         })
    })
    
}

module.exports = getSomeProfileInfo