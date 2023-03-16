import React, { useState} from 'react';
import './SideBar.css';
import {
  FaBars,
  FaUserFriends,
  FaImages,
  FaBorderAll
} from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { NavLink } from 'react-router-dom';
import { BsChatSquareQuoteFill } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';

const SideBar = ( {children}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout())
    .unwrap()
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.log(error)
    });
  }
  const menuItem = [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: <MdDashboard />
    },
    {
      path: '/admin/posts',
      name: 'Posts',
      icon: <FaImages />
    },
    {
      path: '/admin/user',
      name: 'User',
      icon: <FaUserFriends />
    },
    {
      path: '/admin/category',
      name: 'Category',
      icon: <FaBorderAll/>
    },
    {
      path: '/admin/quotes',
      name: 'Quotes',
      icon: <BsChatSquareQuoteFill />
    }
  ]
  return (
    <div className='container'>
      <div style={{width: isOpen ? "200px" : '50px'}} className="sidebar">
        <div className="top-section">
          <h1 style={{display: isOpen ? "block" : 'none'}} className='logo'>Admin</h1>
          <div className="bars" style={{marginLeft: isOpen ? '50px' : '0px'}}>
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key = {index} className='link' activeclassname='active'>
              <div className="icon">{item.icon}</div>
              <div  className="link-text" style={{display: isOpen ? "block" : 'none'}}>{item.name}</div>
            </NavLink>
          ))
        }
        <button className='logout' onClick={handleLogOut}><h4 style={{display: isOpen ? "block" : 'none'}}>LogOut</h4><FiLogOut/></button>
      </div>
      <main>{children}</main>
    </div>
  )
}

export default SideBar
