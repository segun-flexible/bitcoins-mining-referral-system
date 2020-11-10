const getAllReferral = require("../helpers/getAllReferral");
const getSomeProfileInfo = require("../helpers/getSomeProfileInfo");
const hashPassword = require("../helpers/hashPassword");
const {isAuth,isCurrentUser} = require("../helpers/isAuth");
const updateSettings = require("../helpers/updateSettings");
const multer = require("multer");
const getAvatar = require("../helpers/getAvatar");
const dbGetSettings = require("../helpers/dbGetSettings");
const dbPostSettings = require("../helpers/dbPostSettings");
const updateSettingsPermission = require("../helpers/updateSettingsPermission");
const getWithdrawalStatus = require("../helpers/getWithdrawalStatus");
const userDashBoard = require("express").Router();



userDashBoard.get("/dashboard", isAuth, async (req, res) => {
    let referralList
    let user = await getSomeProfileInfo(req.id);
    await getAllReferral(req.id).then(res => {referralList = res}).catch(err => console.log(err))
    /* console.log(referralList) */
    

    res.render("userdashboard/dashboard", {
        title: "User Dashboard",
        user,
        url: process.env.URL,
        referralList
    })

    
})


userDashBoard.get("/dashboard/referral", isAuth, async (req, res) => {
    let referralList
    let user = await getSomeProfileInfo(req.id);
    await getAllReferral(req.id).then(res => {referralList = res}).catch(err => console.log(err))
    /* console.log(referralList) */
    

    res.render("userdashboard/referral", {
        title: "Referral Report",
        user,
        url: process.env.URL,
        referralList
    })
})



//User Profile (Public)
userDashBoard.get("/profile/:id", isCurrentUser, async (req, res) => {
    
    if (req.id) {
        let referralList
        let user = await getSomeProfileInfo(req.id);
        let profile
        await getSomeProfileInfo(req.params.id).then(result => {
            if (!result.id) {
            return  res.render('mics/error', {
        text: '404 Not Found',
        heading: "Profile Not Found",
        showGoHome:true
      })  
            }

            profile = result
        }).catch(err => console.log(err))
        
    await getAllReferral(req.id).then(result => {referralList = result}).catch(err => console.log(err))
    /* console.log(referralList) */
    

    return res.render("userdashboard/profile", {
        title: `${profile.username} 's Profile`,
        user,
        url: process.env.URL,
        referralList,
        profile
    })
    }
    else {

        let profile = await getSomeProfileInfo(req.params.id);
        
   return res.render("userdashboard/profile", {
        title: `${profile.username} 's Profile`,
        url: process.env.URL,
        profile,
        user:{}
    })
    }
})


userDashBoard.get('/dashboard/settings', isAuth, async (req, res) => {
    let referralList
    let user = await getSomeProfileInfo(req.id);
    await getAllReferral(req.id).then(res => {referralList = res}).catch(err => console.log(err))
    
    

    res.render("userdashboard/settings", {
        title: "Edit Settings",
        user,
        url: process.env.URL,
        referralList
    })
})

//Update Settings
userDashBoard.post('/dashboard/basic-settings', isAuth, async (req, res) => {
    updateSettings(req.body,req.id,process.env.BASIC).then(resolve => res.status(200).send()).catch(err => res.status(400).send({error:err}) )
    
})

//Update password
userDashBoard.post('/dashboard/basic-settings/password', isAuth, hashPassword, async (req, res) => {
    updateSettings(req.body,req.id,process.env.PASSWORD).then(resolve => res.status(200).send()).catch(err => res.status(400).send({error:err}) )
    
})



//Update Profile Picture
let uploadAvatar = multer({})
userDashBoard.post('/dashboard/basic-settings/avatar', isAuth, uploadAvatar.single("avatar"), async (req, res) => {
    updateSettings({avatar:req.file.buffer},req.id,process.env.AVATAR).then(resolve => res.status(200).send()).catch(err => res.status(400).send({error:err}) )
    
    
})

//View Avatar
userDashBoard.get('/profile/:id/avatar.jpg', async (req, res) => {
    
    getAvatar(req.params.id).then(avatar => {
        res.set("Content-Type","image/jpg")
        res.send(avatar)
    }).catch(err => res.render("mics/404"))
    
})




//Request for payment
userDashBoard.get("/dashboard/withdrawal", isAuth, async (req, res) => {
    let withdrawStatus = {};
    let settings;
    let user = await getSomeProfileInfo(req.id);

    //getting pending withdrawal and assign it to withdrawStatus
    await getWithdrawalStatus(req.id, process.env.PENDING).then(pending => withdrawStatus.pending = pending).catch(err => err);

    //getting paid withdrawal and assign it to withdrawStatus
    await getWithdrawalStatus(req.id, process.env.PAID).then(paid => withdrawStatus.paid = paid).catch(err => err);

    await dbGetSettings().then(s => settings = s).catch(err => err)
    

    res.render("userdashboard/withdrawal", {
        title: "Referral Report",
        user,
        url: process.env.URL,
        withdrawStatus,
        settings
    })
})


//REQUEST FOR PAYMENT (POST)
userDashBoard.post("/dashboard/withdrawal", isAuth, async (req, res) => {
    let user = await getSomeProfileInfo(req.id);
    
    //assign user id
    req.body.userid = req.id;

    const obj = updateSettingsPermission(req.body)
    //Checking if amount is greater than the request
    if (user.earning >= Number(obj.amountTo)) {
        dbPostSettings("withdrawal", obj).then(resolve => res.send()).catch(err => res.status(403).send())
        
    } else {
       return res.status(400).send()
    }
    
    
})

module.exports = userDashBoard