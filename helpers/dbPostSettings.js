const db = require("../model/db");

const dbPostSettings = (tableName,data) => {
    return new Promise((resolve, reject) => {

        //if withdrawal
        if (tableName === "withdrawal") {
            db.query("SELECT * FROM withdrawal WHERE userid = ? AND status = 'pending' LIMIT 1", data.userid, (err, result) => {
                if (err) {
                    
                    reject({error:"Something Went Wrong"})
                } else {
                    
                    //check if has pending
                    if (result.length < 1) {
                        db.query(`INSERT INTO withdrawal SET ?`,  data, (err, result) => {
            if (err) {
                return reject(err)
            } else {
                resolve(result)
            }
        })
                    } else {
                        console.log(result)
                        reject()
                    }
                }
            })
        }//end
    })
}


module.exports = dbPostSettings

//hey, check the update settings permission

