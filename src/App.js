import React, { useState } from 'react';
import { Element } from 'react-scroll';
import './App.css';
import NavBar from './Components/NavBar';
import Hero from './Components/HeroSection';
import About from './Components/About';
import Projects from './Components/Projects';

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
        {/* Add Contact component when ready */}
      </main>
    </div>
  );
};

export default App;