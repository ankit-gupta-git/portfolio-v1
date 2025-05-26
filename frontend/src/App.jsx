import React from "react";
import Lenis from 'lenis'
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
import AIAssistantWidget from "./components/ui/AIAssistantWidget";
import "./App.css";

const App = () => {
  return (
    <>
    <ThemeProvider>
       <Layout>
      <Navbar />
       <Hero />
        <About />
       <Experience />
        <Skills />
        <Projects />
      <Contact />
      <Footer />
      </Layout>
      </ThemeProvider>
      <AIAssistantWidget />
    </>
  );
};

export default App;
