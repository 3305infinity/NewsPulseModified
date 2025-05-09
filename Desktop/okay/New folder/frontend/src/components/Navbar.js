import './cssofcompo.css'
import React, { useState, useEffect } from 'react';
import { FaHome, FaCalendarAlt, FaHistory, FaBookmark, FaTools, 
         FaChevronDown, FaSignInAlt, FaUserPlus, FaMoon, FaSun, 
         FaBell, FaYoutube, FaLink } from 'react-icons/fa';
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('dark-theme');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="/" className="logo-link">
          <span className="logo-icon"></span>
          <span className="logo-text">HACKSTREAK</span>
        </a>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="/" className="nav-link" onClick={closeMobileMenu}>
              <FaHome /> Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/upcoming" className="nav-link" onClick={closeMobileMenu}>
              <FaCalendarAlt /> Upcoming
            </a>
          </li>
          <li className="nav-item">
            <a href="/past" className="nav-link" onClick={closeMobileMenu}>
              <FaHistory /> Past Contests
            </a>
          </li>
          <li className="nav-item">
            <a href="/bookmarks" className="nav-link" onClick={closeMobileMenu}>
              <FaBookmark /> Bookmarks
            </a>
          </li>
          <li className={`nav-item dropdown ${activeDropdown === 'tools' ? 'active' : ''}`}>
            <a 
              href="#" 
              className="nav-link" 
              onClick={(e) => {
                e.preventDefault();
                toggleDropdown('tools');
              }}
            >
              <FaTools /> Tools <FaChevronDown className="dropdown-arrow" />
            </a>
            <div className={`dropdown-content ${activeDropdown === 'tools' ? 'active' : ''}`}>
              <a href="/reminders" className="dropdown-link" onClick={closeMobileMenu}>
                <FaBell /> Set Reminders
              </a>
              <a href="/solutions" className="dropdown-link" onClick={closeMobileMenu}>
                <FaYoutube /> Contest Solutions
              </a>
              <a href="/submit-solution" className="dropdown-link" onClick={closeMobileMenu}>
                <FaLink /> Submit Solution Link
              </a>
            </div>
          </li>
        </ul>

        <div className={`navbar-actions ${isMobileMenuOpen ? 'active' : ''}`}>
          <button className="btn btn-login">
            <a style={{textDecoration:'none',color:'white'}} href="/login">
            <FaSignInAlt /> Login</a>
          </button>
          <button className="btn btn-signup">
            <a style={{textDecoration:'none',color:'white'}}  href="/signup"><FaUserPlus /> Sign Up</a>
          </button>
          <div className="theme-toggle" onClick={toggleTheme}>
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </div>
        </div>

        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;