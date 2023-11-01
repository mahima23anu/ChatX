import React from 'react'
import { RiChatSmile3Line } from "react-icons/ri";


export default function Logo() {
  return (
    <>
      <div className="logo-holder">
        <div className="logo">
          <RiChatSmile3Line className='logo-size' />
        </div>
      </div>
      <div className="title">ChatX</div>
    </>
  )
}
