import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLenisSmoothScroll = (isLoading = false) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth momentum scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker for frame-perfect animation synchronization
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      lenisRef.current = null;
    };
  }, []);

  // Handle stopping/starting scroll when loading state changes
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isLoading) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isLoading]);

  return lenisRef;
};

export default useLenisSmoothScroll;
