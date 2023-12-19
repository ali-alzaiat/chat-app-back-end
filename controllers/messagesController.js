let Message = require("../models/messages");

let getMessage = (req,res)=>{
    Message.find({sender:req.body.sender,receiver:req.body.receiver}).populate('receiver').populate('sender')
    .then((messages)=>{
        res.status(200).send({messages});
    }).catch((error)=>{
        res.status(500).send(error);
    })
}