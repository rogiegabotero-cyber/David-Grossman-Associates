import React, { useState } from 'react';
import './header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // get current URL

  const handleEmailClick = (e) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleClose = () => setShowForm(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent!');
    setShowForm(false);
  };

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
            <a href="#" onClick={handleEmailClick} className="contact-link">
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

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <label>To:
                <input type="email" name="to" value="david@davidgrossmanandassociates.com" readOnly />
              </label>
              <label>From:
                <input type="email" name="email" required placeholder="Your email address" />
              </label>
              <label>Message:
                <textarea name="message" rows="4" required placeholder="Write your message here..."></textarea>
              </label>
              <label>Attach File:
                <input type="file" name="attachment" />
              </label>

              <div className="form-buttons">
                <button type="button" onClick={handleClose} className="cancel-btn">Cancel</button>
                <button type="submit" className="send-btn">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
