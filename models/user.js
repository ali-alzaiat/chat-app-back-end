const mongoose = require("mongoose");

let user = mongoose.Schema({
    _id:{
        type:String,
        default:()=>{ return this.email}
    },
    name:String,
    password:String,
    email:String
});

module.exports = mongoose.model('User',user);