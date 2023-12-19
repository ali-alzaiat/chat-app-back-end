const express = require("express");
const {userRouter} = require("./userRouter");
const { messagesRouter } = require("./messagesRouter");

let router = express.Router();

router.use('/user',userRouter);
router.use('/messages',messagesRouter);

module.exports.router = router;