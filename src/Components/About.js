import React from "react";
import "./About.css";
import ProfileImage from "../Assets/profile.jpg";
import {
  FaHtml5,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaJava,
  FaAngular,
} from "react-icons/fa";
import {
  SiFigma,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiEslint,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";

const About = ({ isNightMode = true }) => {
  // Calculate years of experience
  const startDate = new Date("2023-02-01");
  const currentDate = new Date();
  const monthsDiff = (currentDate - startDate) / (1000 * 60 * 60 * 24 * 30.44);
  const years = Math.floor(monthsDiff / 12);
  

  return (
    <section className={`about-skillset ${isNightMode ? "night" : "day"}`}>
      <div className="about-container">
        {/* Left Section - Profile Photo */}
        <div className="left-fixed">
          <img src={ProfileImage} alt="Eniola Solomon Talabi" />
        </div>

        {/* Right Content Section */}
        <div className="right-content">
          {/* About Me */}
          <div className="about-text">
            <h2>About Me</h2>
            <p>
            A masterful Full Stack Developer with over {years} years of dedicated experience, 
            specializing in the MERN stack—MongoDB, Express, React, and Node.js. 
            Creating digital experiences that seamlessly bridge user needs with technological possibilities.
            Development is approached as both science and art—engineering scalable systems while crafting intuitive interfaces. 
            Transforming concepts into robust applications that excel in scale, security, and user satisfaction.
            </p>
          </div>

          {/* Skillset */}
          <div className="skillset">
            <h2>My Skillset</h2>
            <div className="major-icons">
              <div className="icon-container">
                <FaHtml5 className="icon html" />
                <span className="icon-tooltip">HTML5</span>
              </div>
              <div className="icon-container">
                <FaJsSquare className="icon javascript" />
                <span className="icon-tooltip">JavaScript</span>
              </div>
              <div className="icon-container">
                <FaReact className="icon react" />
                <span className="icon-tooltip">React</span>
              </div>
              <div className="icon-container">
                <FaNodeJs className="icon nodejs" />
                <span className="icon-tooltip">Node.js</span>
              </div>
              <div className="icon-container">
                <SiMongodb className="icon mongo" />
                <span className="icon-tooltip">MongoDB</span>
              </div>
              <div className="icon-container">
                <SiExpress className="icon express" />
                <span className="icon-tooltip expresso">Express</span>
              </div>
              <div className="icon-container">
                <SiTailwindcss className="icon tailwind" />
                <span className="icon-tooltip">Tailwind CSS</span>
              </div>
            </div>
            <div className="small-icons">
              <div className="icon-container">
                <SiFigma className="icon faded" />
                <span className="icon-tooltip">Figma</span>
              </div>
              <div className="icon-container">
                <SiEslint className="icon faded" />
                <span className="icon-tooltip">ESLint</span>
              </div>
              <div className="icon-container">
                <FaJava className="icon faded" />
                <span className="icon-tooltip">Java</span>
              </div>
              <div className="icon-container">
                <SiNextdotjs className="icon faded" />
                <span className="icon-tooltip">Next.js</span>
              </div>
              <div className="icon-container">
                <FaAngular className="icon faded" />
                <span className="icon-tooltip">Angular</span>
              </div>
              <div className="icon-container">
                <SiTypescript className="icon faded" />
                <span className="icon-tooltip">TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;