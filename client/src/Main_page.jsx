import React from 'react'
// import './index.css'

export default function main_page() {
    return (
        <div className='background'>
            <div className="message-container">
                <div className="me">Hello</div>
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
