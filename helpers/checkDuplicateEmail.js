const db = require("../model/db");

const checkDuplicateEmail = (req, res, next) => {
    db.query("SELECT email FROM users WHERE email = ?", req.body.email, (err, result) => {
        if (err) {
            return res.json({error:"Something went wrong"})
        }

        try {
            const userEmail = result[0].email;
            return res.status(400).send()
        } catch (error) {
            next()
        }

    })
}




module.exports = checkDuplicateEmail