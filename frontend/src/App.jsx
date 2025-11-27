import React, { useState } from "react";
import Layout from "./components/Layout";
import { ThemeProvider } from "./components/ui/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import AIAssistantWidget from "./components/ui/AIAssistantWidget";
import TechStackCarousel from "./components/ui/TechStackCarousel";
import GithubContributions from "./components/ui/GithubContributions";
import { Terminal } from "./components/Terminal";
import "./App.css";

const App = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <>
      <ThemeProvider>
        <Layout>
          <Navbar onTerminalClick={() => setIsTerminalOpen(true)} />
          <Hero />
          <About />
          <Experience />
          <Skills />
          <TechStackCarousel />
          <Projects />
          <Blog />
          <GithubContributions />
          <Contact />
          <Footer />
        </Layout>
      </ThemeProvider>
      <AIAssistantWidget />
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </>
  );
};

export default App;
