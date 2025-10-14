import React from 'react'
import './contact.css'

const contacts = () => {
  return (
    <div className='contacts_main'>
        <h1>We’re here for you</h1>
        <div className='details'>
            <div className='l_div'>
                <div className='input_l'>
                    <input type="text" placeholder='Name' />
                    <input type="integers" placeholder='Phone No.'/>
                </div>
                <div className='input_l'>
                    <input type="text" placeholder='Subject' />
                    <input type="email" placeholder='Email'/>
                </div>
                <div className='input_R'>
                    <input type="text" placeholder='Where have you heard about us?'/>
                    <textarea placeholder='Message' name="" id=""></textarea>
                    <button>Submit</button>
                </div>
                
            </div>
            <div className='R_div'>
                <div className='icons1'>
                    <i className="bi bi-telephone-fill"></i>
                    <p>(631) 815-2575</p>
                </div>

                <div className='icons1'>
                    <i className="bi bi-envelope-fill"></i>
                    <p>david@davidgrossmanandassociates.com</p>
                </div>

                <div className='icons1'>
                    <i className="bi bi-geo-alt-fill"></i>
                    <p>881 OCEAN DRIVE, UNIT 14H, KEY BISCAYNE, FLORIDA 33149</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default contacts