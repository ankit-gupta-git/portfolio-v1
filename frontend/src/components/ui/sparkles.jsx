"use client";
import { useEffect, useRef, useState } from "react";

// Inline mouse position hook
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
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
  const mousePosition = useMousePosition();
  const particles = useRef([]);
  const animationFrame = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const canvas = canvasRef.current;
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
      const density =
        (particleDensity * canvas.width * canvas.height) / (1920 * 1080);
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
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((particle) => {
        particle.update(canvas.width, canvas.height, mousePosition);
        particle.draw(ctx);
      });

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [minSize, maxSize, particleDensity, particleColor]);

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
