// frontend/src/hooks/useLenisScroll.js
import { useEffect } from 'react';
import Lenis from 'lenis'

const useLenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      smooth: true,
      direction: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
      lerp: 0.1,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
};

export default useLenisScroll;
