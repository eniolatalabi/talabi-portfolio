import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added for animation
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaUserAlt,
  FaGraduationCap,
  FaCode,
  FaGamepad,
  FaBriefcase,
} from "react-icons/fa";
import "./HeroSection.css";
import CV from "../Assets/EST CV.pdf";

const HeroSection = ({ isNightMode = true }) => {
  const [activeTab, setActiveTab] = useState("bio");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const calculateExperience = () => {
    const startDate = new Date("February 1, 2023");
    const currentDate = new Date();
    let years = currentDate.getFullYear() - startDate.getFullYear();
    const months = currentDate.getMonth() - startDate.getMonth();
    if (months < 0) years--;
    return years;
  };

  return (
    <section className={`hero ${isNightMode ? "night" : "day"}`}>
      <div className="container">
        {/* Left Section */}
        <div className="hero-left">
          <h4>Hello, I'm</h4>
          <h1>Eniola Solomon Talabi</h1>
          <h3>Full-Stack Web Developer</h3>
          <div className="social-icons">
            <a href="https://github.com/eniolatalabi" aria-label="GitHub Profile">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/eniola-solomon-talabi-723648271?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" aria-label="LinkedIn Profile">
              <FaLinkedin />
            </a>
            <a href="https://x.com/abgriffinn?s=21" aria-label="Twitter Profile">
              <FaTwitter />
            </a>
          </div>
          <button className={`cta-button ${isNightMode ? "night" : "day"}`}>
            <a href={CV} target="_blank" rel="noopener noreferrer">
              Preview Resume
            </a>
          </button>
        </div>

        {/* Right Section */}
        <div className="hero-right">
          {/* Stars Animation */}
          {isNightMode && <div className="stars-animation"></div>}

          {/* Card with Framer Motion */}
          <div className="info-card">
            <AnimatePresence mode="wait">
              {activeTab === "bio" && (
                <motion.div
                  key="bio"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card-content"
                >
                  <h4>Bio</h4>
                  <p>Specialization: MERN Stack</p>
                  <p>Strengths: Flexibility, Attention to Detail</p>
                  <p>Soft skills: Communication, Time Management</p>
                </motion.div>
              )}
              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card-content"
                >
                  <h4>Education</h4>
                  <p>Lagos State University - Business Administration</p>
                  <p>Lagos State Polytechnic - Banking and Finance</p>
                  <p>Aptech - Software Engineering</p>
                </motion.div>
              )}
              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card-content"
                >
                  <h4>Skills</h4>
                  <p>Frontend: ★★★★☆</p>
                  <p>Backend: ★★★☆☆</p>
                  <p>Version Control: ★★★★☆</p>
                  <p>Other Languages: C, Java</p>
                </motion.div>
              )}
              {activeTab === "hobbies" && (
                <motion.div
                  key="hobbies"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card-content"
                >
                  <h4>Hobbies</h4>
                  <p>Reading: "Books are a uniquely portable magic."</p>
                  <p>Music: "Where words fail, music speaks."</p>
                  <p>Video Games: "A story you control."</p>
                </motion.div>
              )}
              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card-content"
                >
                  <h4>Experience</h4>
                  <p>{calculateExperience()}+ Yrs</p>
                  <p>SAIL Innovation Lab (2023-2024)</p>
                  <p>HNG12 (2025)</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Icons with Bounce Animation */}
          <div className="card-icons">
            <div
              className={`icon-wrapper ${activeTab === "bio" ? "active-icon" : ""}`}
              onClick={() => handleTabChange("bio")}
            >
              <FaUserAlt />
            </div>
            <div
              className={`icon-wrapper ${activeTab === "experience" ? "active-icon" : ""}`}
              onClick={() => handleTabChange("experience")}
            >
              <FaBriefcase />
            </div>
            <div
              className={`icon-wrapper ${activeTab === "education" ? "active-icon" : ""}`}
              onClick={() => handleTabChange("education")}
            >
              <FaGraduationCap />
            </div>
            <div
              className={`icon-wrapper ${activeTab === "skills" ? "active-icon" : ""}`}
              onClick={() => handleTabChange("skills")}
            >
              <FaCode />
            </div>
            <div
              className={`icon-wrapper ${activeTab === "hobbies" ? "active-icon" : ""}`}
              onClick={() => handleTabChange("hobbies")}
            >
              <FaGamepad />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;