import React, { useState } from 'react';
import './attorneys.css'
import David from '../assets/dg_profile.webp'

const attorneys = () => {

    useState(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, []);

  return (
    <div className='main_didiv'>
        <div className='about_pp'>
            <div className='details_profile'>
               <strong>David Grossman, Esq.</strong>
                <p >
                    <strong>Mr. Grossman</strong> has been an attorney for three decades and is a successful businessperson 
                    and advocate for all sorts of victims. Much of his career focused on risk mitigation and 
                    compliance. His firm, which was established in New York nearly 30 years ago, originally 
                    specialized in victims rights, advocating for individuals neglected in institutions.
                    <br />
                    About a decade ago, they expanded into mass torts and formed partnerships with some of the 
                    largest firms in the nation and advocates for victims of corporate greed who caused all sorts 
                    of harms to the environment, unions and
                </p> 
            </div>
            
            <div className='profile_details'>
               <img src={David} alt="David Grossman" />
               <strong>Partner</strong>
            </div>
        </div>
        
    </div>
  )
}

export default attorneys