import React, { useEffect, useRef } from "react";
import { useTheme } from "./ui/ThemeContext";
import ProjectCard from "./ProjectCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Forge – Full-Stack AI App Generator",
    description:
      "AI-powered React application generator that helps users build, preview, and refine web apps in real time with agentic multi-file code improvements.",
    tech: [
      "Next.js 15",
      "TypeScript",
      "Gemini 3.5 Flash",
      "Prisma",
      "Supabase",
      "Clerk",
    ],
    github: "https://github.com/ankit-gupta-git/forge-ai-app-builder",
    live: "https://forge-studio-neon.vercel.app/",
    image: "/ProjectImg/forge.png",
    status: "AI SaaS",
  },
  {
    title: "Hirrd – AI-Powered Job Portal",
    description:
      "A modern job portal that leverages AI to connect job seekers with relevant opportunities. Features include AI-powered resume analysis, personalized job recommendations, and smart matching algorithms.",
    tech: ["React.js", "Supabase (PostgreSQL)", "Clerk", "LLM APIs"],
    github: "https://github.com/ankit-gupta-git/ai-job-portal",
    live: "https://job-portal-dun-chi.vercel.app/",
    image: "/ProjectImg/Hirrd.png",
    status: "Fullstack",
  },
  {
    title: "Napster – Movie Recommendation System",
    description:
      "LLM-powered movie recommendation platform using agent workflows for personalized suggestions and real-time insights.",
    tech: [
      "Next.js",
      "REST APIs",
      "LangChain",
      "YouTube Data API",
      "LangGraph",
      "n8n",
    ],
    github: "https://github.com/ankit-gupta-git/napster-recommendation-system",
    live: "https://napster-recommendation-system.vercel.app/",
    image: "/ProjectImg/napster.png",
    status: "Fullstack",
  },
  {
    title: "InterviewIQ – AI-Powered Interview Preparation Platform",
    description:
      "A full-stack AI video interview simulator with role-specific questions, resume-based personalization, analytics dashboards, and automated reports.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Firebase", "Stripe", "Redux Toolkit", "Gemini API", "Recharts"],
    github: "https://github.com/ankit-gupta-git/AI-Interview-Agent",
    live: "https://interviewiq-ai.vercel.app/",
    image: "/ProjectImg/InterviewIQ.png",
    status: "Fullstack",
  },
  {
    title: "AllySupport - AI Customer Support SaaS",
    description:
      "A SaaS-based AI customer support chatbot that allows businesses to train an AI assistant on their own data and embed it into any website using a simple script tag. Includes authentication, dashboard management, and real-time AI responses.",
    tech: [
      "Next.js",
      "TypeScript",
      "MongoDB",
      "Google Gemini AI",
      "Scalekit",
      "Tailwind CSS",
    ],
    github: "https://github.com/ankit-gupta-git/ally-support",
    live: "https://ally-support.vercel.app/",
    image: "/ProjectImg/AllySupport.png",
    status: "Fullstack",
  },
  {
    title: "NeuraChat - Realtime AI Chat",
    description:
      "A real-time group chat built with Socket.IO and Node.js, featuring AI-powered assistant and smart summaries.",
    tech: ["React", "Three.js", "OpenAI", "Socket.IO", "Node.js"],
    github: "https://github.com/ankit-gupta-git/realtime-ai-chat",
    live: "https://realtime-ai-chat-lilac.vercel.app/",
    image: "/ProjectImg/Reatime_Chat.png",
    status: "Fullstack",
  },
  {
    title: "Hovio – Airbnb Clone",
    description:
      "Modern full-stack Airbnb-inspired platform for discovering stays, listing properties, booking accommodations, and managing reviews securely.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Cloudinary",
      "Passport.js",
    ],
    github: "https://github.com/ankit-gupta-git/Hovio",
    live: "https://hovio-hsp7.onrender.com",
    image: "/ProjectImg/hovio.png",
    status: "Fullstack",
  },
];

const Projects = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef(null);
  const cardsGridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsGridRef.current) {
        gsap.fromTo(
          cardsGridRef.current.children,
          { opacity: 0, y: 50, scale: 0.92, rotationX: -8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: "top 88%",
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
      className={`py-32 px-10 font-figtree ${!isDark
          ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]"
          : ""
        }`}
    >
      <div className="max-w-8xl mx-auto">
        {/* Heading */}
        <h2
          className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center font-dxgrafik mb-4 ${isDark
              ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
              : "text-[#111827]"
            }`}
        >
          Projects
        </h2>

        {/* Subtitle / Para */}
        <p
          className={`text-center max-w-2xl mx-auto mb-16 text-base sm:text-lg ${isDark ? "text-gray-400" : "text-gray-600"
            }`}
        >
          Yeah, I work hard 💼 <br />
          Each project is unique. Here are some of my works.
        </p>

        {/* Projects Grid */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div key={index} className="w-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

