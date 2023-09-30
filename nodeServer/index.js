const path = require("path");
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');

const user = {};

app.use(cors());

const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    }
});


io.on('connection', (socket) => {
    console.log("New user joined having id", socket.id);

    socket.on('join_room', (data) => {
        console.log("I am here")
        const {usern,room}=data;
        console.log(`Received name: ${usern}`)
        console.log(`Room: ${room}`)
        user[socket.id] = usern;
        socket.join(room);
        socket.broadcast.to(room).emit("joined_user",`${usern} has joined`)
        // socket.to(room).emit("joined_user",{
        //     entered_user:`${usern} has joined you all`,
        //     socketId:socket.id 
    
        // })
        socket.to(room).emit('nameReceived', "UserName Received");
    });

    // socket.on('left_room',(data)=>{
    //     const {usern,room}=data;
    //     socket.leave(room);
    //     socket.broadcast.to(room).emit("user_left",`${usern} has left`)

    // })

    socket.on('new_message', (messageData) => {
        console.log(`Received message from ${socket.id}: ${messageData.message}`);
        console.log(`Socket ID of the sender: ${messageData.socketId}`);
        io.to(messageData.room).emit("new_message", messageData);
    });

    socket.on('disconnect', () => {
    //     socket.on('left_room',(data)=>{
    //     const {usern,room}=data;
    //     console.log("I left")
    //     socket.leave(room);
    //     socket.broadcast.to(room).emit("user_left",`${usern} has left`)

    // })
        console.log(`User with ${socket.id} userid disconnected`);
    });
});

http.listen(8000, () => {
    console.log("Server running at port 8000");
});
