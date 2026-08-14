import { useEffect } from 'react';
import useFluidCursor from '../hooks/useFluidCursor';
import { useTheme } from './ui/ThemeContext';

const FluidCursor = () => {
  const { isDark } = useTheme();

  // Disable on mobile/touch devices for high-performance scrolling
  const isTouchDevice = typeof window !== 'undefined' && (
    'ontouchstart' in window ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.innerWidth < 768
  );

  useEffect(() => {
    if (!isDark || isTouchDevice) return;

    const cleanup = useFluidCursor();
    return () => {
      if (cleanup) cleanup();
    };
  }, [isDark, isTouchDevice]);
  
  if (!isDark || isTouchDevice) return null;

  return (
    <div className="fixed top-0 left-0 z-[2] pointer-events-none">
      <canvas id="fluid" className="w-screen h-screen" />
    </div>
  );
};

export default FluidCursor;
