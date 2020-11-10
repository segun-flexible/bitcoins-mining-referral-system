const mysql = require("mysql");

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database: 'btc',
    charset: "utf8mb4"
});

db.connect((err) => {
    if (err) {
        return console.log(err)
    }

    console.log("DB Connected!!!")
})

module.exports = db