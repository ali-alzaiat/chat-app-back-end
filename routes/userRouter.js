const express = require("express");

let userRouter = express.Router();
let {getUser,addUser,login,verifyToken} = require("../controllers/userController");
let {verify} = require("../middleware/authorization");

userRouter.get('/getUser/:name',verify,getUser);
userRouter.get('/login/:name/:password',login);
userRouter.get('/verifyToken',verifyToken);
userRouter.post('/signup',addUser);

module.exports.userRouter = userRouter;