"use client";
import { useEffect, useRef, useState } from "react";

// Inline mouse position hook with ref to avoid component re-renders on mousemove
function useMousePositionRef() {
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      mouseRef.current.x = ev.clientX;
      mouseRef.current.y = ev.clientY;
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mouseRef;
}

// Inline utility to merge Tailwind classes
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

export const Sparkles = ({
  id = "tsparticles",
  className,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  particleColor = "#FFFFFF",
}) => {
  const canvasRef = useRef(null);
  const mousePositionRef = useMousePositionRef();
  const particles = useRef([]);
  const animationFrame = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const canvas = canvasRef.current;
    
    // Intersection Observer to pause rendering when offscreen
    const intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animationFrame.current) {
          animate();
        }
      }
    }, { threshold: 0.05 });

    intersectionObserver.observe(canvas);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === canvas) {
          canvas.width = entry.contentRect.width;
          canvas.height = entry.contentRect.height;
        }
      }
    });

    resizeObserver.observe(canvas);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const createParticles = () => {
      const density = Math.min(
        150,
        Math.floor((particleDensity * canvas.width * canvas.height) / (1920 * 1080))
      );
      particles.current = Array.from({ length: density }, () =>
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          minSize + Math.random() * (maxSize - minSize),
          particleColor
        )
      );
    };

    createParticles();

    const animate = () => {
      if (!ctx || !canvas || !isVisibleRef.current) {
        animationFrame.current = 0;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentMouse = mousePositionRef.current;
      particles.current.forEach((particle) => {
        particle.update(canvas.width, canvas.height, currentMouse);
        particle.draw(ctx);
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
        animationFrame.current = 0;
      }
    };
  }, [minSize, maxSize, particleDensity, particleColor, mousePositionRef]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("absolute w-full h-full top-0 left-0 pointer-events-none", className)}
      style={{
        background,
        zIndex: 0, // Ensures it stays behind the content
      }}
    />
  );
};

class Particle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
  }

  update(width, height, mousePosition) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Handle wrapping around the canvas edges
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    // Handle mouse interaction
    const dx = mousePosition.x - this.x;
    const dy = mousePosition.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      this.x -= dx * 0.01;
      this.y -= dy * 0.01;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default Sparkles;
