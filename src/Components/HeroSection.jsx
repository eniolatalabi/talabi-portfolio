import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaGraduationCap,
  FaCode,
  FaBriefcase,
} from "react-icons/fa";
import "./HeroSection.css";

const TABS = {
  experience: {
    icon: <FaBriefcase />,
    title: "Experience",
    lines: [
      "Freelance Full-Stack Engineer (2025 - Present)",
      "HNG Internship 12, Full-Stack (2025)",
      "SAIL Innovation Lab (2023 - 2024)",
    ],
  },
  education: {
    icon: <FaGraduationCap />,
    title: "Education",
    lines: [
      "Aptech, Software Engineering (2024 - 2026)",
      "Lagos State University, B.Sc. Business Administration (2021 - 2023)",
    ],
  },
  skills: {
    icon: <FaCode />,
    title: "Skills",
    lines: [
      "Frontend: React, Next.js, React Native, Tailwind",
      "Backend: FastAPI, Node.js, Express",
      "Data: PostgreSQL, MongoDB, Supabase",
      "Applied ML: Python, scikit-learn",
    ],
  },
};

const HeroSection = ({ isNightMode = true }) => {
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <section className={`hero ${isNightMode ? "night" : "day"}`}>
      <div className="container">
        <div className="hero-left">
          <h4>Hello, I'm</h4>
          <h1>Eniola Solomon Talabi</h1>
          <h3>Full-Stack Engineer</h3>
          <p className="hero-intro">
            I build frontend-led products with React, Next.js, and React
            Native, backed by FastAPI and Node services that ship tested,
            documented, and deployed. Based in Lagos, Nigeria.
          </p>
          <div className="social-icons">
            <a
              href="https://github.com/eniolatalabi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/eniolasolomontalabi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a href="mailto:talabi.eniola.s@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
          <a
            className={`cta-button ${isNightMode ? "night" : "day"}`}
            href="/Eniola_Talabi_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview Resume
          </a>
        </div>

        <div className="hero-right">
          <div className="info-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="card-content"
              >
                <h4>{TABS[activeTab].title}</h4>
                {TABS[activeTab].lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="card-icons">
            {Object.entries(TABS).map(([key, tab]) => (
              <div
                key={key}
                className={`icon-wrapper ${activeTab === key ? "active-icon" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                {tab.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
