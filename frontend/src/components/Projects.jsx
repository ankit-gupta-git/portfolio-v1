import React, { useEffect, useRef } from "react";
import { useTheme } from "./ui/ThemeContext";
import FeaturedProjectCard from "./ui/FeaturedProjectCard";
import BentoProjectCard from "./ui/BentoProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuSparkles, LuCpu, LuLayers, LuDatabase } from "react-icons/lu";

gsap.registerPlugin(ScrollTrigger);

// Flagship Featured Project
const featuredProject = {
  title: "Forge – Full-Stack AI App Generator",
  description:
    "An AI-powered React application generator that helps developers and creators build, preview, and refine full-stack web applications in real time with agentic multi-file code improvements and sandboxed previews.",
  tech: [
    "Next.js 15",
    "TypeScript",
    "Gemini 3.5 Flash",
    "Prisma",
    "Supabase",
    "Clerk",
    "Tailwind CSS",
  ],
  github: "https://github.com/ankit-gupta-git/forge-ai-app-builder",
  live: "https://forge-studio-neon.vercel.app/",
  image: "https://ik.imagekit.io/zlbgvcgef/portfolio-v1/forge.webp",
  status: "AI SaaS",
  architecture: [
    {
      title: "Agentic Generation",
      description: "Multi-file React & Next.js full-stack code synthesis",
      icon: LuSparkles,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Gemini 3.5 Engine",
      description: "Automated reasoning, syntax validation & live bug fixes",
      icon: LuCpu,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "Live Sandbox Preview",
      description: "Instant in-browser virtual execution & hot reload",
      icon: LuLayers,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Prisma & Supabase",
      description: "PostgreSQL persistence, migration & Clerk auth",
      icon: LuDatabase,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ],
};

// Other Noteworthy Projects for the Bento Grid
const bentoProjects = [
  {
    title: "InterviewIQ – AI Video Interview Simulator",
    description:
      "A full-stack AI video interview simulator featuring role-specific questions, resume-based dynamic personalization, performance analytics dashboards, and automated AI scoring reports.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Gemini API", "Stripe", "Firebase"],
    github: "https://github.com/ankit-gupta-git/AI-Interview-Agent",
    live: "https://interviewiq-ai.vercel.app/",
    image: "https://ik.imagekit.io/zlbgvcgef/portfolio-v1/InterviewIQ.webp",
    status: "AI SaaS",
    span: "col-span-1 md:col-span-2",
  },
  {
    title: "Hirrd – AI-Powered Job Portal",
    description:
      "A modern job discovery platform that leverages AI for automated resume analysis, personalized job recommendations, and smart applicant matching algorithms.",
    tech: ["React.js", "Supabase (PostgreSQL)", "Clerk Auth", "LLM APIs"],
    github: "https://github.com/ankit-gupta-git/ai-job-portal",
    live: "https://job-portal-dun-chi.vercel.app/",
    image: "https://ik.imagekit.io/zlbgvcgef/portfolio-v1/Hirrd.webp",
    status: "Fullstack",
    span: "col-span-1",
  },
  {
    title: "AllySupport – Embeddable AI Support Agent",
    description:
      "A SaaS chatbot that allows businesses to train custom AI agents on their documentation and embed the assistant into any website with a single script tag.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Google Gemini AI", "Tailwind CSS"],
    github: "https://github.com/ankit-gupta-git/ally-support",
    live: "https://ally-support.vercel.app/",
    image: "https://ik.imagekit.io/zlbgvcgef/portfolio-v1/AllySupport.webp",
    status: "AI SaaS",
    span: "col-span-1",
  },
  {
    title: "Napster – Intelligent Movie Recommendation Agent",
    description:
      "LLM-powered recommendation engine using agentic LangChain & LangGraph workflows for deep contextual film matching and real-time insights.",
    tech: ["Next.js", "LangChain", "LangGraph", "YouTube Data API", "REST APIs"],
    github: "https://github.com/ankit-gupta-git/napster-recommendation-system",
    live: "https://napster-recommendation-system.vercel.app/",
    image: "https://ik.imagekit.io/zlbgvcgef/portfolio-v1/napster.webp",
    status: "Fullstack",
    span: "col-span-1",
  },
  {
    title: "Hovio – Full-Stack Airbnb Platform",
    description:
      "Full-stack property booking platform for discovering vacation stays, listing properties, managing secure reservations, and handling verified user reviews.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
    github: "https://github.com/ankit-gupta-git/Hovio",
    live: "https://hovio-hsp7.onrender.com",
    image: "https://ik.imagekit.io/zlbgvcgef/portfolio-v1/hovio.webp",
    status: "Fullstack",
    span: "col-span-1",
  },
];

const Projects = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const featuredRef = useRef(null);
  const bentoGridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured Card Entrance
      if (featuredRef.current) {
        gsap.fromTo(
          featuredRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuredRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Bento Grid Entrance
      if (bentoGridRef.current) {
        gsap.fromTo(
          bentoGridRef.current.children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bentoGridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`py-32 px-6 sm:px-10 lg:px-16 font-figtree transition-colors duration-300 ${
        !isDark
          ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-bold font-dxgrafik mb-4 ${
              isDark
                ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
                : "text-[#111827]"
            }`}
          >
            Projects
          </h2>
          <p
            className={`max-w-2xl mx-auto text-base sm:text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A curated showcase of scalable full-stack applications, AI platforms, and production systems I've built.
          </p>
        </div>

        {/* 1. TOP FLAGSHIP FEATURED PROJECT SHOWCASE (Sayantan-Style) */}
        <div ref={featuredRef}>
          <FeaturedProjectCard project={featuredProject} isDark={isDark} />
        </div>

        {/* 2. ASYMMETRIC BENTO GRID ("Other Noteworthy Projects") */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <h3
              className={`text-2xl sm:text-3xl font-bold font-dxgrafik tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Other Noteworthy Projects
            </h3>
            <div
              className={`flex-1 h-[1px] ${
                isDark ? "bg-white/10" : "bg-slate-200"
              }`}
            />
          </div>

          <div
            ref={bentoGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {bentoProjects.map((project, index) => (
              <div key={index} className={project.span}>
                <BentoProjectCard
                  project={project}
                  isDark={isDark}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
