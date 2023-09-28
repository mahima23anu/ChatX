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

    socket.on('userName', uName => {
        console.log(`Received name: ${uName}`)
        user[socket.id] = uName;
        socket.emit('nameReceived', "UserName Received");
    });

    socket.on('new_message', (messageData) => {
        console.log(`Received message from ${socket.id}: ${messageData.message}`);
        console.log(`Socket ID of the sender: ${messageData.socketId}`);
        io.emit("new_message", messageData);
    });

    socket.on('disconnect', () => {
        console.log(`User with ${socket.id} userid disconnected`);
    });
});

http.listen(8000, () => {
    console.log("Server running at port 8000");
});
