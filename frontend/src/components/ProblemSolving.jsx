import React, { useEffect, useState } from "react";
import { useTheme } from "./ui/ThemeContext";

const profiles = {
  leetcode: {
    username: "ankitguptaa17",
    href: "https://leetcode.com/ankitguptaa17",
    imgSrc:
      "https://cdn.iconscout.com/icon/free/png-512/leetcode-3628885-3030025.png",
    title: "LeetCode",
  },
  codeforces: {
    username: "ankitgupta_16",
    href: "https://codeforces.com/profile/ankitgupta_16",
    imgSrc:
      "https://cdn.iconscout.com/icon/free/png-256/code-forces-3628695-3029920.png",
    title: "Codeforces",
  },
  geeksforgeeks: {
    username: "ankitxcodes",
    href: "https://www.geeksforgeeks.org/profile/ankitxcodes",
    // Replaced the broken google content link with a valid GfG logo
    imgSrc:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg",
    title: "GeeksforGeeks",
  },
  interviewbit: {
    username: "ankit-kumar-gupta_787",
    href: "https://www.interviewbit.com/profile/ankit-kumar-gupta_787/",
    // Kept your specific link
    imgSrc:
      "https://www.startuphrtoolkit.com/wp-content/uploads/2020/12/Interviewbit-logo-150x150.png",
    title: "InterviewBit",
  },
  codolio: {
    username: "ankit.codes",
    href: "https://codolio.com/profile/ankit.codes",
    imgSrc:
      "https://cdn.brandfetch.io/idq8Sf5YMP/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1749196239423",
    title: "Codolio",
  },
};

export default function ProblemSolving() {
  const { isDark } = useTheme();
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [cfData, setCfData] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchLeet = async () => {
      try {
        const username = profiles.leetcode.username;
        if (!username) return;
        const res = await fetch(
          `https://leetcode-stats-api.herokuapp.com/${username}`
        );
        if (res.ok) {
          const data = await res.json();
          if (mounted) setLeetcodeData(data);
        }
      } catch (err) {
        // ignore
      }
    };

    const fetchCF = async () => {
      try {
        const handle = profiles.codeforces.username;
        if (!handle) return;
        const r = await fetch(
          `https://codeforces.com/api/user.info?handles=${handle}`
        );
        const json = await r.json();
        if (json.status === "OK" && mounted) {
          setCfData(json.result[0]);
        }
      } catch (err) {
        // ignore
      }
    };

    // initial load
    fetchLeet();
    fetchCF();

    // refresh LeetCode stats periodically (every 60s)
    const intervalId = setInterval(fetchLeet, 60_000);

    return () => {
      mounted = false;
      clearInterval(intervalId);
    };
  }, []);

  // compute leetcode breakdown (fallback to sample counts)
  const easyCount = leetcodeData?.easySolved ?? leetcodeData?.easy ?? 150;
  const mediumCount = leetcodeData?.mediumSolved ?? leetcodeData?.medium ?? 200;
  const hardCount = leetcodeData?.hardSolved ?? leetcodeData?.hard ?? 100;
  const totalCount = easyCount + mediumCount + hardCount;
  const pct = (n) => Math.round((n / Math.max(totalCount, 1)) * 100);

  // Helper array to iterate over profiles easily
  const platformList = [
    profiles.codeforces,
    profiles.geeksforgeeks,
    profiles.interviewbit,
    profiles.codolio,
  ];

  const allPlatforms = [profiles.leetcode, ...platformList];

  return (
    <section
      id="problemsolving"
      className={`max-w-7xl mx-auto px-6 md:px-12 py-12 transition duration-300 ${
        isDark ? "text-white" : "text-black"
      }`}
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-bold ${
                isDark
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
                  : "text-[#111827]"
              } mb-2 font-dxgrafik`}
            >
              Problem Solving
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Track my progress across competitive coding platforms
            </p>
          </div>

          {/* Desktop Top Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {allPlatforms.map((platform) => (
              <a
                key={platform.title}
                href={platform.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition transform hover:scale-105 bg-white/10 border border-white/10 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:outline-none"
              >
                <span
                  className="w-5 h-5 rounded bg-white/5 flex items-center justify-center overflow-hidden"
                  aria-hidden
                >
                  <img
                    src={platform.imgSrc}
                    alt={platform.title}
                    className="w-4 h-4 object-contain"
                  />
                </span>
                <span className="text-sm">
                  {platform.title === "GeeksforGeeks" ? "GfG" : platform.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-6 gap-6`}>
          {/* LeetCode showcase card */}
          <div
            className={`md:col-span-4 p-6 rounded-xl border transition transform hover:-translate-y-0.5 hover:shadow-lg ${
              isDark
                ? "bg-black/40 border-white/10"
                : "bg-white/80 border-gray-100"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* LeetCode Logo Here */}
                    <span
                      className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center overflow-hidden"
                      aria-hidden
                    >
                      <img
                        src={profiles.leetcode.imgSrc}
                        alt="LeetCode"
                        className="w-8 h-8 object-contain"
                      />
                    </span>
                    <div>
                      <h3 className="text-2xl font-bold">LeetCode</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {leetcodeData?.totalSolved ?? totalCount} Total Problems
                        Solved
                      </div>
                    </div>
                  </div>
                  <a
                    href={profiles.leetcode.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1 whitespace-nowrap px-3 py-2 rounded-md
                    relative group overflow-hidden transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:outline-none
                    ${
                      isDark
                        ? "bg-neutral-900/90 text-white border border-white/10"
                        : "bg-white text-orange-600 border border-gray-200 group-hover:text-white"
                    } hover:shadow-md hover:shadow-orange-500/20`}
                  >
                    {/* Gradient overlay (ONLY on hover) */}
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <span className="relative z-10">
                      View Profile <span className="hidden sm:inline">↗</span>
                    </span>
                  </a>
                </div>

                {/* Progress Bars */}
                <div className="mt-6 space-y-4">
                  {/* Easy */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Easy</div>
                      <div className="text-sm text-gray-500">
                        {easyCount}{" "}
                        <span className="ml-2 text-xs text-gray-500">
                          {pct(easyCount)}%
                        </span>
                      </div>
                    </div>
                    <div
                      className={`mt-2 h-2 rounded-full overflow-hidden ${
                        isDark ? "bg-white/5" : "bg-gray-100"
                      }`}
                    >
                      <div
                        className="h-2 bg-green-400"
                        style={{ width: `${pct(easyCount)}%` }}
                      />
                    </div>
                  </div>

                  {/* Medium */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Medium</div>
                      <div className="text-sm text-gray-500">
                        {mediumCount}{" "}
                        <span className="ml-2 text-xs text-gray-500">
                          {pct(mediumCount)}%
                        </span>
                      </div>
                    </div>
                    <div
                      className={`mt-2 h-2 rounded-full overflow-hidden ${
                        isDark ? "bg-white/5" : "bg-gray-100"
                      }`}
                    >
                      <div
                        className="h-2 bg-yellow-400"
                        style={{ width: `${pct(mediumCount)}%` }}
                      />
                    </div>
                  </div>

                  {/* Hard */}
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Hard</div>
                      <div className="text-sm text-gray-500">
                        {hardCount}{" "}
                        <span className="ml-2 text-xs text-gray-500">
                          {pct(hardCount)}%
                        </span>
                      </div>
                    </div>
                    <div
                      className={`mt-2 h-2 rounded-full overflow-hidden ${
                        isDark ? "bg-white/5" : "bg-gray-100"
                      }`}
                    >
                      <div
                        className="h-2 bg-red-400"
                        style={{ width: `${pct(hardCount)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small profile cards (Grid on Desktop) */}
          <div className="md:col-span-2 grid grid-cols-1 gap-4">
            {platformList.map((item) => (
              <div
                key={item.title}
                className={`p-4 rounded-xl border flex items-center justify-between transition transform hover:-translate-y-0.5 hover:shadow-lg ${
                  isDark
                    ? "bg-black/30 border-white/5"
                    : "bg-white/90 border-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center overflow-hidden"
                    aria-hidden
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="w-6 h-6 object-contain"
                    />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      View profile & stats
                    </div>
                  </div>
                </div>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1 whitespace-nowrap px-3 py-2 rounded-md
  relative group overflow-hidden transition-all duration-300 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:outline-none
  ${
    isDark
      ? "bg-neutral-900/90 text-white border border-white/10"
      : "bg-white text-[#159ccb] border border-gray-200 group-hover:text-white"
  } hover:shadow-md hover:shadow-[#159ccb]/20`}
                >
                  {/* Gradient overlay */}
                  <span className="absolute inset-0 bg-gradient-to-r from-[#159ccb] to-[#0f7a9e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <span className="relative z-10">View →</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile platform row */}
        <div className="flex sm:hidden items-center gap-4 overflow-x-auto py-2">
          {allPlatforms.map((platform) => (
            <a
              key={platform.title}
              href={platform.href}
              className={`inline-flex items-center gap-2 whitespace-nowrap px-3 py-2 rounded-lg transition relative group overflow-hidden shrink-0 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:outline-none ${
                isDark
                  ? "bg-black/30 text-white"
                  : "bg-white/10 text-black group-hover:text-white"
              }`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#159ccb] to-[#0f7a9e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center overflow-hidden relative z-10">
                <img
                  src={platform.imgSrc}
                  alt={platform.title}
                  className="w-4 h-4 object-contain"
                />
              </span>
              <span className="text-sm relative z-10">
                {platform.title === "GeeksforGeeks" ? "GfG" : platform.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
