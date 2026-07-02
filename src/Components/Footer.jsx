import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner section-inner">
        <div className="footer-left">
          <span className="footer-mark">EST<span className="footer-dot">.</span></span>
          <span className="footer-copy">© {year} Eniola Solomon Talabi</span>
        </div>
        <div className="footer-links">
          <a href="https://github.com/eniolatalabi" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/eniolasolomontalabi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:talabi.eniola.s@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
