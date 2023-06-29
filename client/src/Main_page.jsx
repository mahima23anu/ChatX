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
        socket.on('new_message', (message) => {
            console.log(message)
            console.log(chat)

            setChat((prevchat) => [...prevchat, message])
            console.log(chat)
        });
        return () => socket.off('new_message');
    }, [socket]);



    function handleSubmit(e) {
        e.preventDefault();
        var temp = e.target.elements.mess.value
        setmsg(temp);
        // setChat([...chat,temp])
        document.getElementById('mess').value = '';
        socket.emit('new_message', temp);
    }
    return (
        <div className='background'>

            <div className="message-container">
                <div className="me">Hello {userName}</div>
                {/* <div className="you">{chat}</div> */}
                <div >
                    {chat.map((item, index) => (
                        <div className='you' key={index}>{item}</div>
                    ))}
                </div>

            </div>
            <form onSubmit={handleSubmit} >
                <div className="input-box">

                    <input type='text' id="mess" name="mess"></input>
                    <button type='submit'>Submit</button>


                </div>
            </form>
        </div>
    )
}
