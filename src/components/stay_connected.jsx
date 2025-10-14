import React from 'react'
import './footer.css'
import Icon from '../assets/icon.png'

const stay_connected = () => {
  return (
    <div className='footer_div2'>
        <div className='top-div'>
            <div className='inf_l'>
                <h1>Stay Connected</h1>
                <p>Sign up for our newsletter</p>
            </div>
            <div className='inf_r'>
                <label htmlFor="">
                    Enter your email
                    <input type="email" placeholder='Email Address'/>
                </label>
                <button>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default stay_connected