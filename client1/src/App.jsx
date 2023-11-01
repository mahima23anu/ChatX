import React from 'react'
import "./index.css"
import LogIn from './LogIn'
import {Main_page} from './Main_page'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import  { useState,useEffect } from 'react';
import { createContext } from 'react';
// import io from 'socket.io-client';

export const UserContext=createContext()
export const UserContext_mess=createContext()

// const socket = io.connect('http://localhost:8000');

const App = () => {
  const [userName, setUsername] = useState('');
  const [room,setRoom]=useState('');
  const [inputText,setinputText] = useState('');

  const userContextValue={
    userName,
    setUsername,
    room,
    setRoom,
  };
  return (
    <UserContext.Provider value={userContextValue}>
    {/* <UserContext.Provider value={{room,setRoom}}> */}
    <UserContext_mess.Provider value={{inputText,setinputText}}>

    <BrowserRouter>
      <Routes>
        
       <Route 
          path="/" 
          element={<LogIn
          // userName={userName}
          // setUsername={setUserName}
          // room={room}
          // setRoom={setRoom}
      //  socket={socket}
       />} />
       <Route 
       path="/main_page" 
       element={<Main_page
      //  socket={socket}
       />} />
        
      </Routes>
    </BrowserRouter>
    </UserContext_mess.Provider>
    </UserContext.Provider>
    // </UserContext.Provider>

  );
};

export default App

{/* <Route path="LogIn" element={<LogIn />} /> */}