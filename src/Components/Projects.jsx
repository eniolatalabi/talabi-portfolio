import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "FastAPI Portfolio API",
    role: "Solo build",
    stack: "FastAPI · PostgreSQL · Pytest",
    description:
      "Production REST API: JWT auth with refresh token rotation and reuse detection, rate-limited login, object-level authorization. 42 tests, 95% coverage, CI-gated, live on Render.",
    liveLink: "https://fastapi-portfolio-leme.onrender.com/docs",
    codeLink: "https://github.com/eniolatalabi/fastapi-portfolio",
  },
  {
    id: 2,
    title: "Sentiment Radar",
    role: "Solo build",
    stack: "Python · scikit-learn · Streamlit",
    description:
      "Brand sentiment dashboard over 890 scraped reviews: negation-aware TF-IDF with logistic regression, cross-validated at 84.8%, confidence-banded verdicts instead of overconfident coin flips.",
    codeLink: "https://github.com/eniolatalabi/sentiment-radar",
  },
  {
    id: 3,
    title: "Diabetes Predictor",
    role: "Co-built",
    stack: "Python · scikit-learn · Streamlit",
    description:
      "Diabetes risk screener: leakage-safe imputation inside the pipeline, model selected by cross-validation (ROC-AUC 0.837), version-guarded artifacts that refuse to load on mismatch.",
    codeLink: "https://github.com/eniolatalabi/diabetes-predictor",
  },
  {
    id: 4,
    title: "ReconcileAI",
    role: "Frontend, team project",
    stack: "Next.js · React · TypeScript · Tailwind",
    description:
      "AI-powered finance operations for SMBs: automated matching of sales, payments, and bank deposits so growing businesses close their books in minutes.",
    liveLink: "https://reconcile-ai.com",
  },
];

const Projects = () => {
  return (
    <section className="work">
      <div className="work-inner section-inner">
        <p className="eyebrow">Selected Work</p>

        <ol className="work-list">
          {projects.map((project, index) => (
            <li className="work-item" key={project.id}>
              <span className="work-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="work-body">
                <div className="work-head">
                  <h3 className="work-title">{project.title}</h3>
                  <span className="work-role">{project.role}</span>
                </div>

                <p className="work-desc">{project.description}</p>

                <div className="work-foot">
                  <span className="work-stack">{project.stack}</span>
                  <div className="work-links">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        Live <FiArrowUpRight />
                      </a>
                    )}
                    {project.codeLink && (
                      <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Projects;
