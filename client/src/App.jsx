import React from 'react'
import "./index.css"
import LogIn from './LogIn'
import Main_page from './Main_page'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import  { useState,useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');





const App = () => {
  const [userName, setUsername] = useState('');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
        element={
        <LogIn
        userName={userName}
        setUsername={setUsername}
        socket={socket}
        />
        }
        >
          {/* <Route path="LogIn" element={<LogIn />} /> */}
          {/* <Route path="Main_page" element={<Main_page />} /> */}
        
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App
