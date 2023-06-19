import React from 'react'
import "./index.css"
import LogIn from './LogIn'
import Main_page from './Main_page'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import  { useState,useEffect } from 'react';
// import io from 'socket.io-client';
import { createContext } from 'react';

export const UserContext=createContext()
// const socket = io('http://localhost:8000');

const App = () => {
  const [userName, setUsername] = useState('');
  return (
    <UserContext.Provider value={{userName,setUsername}}>
    <BrowserRouter>
      <Routes>
        
       <Route path="/" element={<LogIn/>} />
       <Route path="/main_page" element={<Main_page/>} />
        
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App

{/* <Route path="LogIn" element={<LogIn />} /> */}