const path = require("path");
const fs = require("fs")


const setDefaultAvatar = (req, res, next) => {
    const avatar = fs.readFileSync(path.join("public/img", "avatar.png"));
    req.body.avatar = avatar

    next()
}


module.exports = setDefaultAvatar