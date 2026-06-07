import React from "react";
import "./Projects.css";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiPostgresql,
  SiPython,
  SiScikitlearn,
  SiStreamlit,
  SiPytest,
} from "react-icons/si";

const techIcons = {
  React: <SiReact className="react-icon" />,
  Nextjs: <SiNextdotjs className="next-icon" />,
  Typescript: <SiTypescript className="typescript-icon" />,
  "Tailwind CSS": <SiTailwindcss className="tailwind-icon" />,
  FastAPI: <SiFastapi className="fastapi-icon" />,
  PostgreSQL: <SiPostgresql className="postgres-icon" />,
  Python: <SiPython className="python-icon" />,
  "scikit-learn": <SiScikitlearn className="sklearn-icon" />,
  Streamlit: <SiStreamlit className="streamlit-icon" />,
  Pytest: <SiPytest className="pytest-icon" />,
};

// Screenshots live in public/screenshots/ so a missing file degrades to
// the styled fallback instead of breaking the build.
const projects = [
  {
    id: 1,
    title: "FastAPI Portfolio API",
    role: "Solo build",
    image: "/screenshots/fastapi-portfolio.png",
    stack: ["FastAPI", "PostgreSQL", "Pytest"],
    description:
      "Production REST API: JWT auth with refresh token rotation and reuse detection, rate-limited login, object-level authorization. 42 tests, 95% coverage, CI-gated, live on Render.",
    liveLink: "https://fastapi-portfolio-leme.onrender.com/docs",
    codeLink: "https://github.com/eniolatalabi/fastapi-portfolio",
    bgColor: "white",
  },
  {
    id: 2,
    title: "Sentiment Radar",
    role: "Solo build",
    image: "/screenshots/sentiment-radar.png",
    stack: ["Python", "scikit-learn", "Streamlit"],
    description:
      "Brand sentiment dashboard over 890 scraped reviews: negation-aware TF-IDF with logistic regression, cross-validated at 84.8%, confidence-banded verdicts instead of overconfident coin flips.",
    codeLink: "https://github.com/eniolatalabi/sentiment-radar",
    bgColor: "black",
  },
  {
    id: 3,
    title: "Diabetes Predictor",
    role: "Co-built",
    image: "/screenshots/diabetes-predictor.png",
    stack: ["Python", "scikit-learn", "Streamlit"],
    description:
      "Diabetes risk screener: leakage-safe imputation inside the pipeline, model selected by cross-validation (ROC-AUC 0.837), version-guarded artifacts that refuse to load on mismatch.",
    codeLink: "https://github.com/eniolatalabi/diabetes-predictor",
    bgColor: "white",
  },
  {
    id: 4,
    title: "ReconcileAI",
    role: "Frontend, team project",
    image: "/screenshots/reconcile-ai.png",
    stack: ["Nextjs", "React", "Typescript", "Tailwind CSS"],
    description:
      "AI-powered finance operations for SMBs: automated matching of sales, payments, and bank deposits so growing businesses close their books in minutes.",
    liveLink: "https://reconcile-ai.com",
    bgColor: "black",
  },
];

const ProjectImage = ({ project }) => {
  const [failed, setFailed] = React.useState(false);
  const src = project.image;

  if (!src || failed) {
    return (
      <div className={`project-image-fallback ${project.bgColor}`}>
        <span>{project.title}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`${project.title} screenshot`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

const ProjectCard = ({ project, isNightMode }) => (
  <div className={`project-card ${isNightMode ? "night" : "day"}`}>
    <div className="project-image">
      <ProjectImage project={project} />
    </div>
    <div className="project-info">
      <h3>{project.title}</h3>
      <p className="project-role">{project.role}</p>
      <p className="project-description">{project.description}</p>
      <div className="project-stack">
        {project.stack.map((tech) => (
          <span className="stack-item" key={tech} title={tech}>
            {techIcons[tech] || tech}
            <span className="stack-label">{tech}</span>
          </span>
        ))}
      </div>
      <div className="project-links">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
          >
            <FaExternalLinkAlt /> Live
          </a>
        )}
        {project.codeLink && (
          <a
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code`}
          >
            <FaGithub /> Code
          </a>
        )}
      </div>
    </div>
  </div>
);

const SelectedWorks = ({ isNightMode, id }) => (
  <section className={`selected-works ${isNightMode ? "night" : "day"}`} id={id}>
    <div className="project-section">
      <h2 className="title">Selected Works</h2>
      <div className="grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} isNightMode={isNightMode} />
        ))}
      </div>
    </div>
  </section>
);

export default SelectedWorks;
