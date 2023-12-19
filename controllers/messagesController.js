let Message = require("../models/messages");

let getMessage = (req,res)=>{
    Message.find({sender:req.params.sender,receiver:req.params.receiver}).populate('receiver').populate('sender')
    .then((messages)=>{
        res.status(200).send({messages});
    }).catch((error)=>{
        res.status(500).send(error);
    })
}

module.exports.getMessage = getMessage;

let addMessage = (req,res)=>{
    Message.find({sender:req.body.sender,receiver:req.body.receiver}).then((message)=>{
        if(message){
            Message.addMessage(req.body.text).then((data)=>{
                res.status(201).send("message added");
            });
        }else{
            let newMessage = new Message({
                receiver:req.body.receiver,
                sender:req.body.sender,
                content:req.body.text
            })
            newMessage.save().then((data)=>{res.status(201).send("message added");});
        }
    }).catch((error)=>{
        res.status(500).send(error);
    })
}

module.exports.addMessage = addMessage;