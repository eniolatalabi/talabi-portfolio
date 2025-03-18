import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Hero from './Components/HeroSection';
import About from './Components/About';
// import WhatICanDo from './Components/WhatICanDo'
// import Projects from './Components/Projects';
// import Contact from './Components/Contact';

const App = () => {
  const [isNightMode, setIsNightMode] = useState(true);

  const handleThemeToggle = (nightMode) => {
    setIsNightMode(nightMode);
  };

  return (
    <div className={`app ${isNightMode ? 'night' : 'day'}`}>
      <Router>
        <NavBar onThemeToggle={handleThemeToggle} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero isNightMode={isNightMode} />
                <About isNightMode={isNightMode} />
                {/* <WhatICanDo isNightMode={isNightMode} /> */}
                {/* <Projects isNightMode={isNightMode} />
                <Contact isNightMode={isNightMode} /> */}
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
