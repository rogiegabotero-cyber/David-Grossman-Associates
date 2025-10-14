import React from 'react'
import './footer.css'
import Icon from '../assets/icon.png'
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className='footer_div'>
        
        <div className='bot_div'>
            <div className='first'>
                <div className='logo_div'>
                    <img src={Icon} alt="" />
                    <h1>David Grossman <br />& Associates</h1>
                </div>
                <p>
                    Why delay? describe the tasknow and you will 
                    be surprised how quickly you will respond
                </p>
                <div className='icon_div1'>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-instagram"></i>
                    </a>
                </div>
            </div>
            <div className='second'>
                <h2>Our Links</h2>
                <Link to="/">Home</Link>
                <Link to="/about_section">About Us</Link>
                <Link to="/practice_area">Practice Areas</Link>
                <Link to="/contact_page">Contact Us</Link>
            </div>
            <div className='second'>
                <Link id='link1' to="/practice_area#sample1">
                    Antitrust: Insulin Price-Fixing 
                </Link>
                <Link id='link2' to="/practice_area#sample2">
                    Antitrust: Generic Drug Price Fixing
                </Link>
                <Link id='link3' to="/practice_area#sample3">
                    Social Media Harm 
                </Link>
                <Link id='link4' to="/practice_area#sample4">
                    Environmental Case: PFAS 
                </Link>
                
            </div>
            <div className='second'>
                <h2>Get in Touch</h2>
                <a href="">(631) 815-2575</a>
                <a href="">david@davidgrossmanandassociates.com</a>
                <a href="">881 OCEAN DRIVE, UNIT 14H, KEY BISCAYNE, FLORIDA 33149 </a>
            </div>
            <div>

            </div>
            <div>

            </div>
            
        </div>
        <div className='rights'>
            <p>Copyright © 2025 All Rights Reserved</p>
        </div>
    </div>
  )
}

export default footer