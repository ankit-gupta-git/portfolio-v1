import React from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Ankit's integrated contact details
const CONTACT = {
  email: 'ankitkumargupta752@gmail.com',
  linkedin: 'https://www.linkedin.com/in/iamankit-gupta/',
  github: 'https://github.com/ankit-gupta-git',
};

const ASCII_BANNER = [
  "  ___        _ _ _   ",
  " / _ \\\\ _   _(_) (_)_ __  ",
  "| | | | | | | | | | '_ \\\\ ",
  "| |_| | |_| | | | | | | |",
  " \\\\__\\\\_\\\\__,_|_|_|_|_| |_|",
];

const STORAGE_KEY = 'ankit_terminal_cmd_history_v2';

export const Terminal = ({ isOpen, onClose }) => {
  
  const terminalRef = React.useRef(null);
  const inputRef = React.useRef(null);

  // persisted typed-commands (for arrow navigation)
  const [cmdHistory, setCmdHistory] = React.useState(() => {
    try {
      if (typeof window === 'undefined') return [];
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const defaultWelcome = [
    { type: 'output', content: `Welcome to Ankit's Interactive Portfolio Terminal!` },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ];

  const [history, setHistory] = React.useState(defaultWelcome);
  const [input, setInput] = React.useState('');
  const [historyIndex, setHistoryIndex] = React.useState(null);
  const [suggestions, setSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // Commands definition MOVED OUTSIDE useRef to fix scope issues
  const getCommands = () => ({
    home: {
      execute: () => {
        router.push('/#home');
        return 'Navigating to home...';
      },
      description: 'Return to main portfolio',
    },

    exit: {
      execute: () => {
        onClose();
        return null;
      },
      description: 'Exit terminal',
    },

    about: {
      execute: () => `About Me\n----------\nI'm Ankit, a passionate developer building modern web apps. Strong CS fundamentals + full-stack experience.`,
      description: 'Learn about me',
    },

    skills: {
      execute: () => `Technical Skills\n----------------\nFrontend: React, Next.js, TypeScript, TailwindCSS\nBackend: Node.js, Express, Python\nDatabases: MongoDB, PostgreSQL\nDevOps: Docker, AWS, GitHub Actions`,
      description: 'View my technical skills',
    },

    projects: {
      execute: () => `Featured Projects\n----------------\n1. Portfolio Website\n2. E-commerce Platform\n3. Task Manager App`,
      description: 'See my projects',
    },

    experience: {
      execute: () => `Experience\n----------\n• Full Stack Developer @ WebSolutions\n• Senior Engineer @ TechCorp`,
      description: 'My work experience',
    },

    contact: {
      execute: () => `Get In Touch\n------------\nEmail: ${CONTACT.email}\nLinkedIn: ${CONTACT.linkedin}\nGitHub: ${CONTACT.github}`,
      description: 'Contact details',
    },

    book: {
      execute: () => 'Opening booking calendar...',
      description: 'Book a meeting',
    },

    whoami: {
      execute: () => `You are a visitor to Ankit's portfolio.`,
      description: 'Identify user',
    },

    ls: {
      execute: () => `Sections:\n- about\n- skills\n- projects\n- experience\n- contact`,
      description: 'List sections',
    },

    cat: {
      execute: (args) => {
        if (!args || !args[0]) return 'Usage: cat [file]';
        if (args[0] === 'about.txt') return "This is Ankit's about file.";
        return `cat: ${args[0]} — file not found`;
      },
      description: 'Read file',
    },

    sudo: {
      execute: () => `Access Denied. You are not in the sudoers file. This incident will be reported.\nJust kidding! This is a portfolio terminal, not a real system. But I appreciate the curiosity! 🚀`,
      description: 'Fake sudo command',
    },

    clear: {
      execute: () => {
        setHistory(defaultWelcome);
        return null;
      },
      description: 'Clear terminal',
    },

    help: {
      execute: () => {
        let text = "Available commands:\n\n";
        const cmds = getCommands();
        for (const key in cmds) {
          text += `${key.padEnd(12)} - ${cmds[key].description}\n`;
        }
        return text;
      },
      description: 'Help menu',
    },

    time: {
      execute: () => {
        try {
          const now = new Date();
          const ist = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
          return `Current IST: ${ist}`;
        } catch (e) {
          return `Current time: ${new Date().toString()}`;
        }
      },
      description: 'Show current IST time',
    },

    joke: {
      execute: () => {
        const jokes = [
          'Why do programmers prefer dark mode? Because light attracts bugs.',
          'A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?"',
          "There are 10 types of people in the world: those who understand binary, and those who don't.",
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      },
      description: 'Random dev joke',
    },

    quote: {
      execute: () => {
        const quotes = [
          'Code is like humor. When you have to explain it, it\'s bad. — Cory House',
          'First, solve the problem. Then, write the code. — John Johnson',
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
      },
      description: 'Motivational quote',
    },
  });

  // aliases map (moved outside)
  const aliases = {
    q: 'exit',
    cls: 'clear',
    '?': 'help',
    proj: 'projects',
  };

  // persist cmdHistory to localStorage
  React.useEffect(() => {
    if (cmdHistory.length > 0 && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cmdHistory));
      } catch (e) {
        console.warn('Failed to persist cmd history:', e);
      }
    }
  }, [cmdHistory]);

  // persist cmdHistory
  React.useEffect(() => {
    if (isOpen) {
      setHistory(defaultWelcome);
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          { type: 'output', content: ASCII_BANNER.join('\n') },
          { type: 'output', content: '' },
        ]);
      }, 120);
    }
  }, [isOpen]);

  // auto-scroll on history change
  React.useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Execute Command
  const executeCommand = (raw) => {
    const trimmed = raw.replace(/\s+$/g, '');
    // echo input
    setHistory((prev) => [...prev, { type: 'input', content: `ankit@portfolio:~$ ${trimmed}` }]);

    if (!trimmed) return;

    // alias mapping
    const tokens = trimmed.split(/\s+/);
    const base = tokens[0].toLowerCase();
    const mapped = aliases[base] || base;
    const args = tokens.slice(1);

    // command exists?
    const commands = getCommands();
    const cmd = commands[mapped];
    
    if (cmd) {
      const out = cmd.execute(args);
      if (out === null) return;
      const lines = String(out).split('\n');
      setHistory((prev) => [...prev, ...lines.map((l) => ({ type: 'output', content: l }))]);
    } else {
      // suggestions
      const possible = Object.keys(commands).filter((c) => c.startsWith(base.slice(0, 2)));
      setHistory((prev) => [
        ...prev,
        { type: 'error', content: `Command not found: ${base}` },
        { type: 'output', content: `Type "help" to see available commands.` },
        ...(possible.length ? [{ type: 'output', content: `Did you mean: ${possible.join(', ')}` }] : []),
      ]);
    }

    // persist typed command
    setCmdHistory((prev) => {
      const next = [...prev, trimmed].slice(-300);
      return next;
    });
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
    setShowSuggestions(false);
  };

  // keyboard handling: up/down history, tab autocomplete
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!cmdHistory.length) return;
      setHistoryIndex((idx) => {
        const next = idx === null ? cmdHistory.length - 1 : Math.max(0, idx - 1);
        setInput(cmdHistory[next] ?? '');
        return next;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!cmdHistory.length) return;
      setHistoryIndex((idx) => {
        if (idx === null) {
          setInput('');
          return null;
        }
        const next = Math.min(cmdHistory.length - 1, idx + 1);
        const val = cmdHistory[next] ?? '';
        setInput(val);
        return next >= cmdHistory.length ? null : next;
      });
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const tokens = input.trim().split(/\s+/);
      const token = tokens[0] || '';
      const commands = getCommands();
      
      if (!token) {
        setSuggestions(Object.keys(commands));
        setShowSuggestions(true);
        return;
      }
      
      const matches = Object.keys(commands).filter((c) => c.startsWith(token.toLowerCase()));
      if (matches.length === 1) {
        const rest = input.replace(/^\s*\S+/, matches[0]);
        setInput(rest + (input.endsWith(' ') ? '' : ' '));
      } else if (matches.length > 1) {
        setSuggestions(matches);
        setShowSuggestions(true);
      }
    }
  };

  // compute on-change suggestions for UI dropdown
  React.useEffect(() => {
    const token = input.trim().split(/\s+/)[0] || '';
    if (!token) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const commands = getCommands();
    const matches = Object.keys(commands).filter((c) => c.startsWith(token.toLowerCase()));
    setSuggestions(matches.slice(0, 10));
    setShowSuggestions(matches.length > 0);
  }, [input]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="w-full max-w-4xl h-[80vh] bg-gray-900 rounded-lg overflow-hidden flex flex-col"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">terminal</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close terminal">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terminal body */}
        <div ref={terminalRef} className="flex-1 p-4 overflow-y-auto bg-black/90 text-green-400 font-mono text-sm">
          {history.map((item, idx) => {
            const className = item.type === 'error' ? 'text-red-400' : item.type === 'input' ? 'text-green-300' : '';
            return (
              <div key={idx} className={className}>
                <pre className="whitespace-pre-wrap m-0">{
                  String(item.content).split('\n').map((p, i) => (
                    <span key={i}>
                      {p.split(/(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g).map((seg, si) => {
                        const urlMatch = seg.match(/^(https?:\/\/[^\s]+)$/);
                        const emailMatch = seg.match(/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
                        if (urlMatch) {
                          return (
                            <a key={si} href={seg} target="_blank" rel="noopener noreferrer" className="underline">
                              {seg}
                            </a>
                          );
                        } else if (emailMatch) {
                          return (
                            <a key={si} href={`mailto:${seg}`} target="_blank" rel="noopener noreferrer" className="underline">
                              {seg}
                            </a>
                          );
                        }
                        return seg;
                      })}
                      {i < p.length - 1 ? '\n' : ''}
                    </span>
                  ))
                }</pre>
              </div>
            );
          })}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center mt-2" aria-label="terminal-form">
            <span className="mr-2 text-green-300">ankit@portfolio:~$</span>
            <input
              ref={inputRef}
              className="flex-1 bg-transparent outline-none text-green-400 placeholder:text-green-600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder='e.g. "help"'
              aria-label="terminal-input"
            />
          </form>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mt-2 bg-gray-800 p-2 rounded text-sm max-h-48 overflow-y-auto">
              {suggestions.map((s, i) => (
                <div key={i} className="py-1 cursor-pointer hover:bg-gray-700 px-2 rounded">{s}</div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const TerminalLauncher = ({ onClick }) => (
  <div className="fixed bottom-6 right-6 z-40">
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
      aria-label="Open terminal"
    >
      <TerminalIcon className="w-5 h-5" />
      <span>Terminal</span>
    </button>
  </div>
);
