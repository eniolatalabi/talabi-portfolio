import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import "./NavBar.css";

const LINKS = [
  { to: "about", label: "About" },
  { to: "projects", label: "Work" },
  { to: "contact", label: "Contact" },
];

const NavBar = ({ onThemeToggle }) => {
  const [isNightMode, setIsNightMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isNightMode;
    setIsNightMode(next);
    onThemeToggle(next);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          offset={-80}
          className="nav-mark"
          onClick={closeMenu}
        >
          EST<span className="nav-dot">.</span>
        </ScrollLink>

        <div className="nav-right">
          <ul className="nav-links">
            {LINKS.map((link) => (
              <li key={link.to}>
                <ScrollLink to={link.to} smooth={true} duration={500} offset={-80}>
                  {link.label}
                </ScrollLink>
              </li>
            ))}
          </ul>

          <button
            className="nav-theme"
            onClick={toggleTheme}
            aria-label={isNightMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isNightMode ? <FiSun /> : <FiMoon />}
          </button>

          <button
            className="nav-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div className={`nav-overlay ${menuOpen ? "open" : ""}`}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.to}>
              <ScrollLink to={link.to} smooth={true} duration={500} offset={-80} onClick={closeMenu}>
                {link.label}
              </ScrollLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
