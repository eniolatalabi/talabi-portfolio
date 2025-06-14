/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
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
  SiVite,
  SiGooglecloud,
} from "react-icons/si";
import { MdRestaurantMenu, MdLanguage } from "react-icons/md";
import reconxiImg from "../Assets/reconxi.png";
import menuswiftImg from "../Assets/menuswift.png";
import kidshive from "../Assets/kidshive.jpg";

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
  Vite: <SiVite className="vite-icon" />,
  "Google OAuth": <SiGooglecloud className="google-icon" />,
  "Multi-language": <MdLanguage className="language-icon" />,
};

const projects = [
  {
    id: 1,
    title: "ReconXi",
    image: reconxiImg,
    stack: ["Nextjs", "React", "Typescript", "Tailwind CSS"],
    figmaLink: "https://www.figma.com/design/DIG58StAdLwxcEONbS1JAC/ReconXi?node-id=7540-18644&t=7VWB69LXgzBBq3lr-1",
    liveLink: "https://reconxi.com/",
    bgColor: "white"
  },
  {
    id: 2,
    title: "Kidshive",
    image: kidshive,
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
    title: "MenuSwift",
    image: menuswiftImg,
    stack: ["React", "Vite", "Typescript", "Google OAuth"],
    description: "Modern restaurant management system with QR menu generation, order processing, and multi-language support for seamless dining experiences.",
      figmaLink: "https://www.figma.com/design/wbk77jTVE8weNTkO9so4bm/PROJECT-MENUCARD-APP---DESIGN?node-id=5907-14152&t=Uv4uEjO7fEJNdGSt-1",
    liveLink: "https://visit.menu/",
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
  const cardRef = useRef(null);
  const buttonRefs = useRef([]);

// useEffect for 3D tilt with this:
useEffect(() => {
  const card = cardRef.current;
  if (!card || isMobile) return;

  let isHovering = false;
  let animationFrameId;

  const handleMove = (e) => {
    if (!isHovering) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation values (limited to 10 degrees max)
    const rotateY = ((x - centerX) / centerX) * 10; 
    const rotateX = ((centerY - y) / centerY) * -5; // Less intense on X axis
    
    // Smooth animation with requestAnimationFrame
    const applyTransform = () => {
      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.02)
      `;
      card.style.transition = 'transform 0.1s linear';
    };
    
    animationFrameId = requestAnimationFrame(applyTransform);
  };

  const handleEnter = () => {
    isHovering = true;
    card.style.willChange = 'transform'; // Optimize performance
  };

  const handleLeave = () => {
    isHovering = false;
    cancelAnimationFrame(animationFrameId);
    
    // Smooth return to neutral
    card.style.transition = 'transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    
    // Reset will-change after animation
    setTimeout(() => {
      card.style.willChange = 'auto';
    }, 500);
  };

  card.addEventListener('mouseenter', handleEnter);
  card.addEventListener('mousemove', handleMove);
  card.addEventListener('mouseleave', handleLeave);

  return () => {
    cancelAnimationFrame(animationFrameId);
    card.removeEventListener('mouseenter', handleEnter);
    card.removeEventListener('mousemove', handleMove);
    card.removeEventListener('mouseleave', handleLeave);
  };
}, [isMobile]);

  // Animation 4: Magnetic Buttons
  useEffect(() => {
    const handleMouseMove = (e) => {
      buttonRefs.current.forEach(button => {
        if (!button || isMobile) return;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        button.style.setProperty('--x', `${x - rect.width/2}px`);
        button.style.setProperty('--y', `${y - rect.height/2}px`);
      });
    };

    const card = cardRef.current;
    if (card) card.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (card) card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  const shouldShowDescription = isMobile || hovered;

  return (
    <div 
      ref={cardRef}
      className={`card ${project.bgColor} ${isNightMode ? 'night' : 'day'}`}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      onClick={() => isMobile && setHovered(!hovered)}
    >
 
      <div className={`background ${shouldShowDescription ? 'hovered' : ''}`}>
        <img 
          className="project-image" 
          src={project.image} 
          alt={project.title}
        />
      </div>
      
      <div className="content">
        <h3 className="project-title gradient-text">
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
              style={{ 
                transform: `translateX(${index * -5}px)`,
                animationDelay: `${index * 0.1}s` // Stagger effect
              }}
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
            ref={el => buttonRefs.current[0] = el}
            href={project.figmaLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="action-button figma-button magnetic-btn"
          >
            <FaFigma />
            <span className="action-tooltip">View Design</span>
          </a>
        )}
        <a 
          ref={el => buttonRefs.current[1] = el}
          href={project.liveLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="action-button live-btn magnetic-btn"
        >
          <FaExternalLinkAlt />
          <span className="action-tooltip">View Live</span>
        </a>
      </div>
    </div>
  );
};

export default SelectedWorks;