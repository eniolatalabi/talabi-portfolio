import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const Footer = ({ isNightMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer-section ${isNightMode ? "night" : "day"}`}>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-identity">
            <h4 className="footer-title">Eniola Solomon Talabi</h4>
            <ul className="footer-list">
              <li>Full-Stack Engineer</li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>

          <div className="footer-nav">
            <h4 className="footer-title">Explore</h4>
            <ul className="footer-list">
              <li><ScrollLink to="about" smooth={true} duration={500} offset={-70}>About</ScrollLink></li>
              <li><ScrollLink to="projects" smooth={true} duration={500} offset={-70}>Projects</ScrollLink></li>
              <li><ScrollLink to="contact" smooth={true} duration={500} offset={-70}>Contact</ScrollLink></li>
            </ul>
          </div>

          <div className="footer-elsewhere">
            <h4 className="footer-title">Elsewhere</h4>
            <ul className="footer-list">
              <li>
                <a href="https://github.com/eniolatalabi" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/eniolasolomontalabi" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin /> LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:talabi.eniola.s@gmail.com">
                  <FaEnvelope /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-copy">
          © {currentYear} Eniola Solomon Talabi
        </div>
      </div>
    </footer>
  );
};

export default Footer;
