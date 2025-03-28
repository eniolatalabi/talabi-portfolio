import React, { useState } from 'react';
import { Element } from 'react-scroll';
import './App.css';
import NavBar from './Components/NavBar';
import Hero from './Components/HeroSection';
import About from './Components/About';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import Footer from './Components/Footer'

const App = () => {
  const [isNightMode, setIsNightMode] = useState(true);

  const handleThemeToggle = (nightMode) => {
    setIsNightMode(nightMode);
  };

  return (
    <div className={`app ${isNightMode ? 'night' : 'day'}`}>
      <NavBar onThemeToggle={handleThemeToggle} />
      <main>
        <Element name="home">
          <Hero isNightMode={isNightMode} />
        </Element>
        <Element name="about">
          <About isNightMode={isNightMode} />
        </Element>
        <Element name="projects">
          <Projects isNightMode={isNightMode} />
        </Element>
        <Element name="contact">
          <Contact isNightMode={isNightMode} />
        </Element>
        {/* <Element name="footer">
          <Footer isNightMode={isNightMode} />
        </Element> */}
      </main>
    </div>
  );
};

export default App;