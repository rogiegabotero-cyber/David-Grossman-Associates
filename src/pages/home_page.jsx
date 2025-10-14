import React, { useState, useEffect } from 'react';
import './home_page.css';
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Background from '../assets/background.webp';
import Background1 from '../assets/background1.webp';

const home_page = () => {
  const images = [Background, Background1];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      id='main'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(58, 58, 58, 0.6)), url(${images[currentIndex]})`,
      }}
    >
      <h1>David Grossman & Associates</h1>
      <h2>Your Legal Solution Starts Here</h2>

      <Link to="/contact_page">
        <button>Contact us</button>
      </Link>
      <div className="slider-arrows">
        <button className="arrow_left" onClick={prevSlide}>
          <ChevronLeft size={40} />
        </button>
        <button className="arrow_right" onClick={nextSlide}>
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default home_page;
