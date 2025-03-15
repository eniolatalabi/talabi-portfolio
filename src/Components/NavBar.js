import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import './NavBar.css';
import logo from '../Assets/logo.png';

const NavBar = ({ onThemeToggle }) => {
  const [isNightMode, setIsNightMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = !isNightMode;
    setIsNightMode(newTheme);
    document.body.classList.toggle('dark-mode', newTheme);
    onThemeToggle(newTheme);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isNightMode ? 'night' : 'day'}`}>
      <div className="logo">
        <ScrollLink to="home" smooth={true} duration={500} onClick={closeMenu}>
          <img src={logo} alt="Logo" />
        </ScrollLink>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <ScrollLink to="about" smooth={true} duration={500} onClick={closeMenu}>
            About
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="projects" smooth={true} duration={500} onClick={closeMenu}>
            Projects
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="contact" smooth={true} duration={500} onClick={closeMenu}>
            Contact
          </ScrollLink>
        </li>
        {menuOpen && (
          <li className="theme-toggle-mobile">
            <div
              className={`toggle-container ${isNightMode ? 'night' : 'day'}`}
              onClick={() => {
                toggleTheme();
                closeMenu();
              }}
            >
              <div className={`toggle-switch ${isNightMode ? 'night' : 'day'}`}>
                {isNightMode ? 'NIGHT' : 'DAY'}
              </div>
            </div>
          </li>
        )}
      </ul>

      <div className="theme-toggle">
        <div
          className={`toggle-container ${isNightMode ? 'night' : 'day'}`}
          onClick={toggleTheme}
        >
          <div className={`toggle-switch ${isNightMode ? 'night' : 'day'}`}>
            {isNightMode ? 'NIGHT' : 'DAY'}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
