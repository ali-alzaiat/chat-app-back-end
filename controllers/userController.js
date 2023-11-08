let User = require("../models/user");
let jwtUtil = require("../helpers/jwtUtil")

let getUser = (req,res)=>{
    try {
        User.find({name:req.params.name}).then(data=>{
            if(data.length === 0){
                res.status(404).send("User not found.");
                return;
            }
            res.status(200).send(data);
        })
    } catch (error) {
        res.status(500).send("Somthing went wrong.")
    }
}

module.exports.getUser = getUser;

let login = (req,res)=>{
    try {
        let name = req.params.name;
        let password = req.params.password;
        if(!name || !password){
            res.status(500).send("username and password can't be empty");
            return;
        }
        User.findOne({name:name}).then(data=>{
            if(!data){
                res.status(401).send("User doesn't exist.");
                return;
            }
            if(data.password !== password){
                res.status(401).send("Wrong password.");
                return;
            }
            let token = jwtUtil.generateToken(name,data.email);
            res.status(200).send(JSON.stringify(token));
        })
    } catch (error) {
        res.status(500).send("Somthing went wrong.")
    }
}

module.exports.login = login;

let addUser = (req,res)=>{
    try {
        if(!req.body.name || !req.body.password || !req.body.email){
            res.status(500).send("name, password and email can't be empty.")
        }
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