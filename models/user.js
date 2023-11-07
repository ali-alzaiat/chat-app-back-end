const mongoose = require("mongoose");

let user = mongoose.Schema({
    name:String,
    password:String,
    email:String
});

module.exports = mongoose.model('User',user);