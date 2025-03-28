import React, { useState} from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaUserAlt,
  FaGraduationCap,
  FaCode,
  FaGamepad,
  FaBriefcase
} from "react-icons/fa";
import "./HeroSection.css";
import CV from "../Assets/EST CV.pdf"

const HeroSection = ({ isNightMode = true }) => {
  const [activeTab, setActiveTab] = useState("bio");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Calculate years of experience
  const calculateExperience = () => {
    const startDate = new Date("February 1, 2023");
    const currentDate = new Date();
    
    let years = currentDate.getFullYear() - startDate.getFullYear();
    const months = currentDate.getMonth() - startDate.getMonth();
    
    if (months < 0) {
      years--;
    }
    
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
              <a 
                href={CV}
                target="_blank" 
                rel="noopener noreferrer"
              >
              Preview Resume
            </a>
          </button>
        </div>

        {/* Right Section */}
        <div className="hero-right">
          {/* Star Animation or Sun Icon */}
          <div className="theme-element">
            {isNightMode ? (
              <div className="stars-animation"></div>
            ): ("")}
          </div>

          {/* Card */}
          <div className="info-card">
            {activeTab === "bio" && (
              <div className="card-content">
                <h4>Bio</h4>
                <p>Specialization: MERN Stack</p>
                <p>Strengths: Flexibility, Attention to Detail</p>
                <p>Soft skills: Communication, Time Management</p>
              </div>
            )}
            {activeTab === "education" && (
              <div className="card-content">
                <h4>Education</h4>
                <p>Lagos State University - Business Administration</p>
                <p>Lagos State Polytechnic - Banking and Finance</p>
                <p>Aptech - Software Engineering</p>
              </div>
            )}
            {activeTab === "skills" && (
              <div className="card-content">
                <h4>Skills</h4>
                <p>Frontend: ★★★★☆</p>
                <p>Backend: ★★★☆☆</p>
                <p>Version Control: ★★★★☆</p>
                <p>Other Languages: C, Java</p>
              </div>
            )}
            {activeTab === "hobbies" && (
              <div className="card-content">
                <h4>Hobbies</h4>
                <p>Reading: "Books are a uniquely portable magic."</p>
                <p>Music: "Where words fail, music speaks."</p>
                <p>Video Games: "A story you control."</p>
              </div>
            )}
            {activeTab === "experience" && (
              <div className="card-content">
                <h4>Experience</h4>
                <p>{calculateExperience()}+ Yrs</p>
                <p>SAIL Innovation Lab (2023-2024)</p>
                <p>HNG12 (2025)</p>
              </div>
            )}
          </div>

          {/* Icons */}
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