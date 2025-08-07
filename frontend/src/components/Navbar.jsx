import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">📸 Media Gallery</Link>
      </div>
      <ul className="navbar-links">
        {isLoggedIn && (
          <>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/upload">Upload</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
