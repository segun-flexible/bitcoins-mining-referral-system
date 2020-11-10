const db = require("./model/db");

db.query("SELECT referral FROM earnings", (err, referralPrice) => {
                if (err) {
                 return console.log(err)
                }console.log(referralPrice[0].referral)
              })