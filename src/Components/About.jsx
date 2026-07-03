import React from "react";
import "./About.css";

const SKILLS = [
  {
    label: "Frontend",
    value: "React, Next.js, React Native, TypeScript, Tailwind CSS",
  },
  { label: "Backend", value: "FastAPI, Node.js, Express, REST, JWT" },
  { label: "Data", value: "PostgreSQL, MongoDB, Supabase" },
  { label: "Applied ML", value: "Python, scikit-learn" },
  { label: "Tooling", value: "Git, GitHub Actions, Vercel, Render" },
];

const About = () => {
  return (
    <section className="about">
      <div className="about-inner section-inner">
        <p className="eyebrow">About</p>

        <div className="about-grid">
          <div className="about-copy">
            <p>
              I am a full-stack engineer in Lagos, strongest on the frontend:
              React, Next.js, and React Native products that ship. Behind them I
              build FastAPI and Node services held to a production bar. My
              flagship API runs 42 tests at 95% coverage, gated in CI, live on
              Render.
            </p>
            <p>Building production web and mobile applications.</p>
          </div>

          <div className="about-skills">
            {SKILLS.map((skill) => (
              <div className="skill-row" key={skill.label}>
                <span className="skill-label">{skill.label}</span>
                <span className="skill-value">{skill.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
