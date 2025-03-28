import React from 'react';
import './Footer.css'

const Footer = ({ mode = 'day' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`contact-section ${mode}`}>
      <div className="contact-container">
        <div className="contact-wrapper">
          <div>
            <address>
              Lagos, Nigeria
            </address>
            <p>
              eniola.talabi@aol.com
            </p>
            <div className="section-subtitle">
              © Eniola Talabi - MERN Stack Specialist {currentYear}
            </div>
          </div>
          <div>
            <blockquote className="section-subtitle">
              Transforming ideas into digital experiences that inspire and innovate.
            </blockquote>
          </div>
          <div>
            <h4 className="section-subtitle">SERVICES</h4>
            <ul className="section-subtitle" style={{ listStyleType: 'none', padding: 0 }}>
              <li>Web Development</li>
              <li>Figma Design</li>
              <li>Frontend Development</li>
              <li>MERN Stack Development</li>
              <li>Full Stack Development</li>
              <li>Web Design</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;