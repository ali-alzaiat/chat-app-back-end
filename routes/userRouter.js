const express = require("express");

let userRouter = express.Router();
let {getUser,addUser} = require("../controllers/userController");

userRouter.get('/getUser',getUser);

userRouter.post('/addUser',addUser);

module.exports.userRouter = userRouter;