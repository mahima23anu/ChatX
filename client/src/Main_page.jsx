import React, { useState, useEffect } from 'react'
import { UserContext } from './App'
import { useContext } from 'react'
import { UserContext_mess } from './App'
import io from 'socket.io-client';
// import './index.css'

const socket = io.connect('http://localhost:8000');

export default function Main_page() {
    const { userName } = useContext(UserContext)
    // console.log(userName)
    // const {inputText,setinput}=useContext(UserContext_mess)
    const [msg, setmsg] = useState("")
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on('new_message', (messageData) => {
            // console.log(sent_user," sent message")
            console.log(messageData)
            // console.log(chat)
            if(messageData.socketId===socket.id){
                console.log("Message should be in right")
            }
            else{
                console.log("Message should be in left")

            }

            setChat((prevchat) => [...prevchat, messageData.message])
            console.log(chat)
        });
        return () => socket.off('new_message');
    }, [socket]);



    function handleSubmit(e) {
        e.preventDefault();
        const socketId=socket.id
        document.getElementById('mess').value = '';
        socket.emit('new_message',{ message: msg, socketId});
        setmsg("");
    }
    return (
        <div className='background'>

            <div className="message-container">
                <div className="me">Hello {userName}</div>
                <br></br>
                <br></br>
                {/* <div className="you">{chat}</div> */}
                <div>
                {chat.map((item, index) => (
                <div className={`${socket.id === item.socketId ? "me" : "you"}`} key={index}>{item}</div>
  ))}
</div>

            </div>
            <form onSubmit={handleSubmit} >
                <div className="input-box">

                    <input type='text' id="mess" name="mess"
                    value={msg}
                    onChange={(e) => setmsg(e.target.value)}/>
                    <button type='submit'>Submit</button>


                </div>
            </form>
        </div>
    )
}
