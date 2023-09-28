import React from 'react'
import "./index.css"
import LogIn from './LogIn'
import {Main_page} from './Main_page'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import  { useState,useEffect } from 'react';
import { createContext } from 'react';

export const UserContext=createContext()
export const UserContext_mess=createContext()

const App = () => {
  const [userName, setUsername] = useState('');
  const [inputText,setinputText] = useState('');
  return (
    <UserContext.Provider value={{userName,setUsername}}>
    <UserContext_mess.Provider value={{inputText,setinputText}}>

    <BrowserRouter>
      <Routes>
        
       <Route 
       path="/" 
       element={<LogIn/>} />
       <Route 
       path="/main_page" 
       element={<Main_page/>} />
        
      </Routes>
    </BrowserRouter>
    </UserContext_mess.Provider>
    </UserContext.Provider>

  );
}

export default App

{/* <Route path="LogIn" element={<LogIn />} /> */}