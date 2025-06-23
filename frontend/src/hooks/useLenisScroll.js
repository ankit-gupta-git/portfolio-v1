// frontend/src/hooks/useLenisScroll.js
import { useEffect, useState } from 'react';
import Lenis from 'lenis'

const useLenisScroll = () => {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const newLenis = new Lenis({
      duration: 2.5,
      smooth: true,
      direction: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
      lerp: 0.1,
    });

    setLenis(newLenis);

    const raf = (time) => {
      newLenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => newLenis.destroy();
  }, []);

  return lenis;
};

export default useLenisScroll;
