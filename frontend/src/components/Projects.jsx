import React from "react";
import { useTheme } from "./ui/ThemeContext";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const projects = [
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
    title: "NAPSTER - Movie Recommendation",
    description:
      "AI-powered movie recommender based on user preferences and real-time trends.",
    tech: ["React", "Tailwind", "Node.js", "API"],
    github: "https://github.com/ankit-gupta-git/Napster",
    live: "https://napster-ebon.vercel.app/",
    image: "/ProjectImg/napster.png",
    status: "Frontend",
  },
  {
    title: "Roamara - Airbnb Clone",
    description:
      "A full-stack rental platform with booking and listing features.",
    tech: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Tailwind",
      "JWT",
    ],
    github: "https://github.com/ankit-gupta-git/Roamara",
    live: "https://roamara-six.vercel.app/",
    image: "/ProjectImg/Romara.png",
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
];

const Projects = () => {
  const { isDark } = useTheme();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="projects"
      className={`py-32 px-10 font-figtree ${
        !isDark
          ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]"
          : ""
      }`}
    >
      <div className="max-w-8xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center font-dxgrafik mb-4 ${
            isDark
              ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
              : "text-[#111827]"
          }`}
        >
          Projects
        </motion.h2>

        {/* Subtitle / Para */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`text-center max-w-2xl mx-auto mb-16 text-base sm:text-lg ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Yeah, I work hard 💼 <br />
          Each project is unique. Here are some of my works.
        </motion.p>

        {/* Projects Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={item} className="w-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
