import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaReact,
  FaJs,
  FaGitAlt,
  FaDocker,
  FaLinux,
  FaProjectDiagram,
  FaNodeJs,
  FaDatabase,
  FaPython,
  FaGithub,
  FaAws,
  FaHtml5,
  FaCss3,
  FaCode,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMysql,
  SiMongodb,
  SiExpress,
  SiJupyter,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiPostman,
  SiFirebase,
  SiGithubactions,
  SiSupabase,
  SiPython,
  SiOpenai,
} from "react-icons/si";
import { useTheme } from "./ui/ThemeContext";

// Register ScrollTrigger plugi
gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Frontend Development",
    icon: <FaReact className="text-sky-400 text-3xl" />,
    items: [
      { name: "React", icon: <FaReact className="text-sky-400 animate-spin-slow" />, animation: 'animate-spin-slow' },
      { name: "Next.js", icon: <SiNextdotjs className="text-white group-hover:text-blue-400 transition-colors duration-300" />, animation: 'group-hover:scale-110' },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-500 group-hover:scale-110 transition-transform duration-300" />, animation: 'group-hover:scale-110' },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500 hover:animate-pulse transition-all duration-300" />, animation: 'hover:animate-pulse' },
      { name: "CSS3", icon: <FaCss3 className="text-blue-500 hover:animate-pulse transition-all duration-300" />, animation: 'hover:animate-pulse' },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 group-hover:scale-110" />,
        animation: 'group-hover:scale-110'
      },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400 hover:animate-bounce transition-all duration-300" />, animation: 'hover:animate-bounce' },
    ],
  },
  {
    category: "Backend Development",
    icon: <FaNodeJs className="text-green-500 text-3xl" />,
    items: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-500 hover:animate-bounce transition-all duration-300" />, animation: 'hover:animate-bounce' },
      { name: "Express.js", icon: <SiExpress className="text-gray-400" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
      { name: "PostgreSQL", icon: <FaDatabase className="text-blue-600" /> },
      { name: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
      { name: "Supabase", icon: <SiSupabase className="text-green-400 hover:animate-pulse transition-all duration-300" />, animation: 'hover:animate-pulse' },
    ],
  },
  {
    category: "AI & ML Technologies",
    icon: <FaProjectDiagram className="text-rose-400 text-3xl" />,
    items: [
      { name: "Python", icon: <FaPython className="text-blue-500 hover:animate-pulse transition-all duration-300" />, animation: 'hover:animate-pulse' },
      { name: "LangChain", icon: <SiOpenai className="text-yellow-400 hover:animate-pulse transition-all duration-300" />, animation: 'hover:animate-pulse' },
      { name: "LangGraph", icon: <FaProjectDiagram className="text-blue-400 hover:animate-pulse transition-all duration-300" />, animation: 'hover:animate-pulse' },
      { name: "NumPy", icon: <SiNumpy className="text-yellow-500" /> },
      { name: "Pandas", icon: <SiPandas className="text-blue-600" /> },
      { name: "Scikit-learn", icon: <SiScikitlearn className="text-orange-500" /> },
      { name: "Jupyter", icon: <SiJupyter className="text-orange-600" /> },
    ],
  },
  {
    category: "Tools & Technologies",
    icon: <FaGitAlt className="text-orange-500 text-3xl" />,
    items: [
      { name: "Git", icon: <FaGitAlt className="text-orange-500 hover:rotate-12 transition-transform duration-300" />, animation: 'hover:rotate-12' },
      { name: "Docker", icon: <FaDocker className="text-blue-400 hover:scale-110 transition-transform duration-300" />, animation: 'hover:scale-110' },
      { name: "Linux", icon: <FaLinux className="text-yellow-400" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-600" /> },
      { name: "REST APIs", icon: <FaCode className="text-green-500 hover:rotate-12 transition-transform duration-300" />, animation: 'hover:rotate-12' },
      { name: "GitHub", icon: <FaGithub className="text-gray-400" /> },
      { name: "CI/CD", icon: <SiGithubactions className="text-gray-600" /> },
      { name: "AWS", icon: <FaAws className="text-orange-600 hover:scale-110 transition-transform duration-300" />, animation: 'hover:scale-110' },
    ],
  },
];

// Enhanced animation variants for icons
const iconVariants = {
  initial: { 
    y: 0, 
    scale: 1,
    rotate: 0 
  },
  hover: (custom) => ({
    y: -8,
    scale: 1.15,
    rotate: custom.rotate || 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
      duration: 0.3
    }
  }),
  tap: {
    scale: 0.85,
    transition: { 
      type: 'spring',
      stiffness: 400,
      damping: 15
    }
  },
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Enhanced custom animations for specific icons
const getIconAnimation = (name) => {
  const baseClasses = 'transition-all duration-300 ease-out transform';
  
  switch(name.toLowerCase()) {
    case 'react':
      return `${baseClasses} hover:animate-spin-slow hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]`;
      
    case 'node.js':
      return `${baseClasses} hover:animate-bounce hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]`;
      
    case 'python':
      return `${baseClasses} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:animate-pulse`;
      
    case 'html5':
      return `${baseClasses} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.5)] hover:animate-pulse`;
      
    case 'css3':
      return `${baseClasses} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:animate-pulse`;
      
    case 'javascript':
      return `${baseClasses} hover:animate-bounce hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]`;
      
    case 'typescript':
      return `${baseClasses} hover:scale-110 hover:rotate-6 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]`;
      
    case 'next.js':
      return `${baseClasses} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,0,0,0.3)]`;
      
    case 'tailwind css':
      return `${baseClasses} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] hover:animate-pulse`;
      
    case 'supabase':
      return `${baseClasses} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.5)] hover:animate-pulse`;
      
    case 'langchain':
      return `${baseClasses} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] hover:animate-pulse`;
      
    case 'langgraph':
      return `${baseClasses} hover:scale-110 hover:rotate-6 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]`;
      
    case 'git':
      return `${baseClasses} hover:scale-110 hover:rotate-12 hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]`;
      
    case 'docker':
      return `${baseClasses} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]`;
      
    case 'aws':
      return `${baseClasses} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]`;
      
    case 'rest apis':
      return `${baseClasses} hover:scale-110 hover:rotate-12 hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]`;
      
    default:
      return `${baseClasses} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(156,163,175,0.3)]`;
  }
};

const Skills = () => {
  const { isDark } = useTheme();
  
  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const textBoxRef = useRef(null);

  // GSAP Animations
  useEffect(() => {
    // Check if all refs are available before creating animations
    if (!sectionRef.current || !titleRef.current || !subtitleRef.current || !textBoxRef.current) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse"
      }
    });

    // Section entrance animation
    tl.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3 },
      "-=0.2"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3 },
      "-=0.15"
    );

    // Stagger animation for skill cards
    if (cardsRef.current && cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 60, scale: 0.8, rotationY: -15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 95%",
            end: "bottom 5%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Text box animation
    gsap.fromTo(textBoxRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.35,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textBoxRef.current,
          start: "top 95%",
          end: "bottom 5%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cleanup
    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, []);

  // Enhanced hover animations for skill cards
  const handleCardHover = (index) => {
    if (cardsRef.current && cardsRef.current[index]) {
      const cardHover = {
        initial: { 
          y: 0,
          rotateX: 0,
          rotateY: 0,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        },
        hover: {
          y: -8,
          rotateX: 2,
          rotateY: 2,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transition: { 
            type: 'spring',
            stiffness: 300,
            damping: 15
          }
        }
      };
      gsap.to(cardsRef.current[index], cardHover.hover);
    }
  };

  const handleCardLeave = (index) => {
    if (cardsRef.current && cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        scale: 1,
        y: 0,
        boxShadow: 'none',
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // Hover animations for skill items
  const handleSkillHover = (skillElement) => {
    if (skillElement) {
      gsap.to(skillElement, {
        scale: 1.05,
        y: -2,
        duration: 0.15,
        ease: "power2.out"
      });
    }
  };

  const handleSkillLeave = (skillElement) => {
    if (skillElement) {
      gsap.to(skillElement, {
        scale: 1,
        y: 0,
        duration: 0.15,
        ease: "power2.out"
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`py-32 px-10 font-figtree ${
        !isDark ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]" : ""
      }`}
    >
      <div className="max-w-8xl mx-auto">
        <h2
          ref={titleRef}
          className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center font-dxgrafik mb-8 pb-4 ${
            isDark
              ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
              : "text-[#111827]"
          }`}
        >
          Skills & Technologies
        </h2>

        <p
          ref={subtitleRef}
          className={`text-center mb-16 text-base sm:text-lg font-figtree ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          My technical toolkit for building modern and scalable applications
        </p>

        {/* Cards Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
              className={`rounded-2xl cursor-pointer ${
                isDark
                  ? "bg-gradient-to-b from-[#181818] to-[#0f0f0f] border border-neutral-800 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                  : "bg-white/90 backdrop-blur-[20px] border border-white/50 shadow-lg hover:shadow-xl"
              } transition-all duration-300`}
            >
              {/* Card Header */}
              <div
                className={`p-6 rounded-t-2xl flex items-center gap-4 ${
                  isDark
                    ? "bg-gradient-to-r from-teal-800/20 to-purple-800/20 border border-teal-800/30 shadow-[0_0_20px_rgba(56,189,248,0.1)]"
                    : "bg-gradient-to-r from-[#cceeff] to-[#eae2ff]"
                }`}
              >
                <div
                  className={`w-16 h-14 rounded-xl flex items-center justify-center
                    ${isDark
                      ? "bg-gradient-to-br from-teal-600/30 to-purple-600/30 border border-teal-400/20 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                      : "bg-gradient-to-br from-[#159ccb]/30 to-[#0f7a9e]/30 border border-[#159ccb]/20 shadow-[0_0_15px_rgba(21,156,203,0.2)]"
                    }
                  `}
                >
                  {group.icon}
                </div>
                <h3
                  className={`text-2xl font-semibold font-heading font-dxgrafik ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  {group.category}
                </h3>
              </div>

              {/* Divider */}
              <div
                className={`h-[1px] ${
                  isDark ? "bg-neutral-700" : "bg-gray-200"
                }`}
              ></div>

              {/* Card Body */}
              <div className="p-6">
                <div className="flex flex-wrap gap-4">
                  {group.items.map((skill, i) => (
                    <div
                      key={i}
                      onMouseEnter={(e) => handleSkillHover(e.currentTarget)}
                      onMouseLeave={(e) => handleSkillLeave(e.currentTarget)}
                      className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer ${
                        isDark
                          ? "bg-[#1e1e1e] hover:shadow-[0_0_8px_rgba(255,255,255,0.15)]"
                          : "bg-[#f9f9fb] hover:shadow-md"
                      } transition-all duration-300`}
                    >
                      <span 
                        className="text-lg"
                      >
                        {skill.icon}
                      </span>
                      <span
                        className={`text-base font-figtree ${
                          isDark ? "text-gray-200" : "text-gray-700"
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Text Box */}
        <div
          ref={textBoxRef}
          className={`rounded-2xl p-6 mt-12 mx-auto max-w-3xl text-center text-base sm:text-lg font-figtree ${
            isDark
              ? "bg-[#181818] text-gray-200 shadow-[0_0_7px_7px_rgba(11,36,51,0.5)]"
              : "bg-white text-gray-700 shadow-lg"
          } transition-all duration-300 flex items-center justify-center`}
        >
          I'm always curious to explore new technologies, constantly expanding my toolkit to tackle challenges more creatively and effectively.
        </div>
      </div>
    </section>
  );
};

export default Skills;