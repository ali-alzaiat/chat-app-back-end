const express = require("express");
const mongoose = require("mongoose");
const {router} = require("./routes/router")
require("dotenv").config();

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/',router)

mongoose.connect(process.env.DB_URL).then(console.log("connected"));

app.listen(process.env.PORT,()=>{
    console.log("The server is running");
})
