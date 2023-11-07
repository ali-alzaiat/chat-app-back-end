const express = require("express");

let userRouter = express.Router();

userRouter.get('/getUser',(req,res)=>{
    try {
        res.status(200).send('user');
    } catch (error) {
        res.status(500).send("Somthing went wrong.")
    }
    
})

userRouter.get('/addUser',(req,res)=>{
    try {
        res.status(201).send('user');
    } catch (error) {
        res.status(500).send("Somthing went wrong.")
    }
})

module.exports.userRouter = userRouter;