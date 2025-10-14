import React, { useState } from 'react';
import './news_page.css'
import { Link } from "react-router-dom";
import Upset from '../assets/upset.webp'
import Lawyer from '../assets/lawyer_fill.webp'
import WebChem from '../assets/web_chem.webp'

const news = () => {

    useState(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, []);
          
  return (
    <div className='news_page'>
        <div className='container8'>
            <div className='Image'>
                <img src={Lawyer} alt="" />
            </div>
            <div className='mix'>
                <div className='words'>
                    <h2>
                    Social media platforms are often engineered to maximize user engagement, leading to addictive behaviors
                    </h2>
                    <Link className='learn_more' to="/extended_news">
                        Read More » 
                    </Link>
                </div>

                <div className='date'>
                    <data value="">April 10, 2025</data>
                    
                    <p>No Comments</p>
                </div>
            </div>
            
        </div>

        <div className='container8'>
            <div className='Image'>
                <img src={WebChem} alt="" />
            </div>
            <div className='mix'>
                <div className='words'>
                    <h2>
                        The Guardian” March 10, 2025: PFAS are poisoning our soil and polluting our lungs
                    </h2>
                    <Link className='learn_more' to="/expanded_news2">
                        Read More » 
                    </Link>
                </div>
                <div className='date'>
                    <data value="">April 10, 2025</data>
                    ·
                    <p>No Comments</p>
                </div>
            </div>
            
        </div>

        <div className='container8'>
            <div className='Image'>
                <img src={Upset} alt="" />
            </div>
            <div className='mix'>
                <div className='words'>
                    <h2>
                        The Athens Independent reported that the city of Athens authorized Mayor Steve Patterson to contract with Grossman & Kelly.
                    </h2>
                    <Link className='learn_more' to="/expanded_news3">
                        Read More » 
                    </Link>
                </div>
                <div className='date'>
                    <data value="">April 10, 2025</data>
                    ·
                    <p>No Comments</p>
                </div> 
            </div>
            
        </div>

        
    </div>
  )
}

export default news