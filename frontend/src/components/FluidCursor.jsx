import { useEffect } from 'react';
import useFluidCursor from '../hooks/useFluidCursor';
import { useTheme } from './ui/ThemeContext';

const FluidCursor = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    if (!isDark) return;

    const cleanup = useFluidCursor();
    return () => {
      if (cleanup) cleanup();
    };
  }, [isDark]);
  
  if (!isDark) return null;

  return (
    <div className="fixed top-0 left-0 z-[2] pointer-events-none">
      <canvas id="fluid" className="w-screen h-screen" />
    </div>
  );
};

export default FluidCursor;
