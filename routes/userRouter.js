const express = require("express");

let userRouter = express.Router();
let {getUser,addUser,login} = require("../controllers/userController");

userRouter.get('/getUser/:name',getUser);
userRouter.get('/login/:name/:password',login);
userRouter.post('/singup',addUser);

module.exports.userRouter = userRouter;