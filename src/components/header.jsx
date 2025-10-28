import React, { useState } from 'react';
import './header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); 

  return (
    <header className='whole_header'>
      <div className='top_header'>
        <div className='contact-info'>
          <p>
            <i className="bi bi-telephone-fill"></i>
            <a href="tel:6318152575" className="contact-link">631.815.2575</a> | 
            <a href="tel:6314599241" className="contact-link">631.459.9241</a>
          </p>
          <p>
            <i className="bi bi-envelope-fill"></i>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=david@davidgrossmanandassociates.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              david@davidgrossmanandassociates.com
            </a>

          </p>
        </div>

        <div className='social-icons'>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
        </div>
      </div>

      <div className='main_header'>
        <div className='Logo'>
          <Link className='logo_link' to="/"><p>David Grossman & Associates</p></Link>
        </div>

        <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="bi bi-list"></i>
        </div>

        <div className={`links ${menuOpen ? 'active' : ''}`}>
          <Link className={`link_btn ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
          <Link className={`link_btn ${location.pathname === '/about_section' ? 'active' : ''}`} to="/about_section">About Us</Link>
          <Link className={`link_btn ${location.pathname === '/practice_area' ? 'active' : ''}`} to="/practice_area">Practice Areas</Link>
          <Link className={`link_btn ${location.pathname === '/news_page' ? 'active' : ''}`} to="/news_page">News</Link>
          <Link className={`link_btn ${location.pathname === '/attorneys' ? 'active' : ''}`} to="/attorneys">Attorneys</Link>
          <Link className={`link_btn ${location.pathname === '/contact_page' ? 'active' : ''}`} to="/contact_page">Contact Us</Link>
          
          <Link to="/contact_page">
            <button id='free_consultationBtn'>Free consultation</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
