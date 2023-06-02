import io from 'socket.io-client';
import React, { useContext } from 'react'
import {useEffect, useState } from "react";
import { Outlet, Link, Router } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';



const socket = io.connect('http://localhost:8000'); // Replace with your server URL

// function MyComponent() {
//   const [name, setName] = useState('');

//   const sendName = () => {
//     socket.emit('sendName', name);
//   };

  // useEffect(() => {
  //   socket.on('nameReceived', (response) => {
  //     console.log(response); // Log the response from the server
  //   });

  //   return () => {
  //     socket.off('nameReceived');
  //   };
  // }, []);
// }

//
const Prompt = () => {

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
export default Prompt;



