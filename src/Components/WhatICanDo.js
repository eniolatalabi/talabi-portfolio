import React, { useState, useEffect, useRef } from "react";
import "./WhatICanDo.css";

const WhatICanDo = ({ isNightMode = true }) => {
  const [visibleItem, setVisibleItem] = useState(null);
  const sectionRef = useRef(null);
  const [currentNum, setCurrentNum] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [typedText, setTypedText] = useState({ title: "", text1: "", text2: "", text3: "" });

  // Array of services to randomly select from
  const allServices = [
    {
      title: "Full-Stack Development",
      description: "Building robust web applications using the MERN stack (MongoDB, Express, React, Node.js) with clean code architecture and best practices for scalability.",
    },
    {
      title: "Responsive Web Design",
      description: "Creating beautiful, responsive interfaces that work flawlessly across all devices, with performance and accessibility at the core.",
    },
    {
      title: "API Development",
      description: "Designing and implementing secure, efficient RESTful APIs that connect your frontend to databases and third-party services.",
    },
    {
      title: "Frontend Excellence",
      description: "Crafting pixel-perfect UIs with React, implementing state management, and optimizing for performance and user experience.",
    },
    {
      title: "Database Architecture",
      description: "Designing efficient MongoDB schemas and implementing data models that scale with your application needs.",
    },
    {
      title: "Performance Optimization",
      description: "Analyzing and improving application performance, from bundle size reduction to server-side optimizations.",
    },
  ];

  // Quality Promise content
  const qualityPromise = {
    title: "My Quality Promise",
    text1: "Technical Excellence: Clean markup, performant code, built with best practices and accessibility. I ensure your application not only works well but is maintainable and scalable over time. Every line of code is written with careful attention to detail and industry standards.",
    text2: "Beautiful Design: Thoughtful use of white space and respect for design principles. I transform designs into pixel-perfect implementations that maintain visual integrity across all devices. Your users will enjoy an aesthetically pleasing experience that enhances their interaction with your product.",
    text3: "User-Centered: Tools don't matter – results do. Always built with the end user in mind. I focus on creating intuitive interfaces that solve real problems for your users. This means considering accessibility, performance, and usability at every step of the development process.",
  };

  // Randomly select 4 services on component mount
  useEffect(() => {
    const shuffled = [...allServices].sort(() => 0.5 - Math.random());
    setSelectedServices(shuffled.slice(0, 4));
  }, []);

  // Typing effect for numbers
  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsTyping(true);

          const interval = setInterval(() => {
            setCurrentNum((prev) => {
              if (prev < 4) return prev + 1;
              clearInterval(interval);
              return prev;
            });
          }, 400);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Typing effect for quality promise
  useEffect(() => {
    if (!isTyping) return;

    let titleTimeout, text1Timeout, text2Timeout, text3Timeout;

    // Start typing title after numbers are done
    titleTimeout = setTimeout(() => {
      typeText(qualityPromise.title, "title", 40, () => {
        // Start typing first promise text
        text1Timeout = setTimeout(() => {
          typeText(qualityPromise.text1, "text1", 10, () => {
            // Start typing second promise text
            text2Timeout = setTimeout(() => {
              typeText(qualityPromise.text2, "text2", 10, () => {
                // Start typing third promise text
                text3Timeout = setTimeout(() => {
                  typeText(qualityPromise.text3, "text3", 10);
                }, 300);
              });
            }, 300);
          });
        }, 300);
      });
    }, 2000);

    return () => {
      clearTimeout(titleTimeout);
      clearTimeout(text1Timeout);
      clearTimeout(text2Timeout);
      clearTimeout(text3Timeout);
    };
  }, [isTyping]);

  // Function to handle typing animation
  const typeText = (text, key, speed, callback) => {
    let i = 0;
    const intervalId = setInterval(() => {
      setTypedText((prev) => ({
        ...prev,
        [key]: text.substring(0, i),
      }));
      i++;

      if (i > text.length) {
        clearInterval(intervalId);
        if (callback) callback();
      }
    }, speed);
  };

  // Handle visibility of descriptions
  const handleHover = (index) => {
    setVisibleItem(index);
  };

  const handleLeave = () => {
    setVisibleItem(null);
  };

  return (
    <section ref={sectionRef} className={`what-i-can-do ${isNightMode ? "night" : "day"}`}>
      <h2 className="section-title">What I Can Do For You</h2>

      <div className="what-i-can-do-container">
        {/* Services Grid */}
        <div className="services-container">
          <div className="services-grid">
            {selectedServices.map((service, index) => (
              <div
                key={index}
                className="service-item"
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleLeave}
                style={{
                  opacity: 1,
                  transform: "translateY(0)",
                  transition: `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`,
                }}
              >
                <div className="service-number">{index + 1}</div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p className={visibleItem === index || window.innerWidth <= 1024 ? "description visible" : "description"}>
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Service Image */}
          <div className="service-image">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
              alt="Web development visualization"
            />
          </div>
        </div>

        {/* Quality Promise */}
        <div className="quality-promise">
          <h3>{typedText.title || (isTyping ? "_" : "")}</h3>
          <div className="promise-content">
            <div className="promise-item">{typedText.text1 || (isTyping ? "_" : "")}</div>
            <div className="promise-item">{typedText.text2 || (isTyping ? "_" : "")}</div>
            <div className="promise-item">{typedText.text3 || (isTyping ? "_" : "")}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatICanDo;