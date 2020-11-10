const db = require("../model/db");

const dbGetSettings = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM settings WHERE id = 1", (err, settings) => {
            if (err) {
              return  reject(err)
            }

            //settings
            
            resolve(settings[0])

        })
    })
}


module.exports = dbGetSettings

//GET settings to carry out some operation