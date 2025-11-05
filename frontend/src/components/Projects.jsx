import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useTheme } from "./ui/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "NAPSTER - Movie Recommendation",
    description:
      "AI-powered movie recommender based on user preferences and real-time trends.",
    tech: ["React", "Tailwind", "Node.js", "API"],
    github: "https://github.com/ankit-gupta-git/Napster",
    live: "https://napster-ebon.vercel.app/",
    image: "/ProjectImg/napster.png",
  },
  {
    title: "Wanderlust - Airbnb Clone",
    description:
      "A full-stack rental platform with booking and listing features.",
    tech: ["MERN", "Tailwind", "JWT"],
    github: "https://github.com/ankitwanderlust",
    live: "https://wanderlustbnb.netlify.app",
    image: "/ProjectImg/travel.jpg",
  },
  {
    title: "Tudoo - Real-Time Collaborative To-Do Board",
    description:
      "A full-stack MERN application featuring a real-time collaborative To-Do board with drag-and-drop functionality, conflict resolution, and smart task assignment.",
    tech: ["React", "Firebase", "Framer Motion"],
    github: "https://github.com/ankit-gupta-git/To-Do_Board",
    live: "https://to-do-board-chi.vercel.app/",
    image: "/ProjectImg/to-do.png",
  },
  {
    title: "ANZARA - E-Commerce Store",
    description:
      "A fully functional e-commerce platform with payment integration.",
    tech: ["React", "Redux", "Stripe"],
    github: "https://github.com/ankit-gupta-git/E-commerce-main",
    live: "https://ankit-gupta-git.github.io/E-commerce-main/",
    image: "/ProjectImg/ecommerce.png",
  },
  {
    title: "NeuraChat - Realtime AI Chat",
    description:
      "A real-time group chat built with Socket.IO and Node.js, featuring AI-powered assistant and smart summaries.",
    tech: ["React", "Three.js", "OpenAI", "Socket.IO", "Node.js"],
    github: "https://github.com/ankit-gupta-git/realtime-ai-chat",
    live: "https://realtime-ai-chat-lilac.vercel.app/",
    image: "/ProjectImg/Reatime_Chat.png",
  },
];

const Projects = () => {
  const { isDark } = useTheme();
  const [modalProject, setModalProject] = useState(null);
  const [clickedCardRef, setClickedCardRef] = useState(null);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const projectsGridRef = useRef(null);
  const projectCardsRef = useRef([]);
  const modalRef = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !projectsGridRef.current
    )
      return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3 },
        "-=0.2"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3 },
        "-=0.15"
      )
      .fromTo(
        projectsGridRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.2"
      );

    if (projectCardsRef.current?.length > 0) {
      gsap.fromTo(
        projectCardsRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsGridRef.current,
            start: "top 95%",
            end: "bottom 5%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => tl.kill();
  }, []);

  // Modal animation effect
  useEffect(() => {
    if (modalProject && clickedCardRef && modalRef.current && modalContentRef.current) {
      // Get clicked card position
      const cardRect = clickedCardRef.getBoundingClientRect();
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      
      // Calculate initial position (card position)
      const initialX = cardRect.left + cardRect.width / 2;
      const initialY = cardRect.top + cardRect.height / 2;
      
      // Calculate final position (center of viewport)
      const finalX = viewportCenterX;
      const finalY = viewportCenterY;
      
      // Set initial transform origin
      modalContentRef.current.style.transformOrigin = `${initialX}px ${initialY}px`;
      
      // Animate from card position to center
      gsap.fromTo(modalContentRef.current, 
        {
          scale: 0.1,
          x: initialX - finalX,
          y: initialY - finalY,
          opacity: 0,
          rotation: 0
        },
        {
          scale: 1,
          x: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        }
      );
      
      // Animate backdrop
      gsap.fromTo(modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [modalProject, clickedCardRef]);

  // Handle card click with animation
  const handleCardClick = (project, cardElement) => {
    setClickedCardRef(cardElement);
    setModalProject(project);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  };

  // Handle modal close with animation
  const handleModalClose = () => {
    if (modalContentRef.current) {
      gsap.to(modalContentRef.current, {
        scale: 0.1,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setModalProject(null);
          setClickedCardRef(null);
          document.body.style.overflow = 'unset';
        }
      });
      
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3
      });
    } else {
      setModalProject(null);
      setClickedCardRef(null);
      document.body.style.overflow = 'unset';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`py-20 px-6 md:px-16 relative ${
        !isDark
          ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]"
          : ""
      }`}
    >
      <h2
        ref={titleRef}
        className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center font-dxgrafik ${
          isDark
            ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
            : "text-[#111827]"
        } mb-4 pb-2`}
      >
        Projects
      </h2>

      <div ref={subtitleRef} className="flex flex-col items-start mb-8 sm:mb-12">
        <h3 className="font-dxgrafik text-2xl sm:text-3xl md:text-4xl font-extrabold flex items-center gap-2 text-left">
          <span
            className={`${
              isDark
                ? "bg-gradient-to-r from-cyan-200 via-pink-200 to-yellow-200"
                : "bg-gradient-to-r from-[#159ccb] to-[#0f7a9e]"
            } bg-clip-text text-transparent`}
          >
            Yeah, I work hard
          </span>
          💼
        </h3>
        <p
          className={`mt-3 sm:mt-4 text-sm sm:text-md text-left ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Each project is unique. Here are some of my works.
        </p>
      </div>

      {/* Project Grid */}
      <div
        ref={projectsGridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (projectCardsRef.current[index] = el)}
            className={`h-[460px] flex flex-col justify-between ${
              isDark
                ? "bg-[#101014]"
                : "bg-white/90 backdrop-blur-[20px] shadow-lg border border-white/50"
            } rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105`}
            onClick={() => setModalProject(project)}
          >
            {/* Image */}
            <div className="w-full h-52 overflow-hidden relative group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center transform transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Project+Image";
                }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 p-5">
              <div>
                <h3
                  className={`text-lg sm:text-xl font-semibold line-clamp-1 ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`mt-2 text-xs sm:text-sm font-jetbrains line-clamp-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap mt-4 gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-xs sm:text-sm rounded ${
                        isDark
                          ? "bg-neutral-800 text-white"
                          : "bg-[#cceeff] text-[#159ccb]"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 mt-5">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center text-sm hover:scale-105 transition-all ${
                    isDark
                      ? "bg-[#23232a] hover:bg-[#23232a]/80 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                >
                  <FaGithub />
                  GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center text-sm bg-[#159ccb] hover:bg-[#0f7a9e] text-white hover:scale-105 transition-all"
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalProject && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-40 flex justify-center items-center bg-black/60 backdrop-blur-md"
          onClick={handleModalClose}
        >
          <div
            ref={modalContentRef}
            className={`relative max-h-[90vh] overflow-y-auto w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col md:flex-row ${
              isDark ? "bg-[#18181b]" : "bg-white/95 backdrop-blur-[20px]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`md:w-1/2 w-full flex items-center justify-center p-6 ${
                isDark ? "bg-[#101014]" : "bg-gray-50"
              }`}
            >
              <img
                src={modalProject.image}
                alt={modalProject.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
            </div>

            <div className="md:w-1/2 w-full p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3
                  className={`text-2xl md:text-3xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  {modalProject.title}
                </h3>
                <p
                  className={`text-sm md:text-base leading-relaxed mb-6 font-jetbrains ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {modalProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {modalProject.tech.map((t, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm rounded-full ${
                        isDark
                          ? "bg-neutral-800 text-white"
                          : "bg-[#cceeff] text-[#159ccb]"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={modalProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center hover:scale-105 transition-all ${
                    isDark
                      ? "bg-[#23232a] hover:bg-[#23232a]/80 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-white"
                  }`}
                >
                  <FaGithub />
                  GitHub
                </a>
                <a
                  href={modalProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center bg-[#159ccb] hover:bg-[#0f7a9e] text-white hover:scale-105 transition-all"
                >
                  <FaExternalLinkAlt />
                  Live Demo
                </a>
              </div>
            </div>

            <button
              onClick={() => setModalProject(null)}
              className={`absolute top-4 right-4 p-2 rounded-full hover:scale-110 transition-all ${
                isDark ? "bg-[#23232a] text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
