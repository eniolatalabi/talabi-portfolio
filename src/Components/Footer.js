import React from "react";
import "./Footer.css";

const Footer = ({ isNightMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer-section ${isNightMode ? "night" : "day"}`}>
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Section - Location */}
          <div className="footer-location">
            <h4 className="footer-title">Location</h4>
            <address className="footer-address">Lagos, Nigeria</address>
          </div>

          {/* Middle Section - Principles */}
          <div className="footer-principles">
            <h4 className="footer-title">Principles</h4>
            <ul className="footer-list">
              <li>Write clean, readable code</li>
              <li>Follow DRY (Don't Repeat Yourself)</li>
              <li>Use meaningful variable names</li>
              <li>Keep components modular & reusable</li>
              <li>Optimize for performance & accessibility</li>
            </ul>
          </div>

          {/* Right Section - Services */}
          <div className="footer-services">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-list">
              <li>Web Development</li>
              <li>Figma Design</li>
              <li>Frontend Development</li>
              <li>MERN Stack Development</li>
              <li>Full Stack Development</li>
              <li>Web Design</li>
            </ul>
          </div>
        </div>
        {/* Copyright */}
        <div className="footer-copy">
          © Eniola Talabi - MERN Stack Specialist {currentYear}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
