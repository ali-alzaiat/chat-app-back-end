const express = require("express");
const {userRouter} = require("./userRouter");

let router = express.Router();

router.use('/user',userRouter);

module.exports.router = router;