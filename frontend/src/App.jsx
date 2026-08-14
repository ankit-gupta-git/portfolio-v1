import React, { useState, useEffect, lazy, Suspense } from "react";
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
import FluidCursor from "./components/FluidCursor";
import "./App.css";

// Lazy-loaded heavy below-the-fold and widget components for code-splitting
const Blog = lazy(() => import("./components/Blog"));
const AIAssistantWidget = lazy(() => import("./components/ui/AIAssistantWidget"));
const TechStackCarousel = lazy(() => import("./components/ui/TechStackCarousel"));
const GithubContributions = lazy(() => import("./components/ui/GithubContributions"));
const Terminal = lazy(() => import("./components/Terminal"));

const App = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        <Suspense fallback={null}>
          <TechStackCarousel />
        </Suspense>
        <Projects />
        <Suspense fallback={null}>
          <Blog />
          <GithubContributions />
        </Suspense>
        <Contact />
        <Footer />
      </Layout>
      <Suspense fallback={null}>
        {!isLoading && <AIAssistantWidget />}
        {isTerminalOpen && (
          <Terminal 
            isOpen={isTerminalOpen} 
            onClose={() => setIsTerminalOpen(false)} 
          />
        )}
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
