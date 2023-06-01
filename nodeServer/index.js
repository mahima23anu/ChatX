const path=require("path")
const express=require('express');
const app=express()
const server=require('http').createServer(app)
const { Server }=require('socket.io');
const cors=require('cors')
user={}

// const absapth=path.join(__dirname,"../public");
// app.use(express.static(abspath));
app.use(cors());
// app.use(express.static())

const io=new Server(server,{
    cors:{
            origin:"http://localhost:3000",
            methods:['GET','POST'],
            // allowedHeaders:["Access-Control-Allow-Origin"]
        }
})
// app.get("/",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'..','/Users/Aditi/Desktop/ReactChatX/ChatX/client/public/index.html'))
// });

io.on('connection',(socket)=>{
    console.log("New user joined having id ${socket.id}");

    socket.on('userName', uName => {
        console.log(`Received name: ${uName}`)
        user[socket.id]=uName
    socket.emit('nameReceived',"UserName Received")
});
});

server.listen(8000,()=>{
    console.log("Server running at port 8000");

})



























// // const path=require("path")
// const express=require('express');
// const app=express()
// const http=require('http').createServer(app)
// const io=require('socket.io')(http);
// const cors=require('cors')
// user={}

// // const absapth=path.join(__dirname,"../public");
// // app.use(express.static(abspath));
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:['GET','POST']

// }
// ));
// app.get("/",(req,res)=>{
//     res.send("Hello")
// });

// console.log(__dirname)
// io.on('connection',(socket)=>{
//     console.log("New user joined having id",socket.id);

//     socket.on('userName', uName => {
//         console.log(`Received name: ${uName}`)
//         user[socket.id]=uName
//     socket.emit('nameReceived',"UserName Received")
// });
// });

// app.listen(8000,()=>{
//     console.log("Server running at port 8000");

// })
