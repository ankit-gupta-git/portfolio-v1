import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/ui/ThemeContext";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ProblemSolving from "./components/ProblemSolving";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import AIAssistantWidget from "./components/ui/AIAssistantWidget";
import TechStackCarousel from "./components/ui/TechStackCarousel";
import GithubContributions from "./components/ui/GithubContributions";
import { Terminal } from "./components/Terminal";
import "./App.css";

const App = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      <ThemeProvider>
        <Layout>
          <Navbar onTerminalClick={() => setIsTerminalOpen(true)} />
          <Hero />
          <About />
          <Experience />
          <Skills />
          <ProblemSolving />
          <TechStackCarousel />
          <Projects />
          <Blog />
          <GithubContributions />
          <Contact />
          <Footer />
        </Layout>
      </ThemeProvider>
      {!isLoading && <AIAssistantWidget />}
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </>
  );
};

export default App;
