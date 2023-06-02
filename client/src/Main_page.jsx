import React from 'react'
import { UserContext } from './App'
import { useContext } from 'react'
// import './index.css'

export default function Main_page() {
const {userName}=useContext(UserContext)
console.log(userName)

    return (
        <div className='background'>
            <div className="message-container">
                <div className="me">Hello{userName}</div>
                <div className="you">Hii</div>

            </div>
            <form>
                <div className="input-box">

                    <input type='text'></input>
                    <button type='submit'>Submit</button>


                </div>
            </form>
        </div>
    )
}
