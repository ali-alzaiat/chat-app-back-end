const express = require("express");

let messagesRouter = express.Router();
let {getMessage,addMessage,getMyMessage} = require("../controllers/messagesController");
let {verify} = require("../middleware/authorization");

messagesRouter.get('/getMessage/:sender/:receiver',verify,getMessage);
messagesRouter.get('/getMyMessage/:sender',verify,getMyMessage);
messagesRouter.post('/addMessage',verify,addMessage);

module.exports.messagesRouter = messagesRouter;