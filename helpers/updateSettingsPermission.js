const updateSettingsPermission = (obj) => {
    const allowToEdit = ["fullname", "email", "website", "bio", "avatar","password","location","amountTo","wallet","userid","status","withdrawal"];
    
    //This will return [["key","value"]]
    let values = Object.entries(obj);

    //Then filter the allow edit using the first value in the Array of array Generated
    let v = values.filter(v => allowToEdit.includes(v[0]));

    //Converting it to pure OBJ
    let returnObj = Object.fromEntries(v);
    return returnObj
    

    

}

module.exports = updateSettingsPermission