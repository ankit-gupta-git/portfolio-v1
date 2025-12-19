import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "./ui/ThemeContext";
import { FaCode, FaLink, FaLaptopCode } from "react-icons/fa6";
import { SiCodeforces, SiGeeksforgeeks } from "react-icons/si";

const profiles = {
  leetcode: {
    username: "ankitguptaa17",
    href: "https://leetcode.com/ankitguptaa17",
  },
  codeforces: {
    username: "",
    href: "https://codeforces.com/",
  },
  geeksforgeeks: {
    username: "ankitxcodes",
    href: "https://www.geeksforgeeks.org/profile/ankitxcodes",
  },
  interviewbit: {
    username: "ankit-kumar-gupta_787",
    href: "https://www.interviewbit.com/profile/ankit-kumar-gupta_787/",
  },
  codolio: {
    username: "ankit.codes",
    href: "https://codolio.com/profile/ankit.codes",
  },
};

const sampleProblems = [
  {
    id: 1,
    title: "Two Sum",
    platform: "LeetCode",
    difficulty: "Easy",
    href: "https://leetcode.com/problems/two-sum/",
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    platform: "LeetCode",
    difficulty: "Medium",
    href: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
  {
    id: 3,
    title: "A+B Problem",
    platform: "Codeforces",
    difficulty: "Easy",
    href: "https://codeforces.com/",
  },
  {
    id: 4,
    title: "Binary Tree Inorder Traversal",
    platform: "LeetCode",
    difficulty: "Medium",
    href: "https://leetcode.com/problems/binary-tree-inorder-traversal/",
  },
];

export default function ProblemSolving() {
  const { isDark } = useTheme();
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [cfData, setCfData] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Try load LeetCode stats from a public endpoint (graceful fallback)
    (async () => {
      try {
        const username = profiles.leetcode.username;
        if (username) {
          // Try community API (may fail) - gracefully ignore errors
          const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
          if (res.ok) {
            const data = await res.json();
            setLeetcodeData(data);
          }
        }
      } catch (err) {
        // ignore
      }

      try {
        const handle = profiles.codeforces.username;
        if (handle) {
          const r = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
          const json = await r.json();
          if (json.status === "OK") {
            setCfData(json.result[0]);
          }
        }
      } catch (err) {
        // ignore
      }
    })();
  }, []);

  const scroll = (dir = "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section
      id="problemsolving"
      className={`max-w-7xl mx-auto px-6 md:px-12 py-12 transition duration-300 ${
        isDark ? "text-white" : "text-black"
      }`}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-bold ${
              isDark
                ? "text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-800"
                : "text-[#111827]"
            } mb-12 font-dxgrafik`}
          >
            Problem Solving
          </h2>
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={profiles.leetcode.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition transform hover:scale-105 bg-white/10 border border-white/10"
            >
              <FaCode className="text-lg" />
              <span className="text-sm">LeetCode</span>
            </a>
            <a
              href={profiles.codeforces.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition transform hover:scale-105 bg-white/10 border border-white/10"
            >
              <SiCodeforces className="text-lg" />
              <span className="text-sm">Codeforces</span>
            </a>
            <a
              href={profiles.geeksforgeeks.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition transform hover:scale-105 bg-white/10 border border-white/10"
            >
              <SiGeeksforgeeks className="text-lg" />
              <span className="text-sm">GfG</span>
            </a>
            <a
              href={profiles.interviewbit.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition transform hover:scale-105 bg-white/10 border border-white/10"
            >
              <FaLaptopCode className="text-lg" />
              <span className="text-sm">InterviewBit</span>
            </a>
            <a
              href={profiles.codolio.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition transform hover:scale-105 bg-white/10 border border-white/10"
            >
              <FaLink className="text-lg" />
              <span className="text-sm">Codolio</span>
            </a>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}> 
          {/* Stats card */}
          <div
            className={`p-4 rounded-xl border transition transform hover:-translate-y-1 hover:shadow-xl ${
              isDark ? "bg-black/40 border-white/10" : "bg-white/80 border-gray-100"
            }`}
          >
            <h4 className="text-sm font-medium text-gray-400">Stats</h4>
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">LeetCode</div>
                  <div className="font-semibold text-lg">{leetcodeData ? `${leetcodeData.totalSolved ?? "-"} solved` : "—"}</div>
                </div>
                <a
                  href={profiles.leetcode.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 text-sm"
                >
                  View
                </a>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400">Codeforces</div>
                  <div className="font-semibold text-lg">{cfData ? `${cfData.rating ?? "-"}` : "—"}</div>
                </div>
                <a
                  href={profiles.codeforces.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 text-sm"
                >
                  View
                </a>
              </div>

              <div className="mt-2 text-xs text-gray-400">Tip: Add your usernames in <code>ProblemSolving.jsx</code> to fetch live stats.</div>
            </div>
          </div>

          {/* Recent solved carousel */}
          <div className={`md:col-span-2 p-4 rounded-xl border relative ${isDark ? "bg-black/40 border-white/10" : "bg-white/80 border-gray-100"}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold">Recent Challenges</h4>
                <div className="text-xs text-gray-400">A quick look at recent problems</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="p-1 rounded-md bg-white/10 hover:bg-white/20"
                >
                  ◀
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-1 rounded-md bg-white/10 hover:bg-white/20"
                >
                  ▶
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="carousel w-full flex gap-4 overflow-x-auto scroll-smooth py-1 px-1 snap-x snap-mandatory scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {(sampleProblems || []).map((p) => (
                <a
                  key={p.id}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`snap-start min-w-[220px] max-w-[260px] p-4 rounded-xl border transition transform hover:-translate-y-1 hover:shadow-xl ${
                    isDark ? "bg-black/30 border-white/5" : "bg-white/90 border-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-400">{p.platform}</div>
                  </div>
                  <div className="mt-3 text-sm text-gray-400">Difficulty: {p.difficulty}</div>
                </a>
              ))}
            </div>

            <div className="mt-4 text-xs text-gray-400">Add your API integration to show live recent solves.</div>
          </div>
        </div>

        {/* Mobile platform row */}
        <div className="flex sm:hidden items-center gap-4 overflow-x-auto py-2">
          <a href={profiles.leetcode.href} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
            <FaCode /> <span className="text-sm">LeetCode</span>
          </a>
          <a href={profiles.codeforces.href} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
            <SiCodeforces /> <span className="text-sm">Codeforces</span>
          </a>
          <a href={profiles.geeksforgeeks.href} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
            <SiGeeksforgeeks /> <span className="text-sm">GfG</span>
          </a>
          <a href={profiles.interviewbit.href} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
            <FaLaptopCode /> <span className="text-sm">InterviewBit</span>
          </a>
          <a href={profiles.codolio.href} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
            <FaLink /> <span className="text-sm">Codolio</span>
          </a>
        </div>
      </div>
    </section>
  );
}
