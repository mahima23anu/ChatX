import React from 'react'

export default function Form() {
  return (
    <div>
      <form>
        <input type="text" className='input' placeholder='Username' />
        <input type="password" className="input" placeholder='Password'/>
        <div className="checkbox">
            <input type="checkbox" id="check" />
            <label htmlFor='check'> Keep me sign in</label>

        </div>
        <div className="sign-in-button">
            <a className='sign-in'>SIGN IN</a>
            <p>Forget Password <span>Sign UP!</span></p>
        </div>
      </form>
    </div>
  )
}




