import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ui/ThemeContext";

import "swiper/css";

const projects = [
  {
    title: "NAPSTER - Movie Recommendation",
    description: "AI-powered movie recommender based on user preferences and real-time trends.",
    tech: ["React", "Tailwind", "Node.js", "API"],
    github: "https://github.com/ankit-gupta-git/Napster",
    live: "https://napster-ebon.vercel.app/",
    image: "/ProjectImg/napster.png",
  },
  {
    title: "Wanderlust - Airbnb Clone",
    description: "A full-stack rental platform with booking and listing features.",
    tech: ["MERN", "Tailwind", "JWT"],
    github: "https://github.com/ankitwanderlust",
    live: "https://wanderlustbnb.netlify.app",
    image: "/ProjectImg/travel.jpg",
  },
  {
    title: "Tudoo - Real-Time Collaborative To-Do Board",
    description: "A full-stack MERN application featuring a real-time collaborative To-Do board with drag-and-drop functionality, conflict resolution, and smart task assignment.",
    tech: ["React", "Firebase", "Framer Motion"],
    github: "https://github.com/ankit-gupta-git/To-Do_Board",
    live: "https://to-do-board-chi.vercel.app/",
    image: "/ProjectImg/to-do.png",
  },
  {
    title: "E-Commerce Store",
    description: "A fully functional e-commerce platform with payment integration.",
    tech: ["React", "Redux", "Stripe"],
    github: "https://github.com/ankitecommerce",
    live: "https://ecommerce-ankit.netlify.app",
    image: "/ProjectImg/ecommerce.jpg",
  },
  {
    title: "Aranya - Wildlife Exploration",
    description: "AI + blockchain-based wildlife conservation & plantation tracking platform.",
    tech: ["React", "Three.js", "Aptos", "IPFS"],
    github: "#",
    live: "#",
    image: "/ProjectImg/wildlife.jpg",
  },
];

const Projects = () => {
  const { isDark } = useTheme();
  const [modalProject, setModalProject] = useState(null);

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <section
      id="projects"
      className={`py-20 px-6 md:px-16 relative ${
        !isDark ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]" : ""
      }`}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center font-dxgrafik ${
          isDark
            ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
            : "text-[#111827]"
        } mb-4 pb-2`}
      >
        Projects
      </motion.h2>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-start mb-8 sm:mb-12"
      >
        <h3 className="font-dxgrafik text-2xl sm:text-3xl md:text-4xl font-extrabold flex items-center gap-2 text-left">
          <span className={`${isDark 
            ? 'bg-gradient-to-r from-cyan-200 via-pink-200 to-yellow-200' 
            : 'bg-gradient-to-r from-[#159ccb] to-[#0f7a9e]'} bg-clip-text text-transparent`}>Yeah, I work hard</span>
          <span role="img" aria-label="briefcase">💼</span>
        </h3>
        <p className={`mt-3 sm:mt-4 text-sm sm:text-md text-left ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Each project is unique. Here are some of my works.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`h-auto flex flex-col justify-between ${
              isDark
                ? "bg-[#101014]"
                : "bg-white/90 backdrop-blur-[20px] shadow-lg border border-white/50"
            } rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300`}
            onClick={() => setModalProject(project)}
          >
            <div className="w-full h-48 sm:h-56 overflow-hidden relative group">
              <img
                src={project.image}
                alt={project.title}
                loading="eager"
                fetchPriority="high"
                className="w-full h-full object-cover object-center transform transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=Project+Image";
                }}
              />
            </div>

            <div className="flex-1 p-4 sm:p-6">
              <h3 className={`text-lg sm:text-xl font-semibold line-clamp-1 ${
                isDark ? "text-white" : "text-[#111827]"
              }`}>{project.title}</h3>
              <p className={`mt-2 sm:mt-3 text-xs sm:text-sm line-clamp-3 font-jetbrains ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}>
                {project.description.length > 100
                  ? `${project.description.slice(0, 100)}...`
                  : project.description}
              </p>

              <div className="flex flex-wrap mt-4 sm:mt-5 gap-2 sm:gap-3">
                {project.tech.map((techItem, i) => (
                  <span
                    key={i}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded whitespace-nowrap ${
                      isDark 
                        ? "bg-neutral-800 text-white" 
                        : "bg-[#cceeff] text-[#159ccb]"
                    }`}
                  >
                    {techItem}
                  </span>
                ))}
              </div>

              <div className={`flex space-x-3 sm:space-x-4 mt-4 sm:mt-5`}>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-xs sm:text-sm flex-1 justify-center ${
                    isDark 
                      ? "bg-[#23232a] hover:bg-[#23232a]/80 text-white" 
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                  } border-none`}
                >
                  <FaGithub className="text-lg sm:text-xl" />
                  <span className="font-medium">GitHub</span>
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all text-xs sm:text-sm flex-1 justify-center bg-[#159ccb] hover:bg-[#0f7a9e] text-white`}
                >
                  <FaExternalLinkAlt className="text-lg sm:text-xl" />
                  <span className="font-medium">Live Demo</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              className={`w-full max-w-4xl rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl relative ${
                isDark ? "bg-[#18181b]" : "bg-white/95 backdrop-blur-[20px]"
              }`}
              onClick={e => e.stopPropagation()}
            >
              {/* Left: Project Image */}
              <div className={`md:w-1/2 w-full flex items-center justify-center p-6 ${
                isDark ? "bg-[#101014]" : "bg-gray-50"
              }`}>
                <img
                  src={modalProject.image}
                  alt={modalProject.title}
                  className={`rounded-xl w-full h-auto max-h-96 object-contain ${
                    isDark ? "bg-[#18181b]" : "bg-white"
                  }`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Project+Image';
                  }}
                />
              </div>
              {/* Right: Project Details */}
              <div className="md:w-1/2 w-full flex flex-col justify-between p-6 relative">
                {/* Close Button */}
                <button
                  className={`absolute top-4 right-4 text-2xl rounded-full w-10 h-10 flex items-center justify-center transition ${
                    isDark 
                      ? "text-white bg-black/30 hover:bg-black/60" 
                      : "text-gray-600 bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setModalProject(null)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <div>
                  <h3 className={`text-3xl font-bold font-dxgrafik mb-4 ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}>{modalProject.title}</h3>
                  <p className={`mb-6 font-figtree text-base sm:text-lg leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>{modalProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {modalProject.tech.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-figtree ${
                          isDark 
                            ? "bg-[#23232a] text-white" 
                            : "bg-[#cceeff] text-[#159ccb]"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 mt-auto">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={modalProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white border-none font-figtree text-base ${
                      isDark 
                        ? "bg-[#23232a]" 
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    <FaGithub className="text-xl" />
                    <span>GitHub</span>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={modalProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#159ccb] hover:bg-[#0f7a9e] text-white font-figtree text-base"
                  >
                    <FaExternalLinkAlt className="text-xl" />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
