import React from 'react'
import Logo from './components/Logo';
import Prompt from './components/Prompt';
import "./index.css"

const LogIn = ({userName,setUsername}) => {
  return (

        <div>
          <Logo />
          <Prompt />
        </div>
  );
}

export default LogIn
