import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { GitHub } from 'lucide-react';

const GITHUB_USERNAME = 'ankit-gupta-git';

const GithubContributions = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center py-10 sm:py-16 px-2">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600 mb-2 sm:mb-4 text-center font-dxgrafik">
        GitHub Contributions
      </h1>
      <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-purple-400 mb-4 sm:mb-8 text-center">
        Contribution Activity
      </h2>
      <div className="bg-opacity-70 rounded-xl p-2 sm:p-4 md:p-6 shadow-2xl mb-6 sm:mb-8 w-full max-w-full overflow-x-auto flex justify-center">
        <div className="min-w-[320px] sm:min-w-[400px] md:min-w-[600px]">
          <GitHubCalendar
            username={GITHUB_USERNAME}
            colorScheme="dark"
            blockSize={isMobile ? 10 : 16}
            blockMargin={4}
            fontSize={isMobile ? 8 : 14}
          />
          <p className="text-white text-base sm:text-lg mt-2 sm:mt-4 text-center">
            Real-time contributions in the last year
          </p>
        </div>
      </div>
      <a
        href={`https://github.com/${GITHUB_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-[#23272f] text-white text-base sm:text-lg font-semibold rounded-lg shadow-md hover:bg-[#3b3f4a] transition-colors duration-200"
      >
        <GitHub className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
        View GitHub Profile
      </a>
    </section>
  );
};

export default GithubContributions;