import { useEffect } from "react";

export default function useSmoothScroll() {
  useEffect(() => {
    // Only apply on non-touch devices (desktops/laptops with wheel input)
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let isMoving = false;
    let animationFrameId = null;

    // Linear interpolation function (smoothing factor 0.08)
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const handleWheel = (e) => {
      // Prevent native jumpy scrolling
      e.preventDefault();

      const delta = e.deltaY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      // Adjust multiplier (1.15) for scroll distance/speed
      targetY = Math.max(0, Math.min(maxScroll, targetY + delta * 1.15));

      if (!isMoving) {
        isMoving = true;
        animationFrameId = requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      currentY = lerp(currentY, targetY, 0.08);
      window.scrollTo(0, currentY);

      // Keep animating until close enough to target
      if (Math.abs(currentY - targetY) > 0.3) {
        animationFrameId = requestAnimationFrame(updateScroll);
      } else {
        isMoving = false;
        window.scrollTo(0, targetY);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    // Sync targetY if scroll is done by other means (e.g. scrollbar, keyboard)
    const handleScroll = () => {
      if (!isMoving) {
        targetY = window.scrollY;
        currentY = window.scrollY;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
}
