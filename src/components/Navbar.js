//esversion: 6
/* jshint ignore:end */
/* jshint ignore:start */

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from'../images/logo.svg';
import {FaAlignRight} from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleToggle = () => {
        setIsOpen(!isOpen);
        //console.log(isOpen)
    }
  return (
    <nav className  = "navbar">
        <div className = "nav-center">
            <div className = "nav-header">
                <Link to = "/">
                    <img src = {logo} alt = "Beach resort" />
                </Link>
                <button type="button" className = "nav-btn" onClick={handleToggle}>
                    <FaAlignRight className = "nav-icon" />
                </button>
            </div>
            <ul className = {isOpen ? "nav-links show-nav" : "nav-links"}>
                <li>
                    <Link to = "/">Home</Link>
                </li>
                  <li>
                      <Link to="/rooms">Rooms</Link>
                  </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
