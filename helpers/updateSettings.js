const db = require("../model/db");
const updateSettingsPermission = require("./updateSettingsPermission");


const updateSettings = (data, id, type) => {
    return new Promise((resolve, reject) => {
        
        let editData = updateSettingsPermission(data);

        //if is basic settings
        if (type === "basic") {
            db.query("UPDATE users SET ? WHERE id = ?", [editData, id], (err, result) => {
                if (err) {
               reject(err)
                } else {
                    resolve(result)
           }
       })
   } 
        //basic settings end 
        

        //edit password using ID

        else if (type === "password") {
            
            db.query("UPDATE users SET ? WHERE id = ?", [editData, id], (err, result) => {
                if (err) {
               reject(err)
                } else {
                    resolve(result)
           }
       })
            
            
        }
            
            else if (type === "password2") {
            
            db.query("UPDATE users SET ? WHERE email = ?", [editData, id], (err, result) => {
                if (err) {
               reject(err)
                } else {
                    resolve(result)
           }
       })
            
            
        }

        //if is avatar
        else if (type === "avatar") {
            
            db.query("UPDATE users SET ? WHERE id = ?", [editData, id], (err, result) => {
                if (err) {
               reject(err)
                } else {
                    resolve(result)
           }
       })
            
            
        }





    })
}

module.exports = updateSettings