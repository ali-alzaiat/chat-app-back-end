const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.DB_URL).then(console.log("connected"));

app.listen(process.env.PORT,()=>{
    console.log("server is running");
})
