import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-inner section-inner">
        <p className="eyebrow">Full-Stack Engineer / Lagos, Nigeria</p>

        <h1 className="hero-name">
          Eniola Solomon<br />Talabi
        </h1>

        <p className="hero-statement">
          I build frontend-led products with React, Next.js, and React Native,
          backed by FastAPI and Node services that ship tested, documented, and
          deployed.
        </p>

        <div className="hero-actions">
          <a
            className="hero-resume"
            href="/Eniola_Talabi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            View resume <FiArrowUpRight />
          </a>

          <div className="hero-links">
            <a href="https://github.com/eniolatalabi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/eniolasolomontalabi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="mailto:talabi.eniola.s@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
