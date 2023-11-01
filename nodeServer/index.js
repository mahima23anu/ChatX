const path = require("path");
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
const fs= require('fs')

const user = {};

app.use(cors());

app.use(express.static("../client/dist"));

app.get("/", function (req, res) {
  res.sendFile("../client/dist/index.html");
});

let receivedBuffer = Buffer.alloc(0);
const io = new Server(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
    }
});

const uploadPath = './uploads'; // Adjust the path as needed

// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

io.on('connection', (socket) => {
    console.log("New user joined having id", socket.id);

    socket.on('join_room', (data) => {
        console.log("I am here")
        const {usern,room}=data;
        console.log(`Received name: ${usern}`)
        console.log(`Room: ${room}`)
        user[socket.id] = usern;
        socket.join(room);
        socket.broadcast.to(room).emit("joined_user",{user_detail:`${usern} has joined`,type:'entry'})
        // socket.to(room).emit("joined_user",{
        //     entered_user:`${usern} has joined you all`,
        //     socketId:socket.id 
    
        // })
        socket.to(room).emit('nameReceived', "UserName Received");
    });

    

    socket.on('new_message', (messageData) => {
        console.log(`Received message from ${socket.id}: ${messageData.message}`);
        console.log(`Socket ID of the sender: ${messageData.socketId}`);
        io.to(messageData.room).emit("new_message", messageData);
    });

    socket.on('image', (base64String) => {
        // console.table(base64String);
      
        // Send the image to the specified room
        //working code
        // io.to(base64String.room).emit('image', base64String.buffer);


        //changes
         io.to(base64String.room).emit('image', base64String);
      });

      // socket.on('image_upload',(chunk)=>{
      //   const binaryData = Buffer.from(JSON.stringify(chunk));

      //   receivedBuffer = Buffer.concat([receivedBuffer, binaryData]);

      // })

      // socket.on('image_upload_complete',(imageData)=>{
      //   io.to(imageData.room).emit('imageBuffer',{buffer:receivedBuffer,type:'img'});
      // })

      socket.on('file_upload',({chunk,fileName}) =>{
        // console.log(fileName)
        const filePath = path.join(uploadPath, fileName);
        fs.appendFileSync(filePath, Buffer.from(chunk));    

      });

      socket.on('file_upload_complete',(data)=>{
        console.log('File upload complete');
        io.to(data.room).emit('file_uploaded',{message: 'File uploaded successfully'})
      })

    

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
