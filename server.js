const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {router} = require("./routes/router")
require("dotenv").config();
const { Server } = require("socket.io");

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
let rooms = {};

app.use('/',router)

mongoose.connect(process.env.DB_URL).then(console.log("connected"));

const server = app.listen(process.env.PORT,()=>{
    console.log("The server is running");
})

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

io.on('connection',(socket)=>{
    console.log(socket.id+" connected");

    socket.on("user-connected",(room,name)=>{
        console.log(room);
        // rooms[room].users[socket.id] = name;
        // console.log(rooms[room].users[socket.id]);
        // console.log(name);
        socket.join(room);
        socket.to(room).emit("user-connected",name);
    })

    socket.on("message",(room,message,username)=>{
        socket.to(room).emit("message",message,username);
    })

    // socket.on("room-added",(room)=>{
    //     socket.broadcast.emit("room-added",room);
    // })
    
    socket.on("typing",(userName,room)=>{
        socket.to(room).emit("typing",userName);
    })
});