import React from 'react'
import './team.css'
import DgProfile from '../assets/dg_profile.webp'

const team = () => {
  return (
    <div className='profile_div'>
        <h1>OUR TEAM</h1>
        <img src={DgProfile} alt="David Grossman profile" />
        <strong>David Grossman, Esq.</strong>
        <p>David Grossman &amp; Associates PLLC</p>
    </div>
  )
}

export default team