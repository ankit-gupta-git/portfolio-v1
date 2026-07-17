import { useEffect, useState } from "react";

const Loader = ({ onLoadingComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Disable scrolling and hide cursor on the body/html during loading
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";

    // Smoothly fade out the loader overlay after the SVG stroke animation completes (5 seconds)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      // Restore scrolling and cursor when the loader is unmounted
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
    };
  }, []);

  const handleTransitionEnd = (e) => {
    // Only call onLoadingComplete when the opacity transition of the container completes
    if (fadeOut && e.target === e.currentTarget) {
      onLoadingComplete();
    }
  };

  const styles = `
    .hello__svg-path {
      fill: none;
      stroke: #fff;
      stroke-linecap: round;
      stroke-miterlimit: 10;
      stroke-width: 35px;
      stroke-dasharray: 5800px;
      stroke-dashoffset: 5800px;
      animation: anim__hello linear 5s forwards;
    }

    @keyframes anim__hello {
      0% {
        stroke-dashoffset: 5800;
      }
      25% {
        stroke-dashoffset: 5800;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ease-out px-6 md:px-12 lg:px-20 cursor-none select-none pointer-events-auto ${
          fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          background: `linear-gradient(217deg, rgba(255, 159, 237), rgba(255, 0, 0, 0) 70.71%),
                       linear-gradient(127deg, rgba(118, 164, 255), rgba(0, 255, 0, 0) 65%),
                       linear-gradient(336deg, rgba(255, 191, 138), rgba(0, 0, 255, 0) 70.71%)`,
          backgroundColor: "#000"
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-10 items-center">
          {/* Right column placeholder (mirrors the Hero image placement to align layout) */}
          <div className="order-1 md:order-2 opacity-0 select-none pointer-events-none flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72"></div>
          </div>

          {/* Left column (where the hero introduction text begins) */}
          <div className="order-2 md:order-1 flex justify-center md:justify-start">
            <div className="w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] lg:w-[600px] lg:h-[600px] flex items-center justify-center">
              <svg
                className="w-full h-auto max-w-[600px]"
                viewBox="0 0 1230.94 414.57"
              >
                <path
                  className="hello__svg-path"
                  d="M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-52.22,377.24-44.11,322.48s34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31"
                  transform="translate(311.08 476.02)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;