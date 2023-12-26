let Message = require("../models/messages");
let mongoose = require("mongoose");

let getMessage = (req,res)=>{
    Message.find({$or:[{sender:req.params.sender,receiver:req.params.receiver},{receiver:req.params.sender,sender:req.params.receiver}]})
    .populate('receiver','-password')
    .populate('sender','-password')
    .then((messages)=>{
        res.status(200).send({messages});
    }).catch((error)=>{
        console.log(error);
        res.status(500).send(error);
    })
}

module.exports.getMessage = getMessage;

let getMyMessage = (req,res)=>{
    Message.aggregate([
        {
          $match: { sender: req.params.sender}
        },
        {
          $sort: { timestamp: -1 }
        },
        {
          $group: {
            _id: {
              $cond: [
                { $gt: ["$sender", "$receiver"] },
                { sender: "$sender", receiver: "$receiver" },
                { sender: "$receiver", receiver: "$sender" }
              ]
            },
            lastMessage: { $first: "$$ROOT" }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "lastMessage.sender",
            foreignField: "_id",
            as: "senderInfo"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "lastMessage.receiver",
            foreignField: "_id",
            as: "receiverInfo"
          }
        },
        {
          $project: {
            _id: "$lastMessage._id",
            sender: { $arrayElemAt: ["$senderInfo.email", 0] },
            receiver: { $arrayElemAt: ["$receiverInfo.email", 0] },
            senderName: { $arrayElemAt: ["$senderInfo.name", 0] },
            receiverName: { $arrayElemAt: ["$receiverInfo.name", 0] },
            content: "$lastMessage.content",
            timestamp: "$lastMessage.timestamp"
          }
        }
      ])
    .then((messages)=>{
        res.status(200).send({messages});
    }).catch((error)=>{
        console.log(error);
        res.status(500).send(error);
    })
}

module.exports.getMyMessage = getMyMessage;

let addMessage = (req,res)=>{
    let newMessage = new Message({
        receiver:req.body.receiver,
        sender:req.body.sender,
        content:req.body.text
    })
    newMessage.save().then((data)=>{res.status(201).send("message saved");})
    .catch((error)=>{
        console.log(error)
        res.status(500).send(error);
    })

}

module.exports.addMessage = addMessage;