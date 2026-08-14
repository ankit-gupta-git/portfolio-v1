import { useState, useEffect } from 'react';
import useFluidCursor from '../hooks/useFluidCursor';
import { useTheme } from './ui/ThemeContext';

const FluidCursor = () => {
  const { isDark } = useTheme();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch =
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
          (navigator && navigator.maxTouchPoints > 0) ||
          window.matchMedia('(pointer: coarse)').matches ||
          window.innerWidth < 768);
      setIsMobile(isTouch);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isDark || isMobile) return;

    const cleanup = useFluidCursor();
    return () => {
      if (cleanup) cleanup();
    };
  }, [isDark, isMobile]);

  if (!isDark || isMobile) return null;

  return (
    <div className="fixed top-0 left-0 z-[2] pointer-events-none">
      <canvas id="fluid" className="w-screen h-screen" />
    </div>
  );
};

export default FluidCursor;
