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
} from "react-icons/si";
import { useTheme } from "./ui/ThemeContext";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Frontend Development",
    icon: <FaReact className="text-sky-400 text-3xl" />,
    items: [
      { name: "React", icon: <FaReact className="text-sky-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-cyan-400" />,
      },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    ],
  },
  {
    category: "Backend Development",
    icon: <FaNodeJs className="text-green-500 text-3xl" />,
    items: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
      { name: "Express.js", icon: <SiExpress className="text-gray-400" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
      { name: "REST APIs", icon: <FaDatabase className="text-blue-400" /> },
    ],
  },
  {
    category: "AI & ML Technologies",
    icon: <FaProjectDiagram className="text-rose-400 text-3xl" />,
    items: [
      { name: "Python", icon: <FaPython className="text-blue-500" /> },
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
      { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
      { name: "Docker", icon: <FaDocker className="text-blue-400" /> },
      { name: "Linux", icon: <FaLinux className="text-yellow-400" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-600" /> },
      { name: "GitHub", icon: <FaGithub className="text-gray-400" /> },
    ],
  },
];

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
      tl.kill();
    };
  }, []);

  // Hover animations for skill cards
  const handleCardHover = (index) => {
    gsap.to(cardsRef.current[index], {
      scale: 1.02,
      y: -5,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const handleCardLeave = (index) => {
    gsap.to(cardsRef.current[index], {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  // Hover animations for skill items
  const handleSkillHover = (skillElement) => {
    gsap.to(skillElement, {
      scale: 1.05,
      y: -2,
      duration: 0.15,
      ease: "power2.out"
    });
  };

  const handleSkillLeave = (skillElement) => {
    gsap.to(skillElement, {
      scale: 1,
      y: 0,
      duration: 0.15,
      ease: "power2.out"
    });
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