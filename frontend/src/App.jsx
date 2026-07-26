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
import FluidCursor from "./components/FluidCursor";
import { useLenisSmoothScroll } from "./hooks/useLenisSmoothScroll";
import "./App.css";

const App = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scrolling synced with GSAP ScrollTrigger
  useLenisSmoothScroll(isLoading);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Warm-up backend on initial load to reduce cold start latency
    const warmUpBackend = async () => {
      // 1. Check session storage to ensure we only run this once per session
      if (sessionStorage.getItem("warmup_done")) return;
      
      // Mark as done immediately
      sessionStorage.setItem("warmup_done", "true");

      const defaultBackendUrl = import.meta.env.MODE === 'production' || !import.meta.env.DEV
        ? 'https://portfolio-v1-1-uc52.onrender.com'
        : 'http://localhost:5000';
      const backendUrl = (import.meta.env.VITE_BACKEND_URL || defaultBackendUrl).replace(/\/$/, '');

      try {
        // Fire and forget request without short abort so Render can wake up fully
        fetch(`${backendUrl}/api/warmup`).catch(() => {});
        console.log("Backend warmup request sent to:", backendUrl);
      } catch (error) {
        // Silently fail - this shouldn't affect UX
      }
    };

    warmUpBackend();
  }, []);

  return (
    <ThemeProvider>
      {!isLoading && <FluidCursor />}
      {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
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
      {!isLoading && <AIAssistantWidget />}
      <Terminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
      />
    </ThemeProvider>
  );
};

export default App;
