import React from "react";
import "./About.css";
import {
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFastapi,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiPython,
  SiScikitlearn,
  SiGithubactions,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const CORE_SKILLS = [
  { icon: <FaReact className="icon react" />, label: "React" },
  { icon: <SiNextdotjs className="icon next" />, label: "Next.js" },
  { icon: <TbBrandReactNative className="icon react" />, label: "React Native" },
  { icon: <SiTypescript className="icon typescript" />, label: "TypeScript" },
  { icon: <SiJavascript className="icon javascript" />, label: "JavaScript" },
  { icon: <SiTailwindcss className="icon tailwind" />, label: "Tailwind CSS" },
  { icon: <SiFastapi className="icon fastapi" />, label: "FastAPI" },
  { icon: <FaNodeJs className="icon nodejs" />, label: "Node.js" },
];

const SUPPORTING_SKILLS = [
  { icon: <SiExpress className="icon faded" />, label: "Express" },
  { icon: <SiMongodb className="icon faded" />, label: "MongoDB" },
  { icon: <SiPostgresql className="icon faded" />, label: "PostgreSQL" },
  { icon: <SiSupabase className="icon faded" />, label: "Supabase" },
  { icon: <SiPython className="icon faded" />, label: "Python" },
  { icon: <SiScikitlearn className="icon faded" />, label: "scikit-learn" },
  { icon: <SiGithubactions className="icon faded" />, label: "GitHub Actions" },
];

const About = ({ isNightMode = true, id }) => {
  return (
    <section className={`about-skillset ${isNightMode ? "night" : "day"}`} id={id}>
      <div className="about-container">
        <div className="right-content">
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              I'm a full-stack engineer in Lagos, strongest on the frontend:
              React, Next.js, and React Native products that ship. Behind
              them I build FastAPI and Node services held to a production
              bar: my flagship API runs 42 tests at 95% coverage, gated in
              CI, live on Render. Currently building client products as a
              freelance engineer.
            </p>
          </div>

          <div className="skillset">
            <h2>My Skillset</h2>
            <div className="major-icons">
              {CORE_SKILLS.map((skill) => (
                <div className="icon-container" key={skill.label}>
                  {skill.icon}
                  <span className="icon-tooltip">{skill.label}</span>
                </div>
              ))}
            </div>
            <div className="small-icons">
              {SUPPORTING_SKILLS.map((skill) => (
                <div className="icon-container" key={skill.label}>
                  {skill.icon}
                  <span className="icon-tooltip">{skill.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
