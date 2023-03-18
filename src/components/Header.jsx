import React, { useState } from 'react';
import './Header.css';
import avatar from '../assets/profile.png'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  let data = localStorage.getItem('user') ?  JSON.parse(localStorage.getItem('user')) : {};
  let name = data?.user?.name ? data?.user?.name : 'Admin';
  let image = data?.user?.image ? data?.user?.image : avatar

  return (
    <div className='header'>
        <div className="image" >
            <img src={image} alt="profile"/>
        </div>
        <div className="text">
          <h1 className='logo'>{name}</h1>
        </div>
    </div>
  )
}

export default Header