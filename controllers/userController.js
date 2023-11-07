let User = require("../models/user");

let getUser = (req,res)=>{
    try {
        User.find({name:req.params.name}).then(data=>{
            res.status(200).send(data);
        })
    } catch (error) {
        res.status(500).send("Somthing went wrong.")
    }
}

module.exports.getUser = getUser;

let addUser = (req,res)=>{
    try {
        let newUser = User({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email
        });
        newUser.save().then((data)=>{
            res.status(201).send('user added');
        });
    } catch (error) {
        res.status(500).send("Something went wrong.")
    }
}

module.exports.addUser = addUser;