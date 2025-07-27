import React, { useEffect, useRef } from "react";
import { useTheme } from "./ui/ThemeContext";
import { FaMedium, FaExternalLinkAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const { isDark } = useTheme();

  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const blogCardsRef = useRef([]);
  const ctaRef = useRef(null);

  // Sample blog data - replace with your actual Medium blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Why Next.js is My Go-To Framework for Building Modern Web Apps",
      description: "Learn how to design and implement robust microservices architecture using Spring Boot, Docker, and Kubernetes for enterprise applications.",
      topic: "Next.js 13",
      readTime: "5 min read",
      publishDate: "July 18, 2025",
      image: "/BlogImg/next.jpg",
      mediumUrl: "https://medium.com/@ankitkumargupta752/why-next-js-is-my-go-to-framework-for-building-modern-web-apps-2f03133ff06b",
      tags: ["Next.js", "React", "Web Development"]
    },
    {
      id: 2,
      title: "How Prompt Engineering Changed the Way I Code (and Think)",
      description: "Prompt engineering helped me code smarter and faster — I highly recommend everyone to learn this skill.",
      topic: "Prompt Engineering",
      readTime: "4 min read",
      publishDate: "July 20, 2025",
      image: "/BlogImg/Prompt.webp",
      mediumUrl: "https://medium.com/@ankitkumargupta752/how-prompt-engineering-changed-the-way-i-code-and-think-6d408a4347a4",
      tags: ["Prompt Engineering", "AI Tools", "Coding", "Learning", "ChatGPT", "Software Development"]
    },
    {
      id: 3,
      title: "AI-Powered Chatbots: From Concept to Deployment",
      description: "Build intelligent chatbots using natural language processing and machine learning techniques for enhanced user experiences.",
      topic: "Artificial Intelligence",
      readTime: "15 min read",
      publishDate: "Dec 5, 2024",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      mediumUrl: "https://medium.com/@yourusername/ai-powered-chatbots",
      tags: ["AI", "NLP", "Chatbots"]
    },
    {
      id: 4,
      title: "Optimizing Database Performance in Production",
      description: "Discover advanced database optimization techniques, indexing strategies, and query performance tuning for high-traffic applications.",
      topic: "Database",
      readTime: "10 min read",
      publishDate: "Nov 28, 2024",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
      mediumUrl: "https://medium.com/@yourusername/database-optimization",
      tags: ["Database", "Performance", "SQL"]
    }
  ];

  // GSAP Animations
  useEffect(() => {
    // Check if all refs are available before creating animations
    if (!sectionRef.current || !headerRef.current || !titleRef.current || !descriptionRef.current || !ctaRef.current) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%", // Changed from 80% to 90% - triggers earlier
        end: "bottom 10%",
        toggleActions: "play none none reverse"
      }
    });

    // Section entrance animation
    tl.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.4 }
    )
    .fromTo(headerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.4 },
      "-=0.2"
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3 },
      "-=0.3"
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3 },
      "-=0.2"
    );

    // Stagger animation for blog cards
    if (blogCardsRef.current && blogCardsRef.current.length > 0) {
      gsap.fromTo(blogCardsRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blogCardsRef.current[0],
            start: "top 95%", // Changed from 85% to 95% - triggers much earlier
            end: "bottom 5%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // CTA animation
    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 95%", // Changed from 90% to 95% - triggers much earlier
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

  return (
    <section
      ref={sectionRef}
      id="blog"
      className={`py-20 px-6 md:px-12 lg:px-20 transition duration-300 ${
        isDark ? "" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
        >
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl font-bold mb-6 font-dxgrafik ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Blog & Insights
          </h2>
          <p 
            ref={descriptionRef}
            className={`text-lg md:text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Sharing knowledge and experiences through technical writing. 
            Explore my thoughts on software development, AI, and emerging technologies.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              ref={el => blogCardsRef.current[index] = el}
              className={"group relative overflow-visible rounded-none transition-all duration-300 hover:scale-105"}
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden rounded-2xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
                {/* Topic Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isDark 
                      ? "bg-blue-600/90 text-white" 
                      : "bg-blue-600 text-white"
                  }`}>
                    {post.topic}
                  </span>
                </div>
                {/* Medium Icon */}
                <div className="absolute top-4 right-4">
                  <FaMedium className={`text-2xl ${
                    isDark ? "text-white" : "text-white"
                  }`} />
                </div>
              </div>
              {/* Blog Content */}
              <div className="p-0 pt-6">
                <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}>
                  {post.title}
                </h3>
                <p className={`text-sm mb-4 line-clamp-3 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}>
                  {post.id === 1
                    ? "Discover why Next.js 13 stands out for modern web development—covering SSR, file-based routing, and performance best practices."
                    : post.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        isDark 
                          ? "bg-gray-700 text-gray-300" 
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>{post.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                {/* Read More Button */}
                <a
                  href={post.mediumUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                    isDark
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Read on Medium
                  <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Blogs CTA */}
        <div
          ref={ctaRef}
          className="text-center mt-12"
        >
          <a
            href="https://medium.com/@ankitkumargupta752"
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 ${
              isDark
                ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            }`}
          >
            <FaMedium className="text-xl" />
            View All Articles on Medium
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;