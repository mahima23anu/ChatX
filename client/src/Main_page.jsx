import React, { useState, useEffect } from 'react'
import { UserContext } from './App'
import { useContext } from 'react'
import { UserContext_mess } from './App'
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

// import './index.css'

const socket = io.connect('http://localhost:8000');


export const Prompt = () => {

    const {userName,setUsername}=useContext(UserContext)
    console.log(userName)
    const route=useNavigate()
    const [inputValue, setInputValue] = useState({
      userName:""
    });
    const sendName = () => {
      setUsername(inputValue.userName)
      socket.emit('userName', inputValue.userName);
    };
    useEffect(() => {
      socket.on('nameReceived', (response) => {
        console.log(response); // Log the response from the server
      });
  
      return () => {
        socket.off('nameReceived');
      };
    }, []);
  
  const handleChange = (e) => {
    const newUser={...inputValue}
    newUser[e.target.id]=e.target.value;
    setInputValue(newUser);
    console.log(newUser)
  };
  
  
  
  const handleSubmit = (e) => {
  
    e.preventDefault();
    
    // Do something with the submitted value
    console.log('Submitted value:', inputValue);
    route("/main_page")
  };
  
  // export default function Form() {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input onChange={(e)=>handleChange(e)} id="userName"  type="text"  value={inputValue.userName} className='input' placeholder='Username' />
          {/* <input type="password" className="input" placeholder='Password'/> */}
          {/* <div className="checkbox"> */}
              {/* <input type="checkbox" id="check" /> */}
              {/* <label htmlFor='check'> Keep me sign in</label> */}
  
          {/* </div> */}
          <div className="sign-in-button">
              <button onClick={sendName} type="submit" className='sign-in'>submit</button>
              <p>Forget Password <span>Sign UP!</span></p>
          </div>
        </form>
      </div>
    )
  }
  // }
  
  
  
  
  
export function Main_page() {
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

            setChat((prevchat) => [...prevchat, messageData])
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
                {chat.map((item, index) => {
    console.log('Current item:', item); // Log the current item
    return (
      <div className={socket.id === item.socketId ? "me" : "you"} key={index}>
        {item.message}
      </div>
    );
  })}
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

