import React, { useEffect, useRef } from "react";
import {
  Award,
  Briefcase,
  Code2,
  GraduationCap,
  Laptop,
  MapPin,
  Rocket,
  SendHorizontal
} from "lucide-react";
import Timeline from "./ui/timeline";
import { useTheme } from "./ui/ThemeContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCircle } from "react-icons/fa6";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const { isDark } = useTheme();
  
  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);

  // Renders text with **bold** segments highlighted (used for metrics & key terms)
  const highlight = (text) =>
    text.split("**").map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className={`font-semibold ${isDark ? "text-blue-400" : "text-[#159ccb]"}`}>
          {part}
        </strong>
      ) : (
        part
      )
    );

  const RoleCard = ({ icon, role, company, type, period, location, summary, points, stack }) => (
    <div className="flex items-start gap-3 sm:gap-4">
      <div className="flex-shrink-0 pt-1">
        {React.createElement(icon, { className: `w-5 h-5 sm:w-6 sm:h-6 ${isDark ? "text-blue-500" : "text-[#159ccb]"}` })}
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className={`text-base sm:text-lg font-semibold ${isDark ? "text-white" : "text-[#111827]"}`}>{role}</h3>
          {type && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isDark ? "bg-[#1e293b]/70 text-blue-400" : "bg-[#cceeff] text-[#159ccb]"}`}>
              {type}
            </span>
          )}
        </div>
        <p className={`text-sm sm:text-base font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}>{company}</p>
        <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 mb-3 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          {period && <span>{period}</span>}
          {location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              {location}
            </span>
          )}
        </div>
        {summary && (
          <p className={`text-sm leading-relaxed mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>{highlight(summary)}</p>
        )}
        {points && (
          <ul className={`list-none pl-0 space-y-2 text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            {points.map((point, index) => (
              <li key={index}>
                <div className="flex items-start gap-1 sm:gap-2">
                  <SendHorizontal className={`mt-1 w-3 h-3 flex-shrink-0 text-blue-400 ${isDark ? "glow-blue" : ""}`} />
                  <span>{highlight(point)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {stack && (
          <div className="flex flex-wrap gap-2 mt-4">
            {stack.map((tech) => (
              <span key={tech} className={`px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium ${isDark ? "bg-[#1e293b]/70 text-blue-400" : "bg-[#cceeff] text-[#159ccb]"}`}>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const experiences = [
    {
      title: "2026 - Present",
      content: (
        <RoleCard
          icon={Rocket}
          role="Founding Software Engineering Intern"
          company="TheGradleW Technologies"
          type="Founding Team"
          period="Jul 2026 - Present"
          location="Remote"
          summary="Part of the founding engineering team building **AI-driven infrastructure** for network reliability, distributed monitoring and observability."
          points={[
            "Designing **cloud-native and Edge AI architectures** and shipping proofs of concept for scalable infrastructure systems.",
            "Researching **LLM-based incident analysis and root cause detection** to automate infrastructure troubleshooting workflows.",
            "Building **distributed telemetry pipelines** and contributing to core system architecture decisions from day one.",
          ]}
          stack={["LLMs", "Edge AI", "Cloud-Native", "Observability", "Distributed Systems"]}
        />
      ),
    },
    {
      title: "2025",
      content: (
        <RoleCard
          icon={Briefcase}
          role="Frontend Development Intern"
          company="DiGrows"
          type="Internship"
          period="May 2025 - Jul 2025"
          location="Roorkee, IN · Remote"
          points={[
            "Built a scalable React.js frontend serving **500+ active users**, improving responsiveness with React Query caching and lazy loading.",
            "Integrated **15+ REST APIs** using TanStack Query, cutting redundant network requests by **35%**.",
            "Developed **20+ reusable UI components** in an Agile team, accelerating feature delivery across the product.",
          ]}
          stack={["React.js", "Vite.js", "React Query", "REST APIs", "HTML5", "CSS3", "GitHub"]}
        />
      ),
    },
    {
      title: "Freelance",
      content: (
        <RoleCard
          icon={Laptop}
          role="Freelance Full-Stack Developer"
          company="Self-Employed"
          type="Freelance"
          location="Remote"
          points={[
            "Delivered **15+ production web applications** for **10+ clients** across EdTech, enterprise and other domains.",
            "Owned the full lifecycle end-to-end: **requirements, design, development and deployment**.",
          ]}
          stack={["React.js", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"]}
        />
      ),
    },
    {
      title: "2023 - 2027",
      content: (
        <RoleCard
          icon={GraduationCap}
          role="B.Tech in Computer Science & Engineering (AIML)"
          company="Quantum University"
          period="Aug 2023 - Jun 2027"
          location="Roorkee, IN"
          summary="CGPA: **8.31/10**. Strong foundation in DSA, OOP, Operating Systems, DBMS, Computer Networks and System Design."
          points={[
            "Solved **500+ DSA problems** across platforms, including **400+ on LeetCode**.",
          ]}
        />
      ),
    },
    {
      title: "Hackathons",
      content: (
        <RoleCard
          icon={Code2}
          role="Hackathon Team Lead"
          company="National & University Hackathons"
          period="Aug 2023 - Present"
          points={[
            "Led teams to **5+ national and university hackathon finals**, owning architecture and delivery under tight deadlines.",
            "Built AI-powered healthcare systems with chatbot integration and real-time IoT monitoring.",
            "Built decentralized platforms using blockchain and geospatial tech for wildlife conservation.",
          ]}
        />
      ),
    },
    {
      title: "Awards & Recognition",
      content: (
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0 pt-1">
            <Award className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? "text-blue-500" : "text-[#159ccb]"}`} />
          </div>
          <div className="flex-1">
            {(() => {
              const hackathonAwardsData = [
                {
                  title: "Annual Fest Hackathon Winner - \"Swastha\" (Remote Healthcare Monitoring System)",
                  description:"A remote healthcare monitoring system utilizing IoT and Arduino Uno, featuring real-time vitals tracking, an AI-driven medical chatbot, and a live assistant for enhanced user support.",
                  tags: ["Winner", "Real-time", "Remote Healthcare", "IoT"],
                  certificate: "https://drive.google.com/file/d/1v59ZqExnFulLg3lcRDj4F7PWkq4vfBhC/view?usp=sharing"
                },
                {
                  title: "Top 30 at Galgotias International Hackathon - \"Aranya\" (Decentralized Wildlife Conservation Platform)",
                  description: "A decentralized wildlife conservation platform using blockchain, AI, and geospatial tech, featuring GPS-tagged plantation NFTs, a 3D interactive biodiversity map, AI-driven animal chatbots, and real-time data integration.",
                  tags: ["Top 30", "Blockchain", "AI", "Geospatial Tech", "Leadership"],
                  certificate: "https://drive.google.com/file/d/1iyJCumva4HqNKTeKeCWDn9WGenN4zed3/view?usp=sharing"
                }
              ];

              const otherCertificationsData = [
                {
                  title: "freeCodeCamp - Back End Development and APIs Certification (Sep 2026)",
                  description: "Certified in building back-end services and REST APIs with Node.js, Express.js and MongoDB.",
                  tags: ["Certification", "Node.js", "APIs"],
                  certificate: "https://www.freecodecamp.org/certification/ankitgupta_79/back-end-development-and-apis-v9"
                },
                {
                  title: "AWS Cloud Quest - Cloud Practitioner (Feb 2026)",
                  description: "Hands-on AWS training covering core cloud services, including compute, storage, networking and security.",
                  tags: ["Certification", "AWS", "Cloud"],
                  certificate: "https://www.credly.com/badges/566b7d1e-d638-4683-9e21-1f8030729d67/public_url"
                }
              ];

              const renderList = (items) => (
                <ul className="space-y-6">
                  {items.map((award, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <FaCircle className={`w-3 h-3 sm:w-2.5 sm:h-2.5 mt-2 flex-shrink-0 ${isDark ? "text-blue-500" : "text-[#159ccb]"}`} />
                      <div>
                        <h4 className={`text-base sm:text-lg font-semibold ${isDark ? "text-white" : "text-[#111827]"}`}>{award.title}</h4>
                        <p className={`mt-1 text-sm sm:text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>{award.description}</p>
                        {/* Tags */}
                        {award.tags && award.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {award.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-sm sm:text-sm font-medium ${isDark ? "bg-[#1e293b]/70 text-blue-400" : "bg-[#cceeff] text-[#159ccb]"}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        {/* Certificate Link */}
                        {award.certificate && (
                          <a
                            href={award.certificate}
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-lg text-sm transition-all duration-300 hover:scale-105 relative group overflow-hidden ${
                              isDark
                                ? "bg-black/30 backdrop-blur-md border border-blue-500/50"
                                : "bg-white/80 backdrop-blur-md border border-[#159ccb]/30 shadow-sm"
                            }`}
                          >
                            <span
                              className={`absolute inset-0 bg-gradient-to-r from-[#159ccb] to-[#0f7a9e] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300`}
                            ></span>
                            <span className={`relative z-10 flex items-center gap-2 ${
                              isDark ? "text-white" : "text-[#159ccb] group-hover:text-white group-active:text-white"
                            }`}>
                              View Certificate <HiOutlineDocumentArrowDown className="text-sm" />
                            </span>
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              );

              const subheadingClass = `text-base sm:text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-[#111827]"}`;

              return (
                <>
                  <h3 className={subheadingClass}>Hackathon Achievements</h3>
                  {renderList(hackathonAwardsData)}
                  <h3 className={`${subheadingClass} mt-10`}>Other Certifications</h3>
                  {renderList(otherCertificationsData)}
                </>
              );
            })()}
          </div>
        </div>
      ),
    },
  ];

  // GSAP animations
  useEffect(() => {
    // Check if all refs are available before creating animations
    if (!sectionRef.current || !titleRef.current || !timelineRef.current) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 98%", // Triggers almost immediately when section enters viewport
        end: "bottom 10%",
        toggleActions: "play none none reverse"
      }
    });

    // Section entrance animation
    tl.fromTo(sectionRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.3 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 10, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.25 },
      "-=0.15"
    )
    .fromTo(timelineRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.3 },
      "-=0.15"
    );

    // Cleanup
    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className={`relative py-20 px-2 sm:px-4 md:px-10 overflow-hidden ${
        !isDark ? "bg-gradient-to-br from-[#f1faff] via-[#e6f0ff] to-[#ffffff]" : ""
      }`}
    >
      <h2
        ref={titleRef}
        className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center font-dxgrafik ${
          isDark
            ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
            : "text-[#111827]"
        } mb-12 sm:mb-16 pb-4 sm:pb-8`}
      >
        Experience
      </h2>

      <div ref={timelineRef} className="max-w-[95%] sm:max-w-[90%] md:max-w-[85%] mx-auto">
        <Timeline data={experiences} />
      </div>
    </section>
  );
};

export default Experience;