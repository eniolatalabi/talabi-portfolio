import React, { useState, useEffect } from "react";
import "./Projects.css";
import { FaFigma, FaExternalLinkAlt } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiAntdesign,
  SiTailwindcss,
  SiVuedotjs,
  SiFirebase,
  SiCss3,
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";

const techIcons = {
  React: <SiReact className="react-icon" />,
  "Node.js": <SiNodedotjs className="node-icon" />,
  MongoDB: <SiMongodb className="mongo-icon" />,
  "Ant Design": <SiAntdesign className="antd-icon" />,
  "Tailwind CSS": <SiTailwindcss className="tailwind-icon" />,
  CSS: <SiCss3 className="css-icon" />,
  Vue: <SiVuedotjs className="vue-icon" />,
  Firebase: <SiFirebase className="firebase-icon" />,
  Nextjs: <SiNextdotjs className="next-icon" />,
  Typescript: <SiTypescript className="typescript-icon" />,
};

const projects = [
  {
    id: 1,
    title: "ReconXi",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    stack: ["Nextjs", "React", "Typescript", "Tailwind CSS"],
    description: "Simplifies financial reconciliation for accountants, auditors, financial analysts, small businesses, and schools.",
    figmaLink: "https://www.figma.com/design/DIG58StAdLwxcEONbS1JAC/ReconXi?node-id=7540-18644&t=7VWB69LXgzBBq3lr-1",
    liveLink: "https://reconxi.com/",
    bgColor: "white"
  },
  {
    id: 2,
    title: "Kidshive",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    stack: ["React", "Node.js", "MongoDB", "Ant Design", "Tailwind CSS"],
    description: "A kid-friendly LMS teaching programming with interactive courses.",
    figmaLink: "https://www.figma.com/kidshive",
    liveLink: "https://kidshive-vtjv.onrender.com/",
    bgColor: "black"
  },
  {
    id: 3,
    title: "BidSpirit",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    stack: ["React", "CSS"],
    description: "An online auction platform with live bidding features.",
    figmaLink: "https://www.figma.com/bidspirit",
    liveLink: "https://bidspiritauction.vercel.app",
    bgColor: "white"
  },
  {
    id: 4,
    title: "TravelSmart",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    stack: ["React", "Tailwind CSS"],
    description: "Travel advice platform with community blogs and insights.",
    liveLink: "https://travelsmart-rho.vercel.app/",
    bgColor: "black"
  },
  {
    id: 5,
    title: "Linguastand",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    stack: ["React"],
    description: "Language processing tool with real-time translation.",
    liveLink: "https://ai-text-processor-hng-orpin.vercel.app",
    bgColor: "white"
  },
  {
    id: 6,
    title: "ConfTicket",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    stack: ["React", "CSS"],
    description: "Ticket booking system with PDF generation.",
    figmaLink: "https://www.figma.com/confticket",
    liveLink: "https://ticket-generator-hng-stage-two.vercel.app/",
    bgColor: "black"
  }
];

const SelectedWorks = ({ isNightMode, id }) => {
  return (
    <section className={`selected-works ${isNightMode ? 'night' : 'day'}`}>
      <div className="project-section">
        <h2 className="title">
          Selected Works
        </h2>
        <div className="grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} isNightMode={isNightMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, isNightMode }) => {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const shouldShowDescription = isMobile || hovered;
  const shouldShowImage = hovered;

  return (
    <div 
      className={`card ${project.bgColor} ${isNightMode ? 'night' : 'day'}`}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onClick={() => isMobile && setHovered(!hovered)}
    >
      <div className={`background ${shouldShowImage ? 'hovered' : ''}`}>
        <img 
          className="project-image" 
          src={project.image} 
          alt={project.title}
        />
      </div>
      
      <div className="content">
        <h3 className="project-title">
          {project.title}
        </h3>
        <p className={`project-description ${shouldShowDescription ? 'hovered' : ''}`}>
          {project.description}
        </p>
      </div>

      <div className="stack-icons">
        {project.stack.map((tech, index) => (
          techIcons[tech] && (
            <div 
              key={index} 
              className="tech-icon"
              style={{ transform: `translateX(${index * -5}px)` }}
            >
              {techIcons[tech]}
              <span className="tech-tooltip">{tech}</span>
            </div>
          )
        ))}
      </div>

      <div className="actions">
        {project.figmaLink && (
          <a 
            href={project.figmaLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="action-button figma-button"
          >
            <FaFigma />
            <span className="action-tooltip">View Design</span>
          </a>
        )}
        <a 
          href={project.liveLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="action-button live-btn"
        >
          <FaExternalLinkAlt />
          <span className="action-tooltip">View Live</span>
        </a>
      </div>
    </div>
  );
};

export default SelectedWorks;