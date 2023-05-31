import React from 'react'
import "./index.css"
import LogIn from './LogIn'
import Main_page from './Main_page'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="LogIn" element={<LogIn />} />
          <Route path="Main_page" element={<Main_page />} />
        
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App
