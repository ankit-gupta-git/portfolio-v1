import React from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Box component for command outputs
const Box = ({ title, children, className = '' }) => (
  <div className={`border-2 border-green-400 rounded-md p-4 my-2 ${className}`}>
    {title && (
      <div className="text-green-400 font-bold text-lg mb-2 border-b border-green-400 pb-1">
        {title.toUpperCase()}
      </div>
    )}
    <div className="text-green-300">
      {children}
    </div>
  </div>
);

// Ankit's integrated contact details
const CONTACT = {
  email: 'ankitkumargupta752@gmail.com',
  linkedin: 'https://www.linkedin.com/in/iamankit-gupta/',
  github: 'https://github.com/ankit-gupta-git',
  twitter: 'https://twitter.com/ankitgupta_79',
  resume: 'https://drive.google.com/file/d/19HHUQSajGr2eHBJ2g9aGxZOoebAFhbbN/view?usp=sharing' // Update with your actual resume link
};

const ASCII_BANNER = [
  "     _    _   _ _    _ _   ",
  "    / \\  | \\ | | | _(_) |_ ",
  "   / _ \\ |  \\| | |/ / | __|",
  "  / ___ \\| |\\  |   <| | |_ ",
  " /_/   \\_\\_| \\_|_|\\_\\_|_|\\__|",
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

  // Block background scroll when terminal opens
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Commands definition
  const getCommands = () => ({
    home: {
      execute: () => {
        setHistory(prev => [...prev, { type: 'output', content: 'Redirecting to main portfolio...' }]);
        setTimeout(() => {
          onClose();
          if (typeof window !== 'undefined') {
            window.location.href = '/';
          }
        }, 1500);
        return null;
      },
      description: 'Return to main portfolio',
    },

    exit: {
      execute: () => {
        setHistory(prev => [
          ...prev, 
          { type: 'output', content: 'Goodbye! Closing terminal...' }
        ]);
        setTimeout(() => {
          onClose();
          if (typeof window !== 'undefined') {
            window.location.href = '/';
          }
        }, 1500);
        return null;
      },
      description: 'Exit terminal and go home',
    },

    about: {
      execute: () => {
        return `
╔════════════════════════════════════════════╗
║                ABOUT ANKIT                 ║
╚════════════════════════════════════════════╝

Name: Ankit Kumar Gupta
Role: Full Stack Developer | AIML Enthusiast | Aspiring SDE
Location: India (Remote)
Currently Pursuing: B.Tech in CSE with AIML specialization at Quantum University, Roorkee
Status: Open to opportunities & collaborations
Experience: 2+ years (Projects, hackathons, and real-world development)
Projects Built: 20+
Hackathons: 5+ (Winner – Annual Tech Fest Hackathon)

I am a passionate Indian developer who believes in learning by building and solving real-world problems with clean, scalable technology. I enjoy combining full-stack development with AI/ML concepts to create meaningful products that offer real impact and great user experiences.

My interests span across web development, backend engineering, AI integrations, systems design, and automation, and I love working in environments where innovation meets execution.

Available for:

• Full-stack development (MERN)
• Frontend engineering (React, Tailwind, Next.js)
• Backend development (Node.js, Express, MongoDB, MySQL)
• AI & Generative AI integration
• Automation and scripting
• REST API development & integration
• UI/UX design
• Technical consultation
• Hackathon & startup collaborations

Feel free to explore my terminal portfolio to learn more about my skills, projects, and experience!` ;
      },
      description: 'Learn about me',
    },

    skills: {
      execute: () => {
        return `
╔════════════════════════════════════════════╗
║           TECHNICAL SKILLS                 ║
╚════════════════════════════════════════════╝

FRONTEND DEVELOPMENT:
- React
- Next.js
- TypeScript
- JavaScript
- Tailwind CSS
- HTML5
- CSS3
- Framer Motion

OTHER FRONTEND TOOLS & LIBRARIES:
- Zustand
- React Query
- State Management
- Responsive Design
- Redux
- React Hook Form

BACKEND DEVELOPMENT:
- Node.js
- Express.js
- Python
- MongoDB
- MySQL
- REST APIs
- Socket.IO
- GraphQL

DATABASES:
- MongoDB
- PostgreSQL
- Firebase
- Supabase

AI/ML TECHNOLOGIES:
- LangChain
- LangGraph
- OpenAI APIs
- NumPy
- Pandas
- Scikit-learn
- Jupyter

DEVOPS & TOOLS:
- Docker
- AWS
- Git
- Linux
- CI/CD
- Postman
- GitHub
- GitHub Actions`;
      },
      description: 'View my technical skills',
    },

    projects: {
      execute: () => {
        return `
╔════════════════════════════════════════════╗
║          FEATURED PROJECTS                 ║
╚════════════════════════════════════════════╝

1. NAPSTER - Movie Recommendation AI
   AI-powered movie recommender with real-time trends
   Tech: React | Tailwind | Node.js | APIs

2. WANDERLUST - Airbnb Clone
   Full-stack rental platform with booking system
   Tech: MERN | Tailwind | JWT

3. TUDOO - Real-Time Collaborative To-Do Board
   Drag-and-drop task management with Firebase sync
   Tech: React | Firebase | Framer Motion

4. ANZARA - E-Commerce Store
   Full-featured e-commerce with Stripe payments
   Tech: React | Redux | Stripe

5. NEURACHAT - Real-time AI Chat
   Group chat with Socket.IO & AI assistant
   Tech: React | Three.js | OpenAI | Socket.IO`;
      },
      description: 'See my projects',
    },

    experience: {
      execute: () => {
        return `
╔════════════════════════════════════════════╗
║           WORK EXPERIENCE                  ║
╚════════════════════════════════════════════╝

HACKATHON TEAM LEAD (Aug 2023 - May 2025)
- Led cross-functional teams in multiple hackathons
- Developed AI-powered healthcare systems with chatbots
- Built blockchain-based platforms for conservation tech
- Achieved 1st place at Annual Fest Hackathon
- Achieved 2nd place at Health Track Hackathon
- Integrated real-time data with Firebase & Arduino

EDUCATION IN PROGRESS
Bachelor of Technology - CSE (AIML)
Quantum University, Roorkee
Building expertise in AI, ML & full-stack development`;
      },
      description: 'My work experience',
    },

    resume: {
      execute: () => {
        setHistory(prev => [
          ...prev, 
          { type: 'output', content: 'Loading your resume...' }
        ]);
        
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.open('https://drive.google.com/file/d/19HHUQSajGr2eHBJ2g9aGxZOoebAFhbbN/view?usp=sharing', '_blank');
          }
          setHistory(prev => [
            ...prev, 
            { type: 'output', content: 'Resume opened in new tab!' }
          ]);
        }, 2000);
        
        return null;
      },
      description: 'Open my resume PDF',
    },

    contact: {
      execute: () => {
        return `
╔════════════════════════════════════════════╗
║             GET IN TOUCH                   ║
╚════════════════════════════════════════════╝

📧 Email: ${CONTACT.email}
🔗 LinkedIn: ${CONTACT.linkedin}
💻 GitHub: ${CONTACT.github}
🐦 Twitter: ${CONTACT.twitter}

📍 Location: Remote - India

💬 Available for:
- Full-stack development projects
- Frontend/Backend consulting
- Technical mentorship
- AI/ML integration solutions

✉️  Response time: Within 24 hours`;
      },
      description: 'Contact details',
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
      execute: () => `Access Denied. You are not in the sudoers file. This incident will be reported.\nJust kidding! This is a portfolio terminal, not a real system. But I appreciate the curiosity!`,
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
        return `Portfolio Commands:
- about         Learn about me
- skills        View my technical skills
- projects      See my project portfolio
- experience    My work experience & education
- contact       How to reach me
- resume        Download my resume

System Commands:
- clear         Clear the terminal
- whoami        Show current user info
- ls            List available sections
- sudo          Try to access restricted areas

Navigation Commands:
- home          Return to main portfolio
- exit          Exit terminal and go home

Terminal Navigation:
- Up/Down arrows    Command history
- Tab               Insert spaces`;
      },
      description: 'Show available commands',
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
          'How many programmers does it take to change a light bulb? None, that\'s a hardware problem.',
          'Why do Java developers wear glasses? Because they don\'t C#!'
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
          'The best way to predict the future is to invent it. — Alan Kay',
          'Simple can be harder than complex. — Steve Jobs'
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
      },
      description: 'Motivational quote',
    },
  });

  // aliases map
  const aliases = {
    q: 'exit',
    cls: 'clear',
    '?': 'help',
    proj: 'projects',
    cv: 'resume',
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

  // show ASCII banner on open
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
    setHistory((prev) => [...prev, { type: 'input', content: `ankit@portfolio:~$ ${trimmed}` }]);

    if (!trimmed) return;

    const tokens = trimmed.split(/\s+/);
    const base = tokens[0].toLowerCase();
    const mapped = aliases[base] || base;
    const args = tokens.slice(1);

    const commands = getCommands();
    const cmd = commands[mapped];
    
    if (cmd) {
      const result = cmd.execute(args);
      if (result === null) return;
      
      if (result && typeof result.then === 'function') {
        result.then(message => {
          if (message) {
            const lines = String(message).split('\n');
            setHistory(prev => [...prev, ...lines.map(l => ({ type: 'output', content: l }))]);
          }
        });
      } else if (result) {
        const lines = String(result).split('\n');
        setHistory(prev => [...prev, ...lines.map(l => ({ type: 'output', content: l }))]);
      }
    } else {
      const possible = Object.keys(commands).filter((c) => c.startsWith(base.slice(0, 2)));
      setHistory((prev) => [
        ...prev,
        { type: 'error', content: `Command not found: ${base}` },
        { type: 'output', content: `Type "help" to see available commands.` },
        ...(possible.length ? [{ type: 'output', content: `Did you mean: ${possible.join(', ')}` }] : []),
      ]);
    }

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
  };

  // keyboard handling: up/down history, tab
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
      setInput(prev => prev + '  ');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="w-full max-w-4xl h-[80vh] bg-black rounded-lg overflow-hidden flex flex-col border-2 border-green-500 shadow-2xl shadow-green-500/20"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-950 px-4 py-3 flex justify-between items-center border-b-2 border-green-500/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <TerminalIcon className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-mono font-bold">ankit@portfolio</span>
          </div>
          <button 
            onClick={onClose} 
            className="text-green-400 hover:text-green-300 transition-colors" 
            aria-label="Close terminal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terminal body with green scrollbar */}
        <div 
          ref={terminalRef} 
          className="flex-1 p-4 overflow-y-auto bg-black text-green-400 font-mono text-sm"
          style={{
            scrollbarColor: '#16a34a #0a0a0a',
            scrollbarWidth: 'thin'
          }}
        >
          {/* Custom scrollbar styling - SHORTER */}
          <style>{`
            div::-webkit-scrollbar {
              width: 6px;
            }
            div::-webkit-scrollbar-track {
              background: #0a0a0a;
            }
            div::-webkit-scrollbar-thumb {
              background: #16a34a;
              border-radius: 3px;
              min-height: 40px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background: #22c55e;
            }
          `}</style>

          {history.map((item, idx) => {
            const className = item.type === 'error' 
              ? 'text-red-500' 
              : item.type === 'input' 
              ? 'text-green-300 font-bold' 
              : 'text-green-400';
            
            return (
              <div key={idx} className={className}>
                {typeof item.content === 'string' ? (
                  <pre className="whitespace-pre-wrap m-0 font-mono text-sm leading-relaxed">
                    {item.content.split('\n').map((line, i) => (
                      <div key={i}>
                        {line.split(/(https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g).map((seg, si) => {
                          const urlMatch = seg.match(/^(https?:\/\/[^\s]+)$/);
                          const emailMatch = seg.match(/^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/);
                          if (urlMatch) {
                            return (
                              <a 
                                key={si} 
                                href={seg} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="underline text-green-300 hover:text-green-200 transition-colors"
                              >
                                {seg}
                              </a>
                            );
                          } else if (emailMatch) {
                            return (
                              <a 
                                key={si} 
                                href={`mailto:${seg}`} 
                                className="underline text-green-300 hover:text-green-200 transition-colors"
                              >
                                {seg}
                              </a>
                            );
                          }
                          return <span key={si}>{seg}</span>;
                        })}
                      </div>
                    ))}
                  </pre>
                ) : (
                  <div className="font-mono">{item.content}</div>
                )}
              </div>
            );
          })}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center mt-3 font-mono" aria-label="terminal-form">
            <span className="text-green-500 font-bold mr-2">ankit@portfolio:~$</span>
            <input
              ref={inputRef}
              className="flex-1 bg-transparent outline-none text-green-300 placeholder:text-green-700 caret-green-400"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="type 'help' for commands"
            />
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const TerminalLauncher = ({ onClick }) => (
  <div className="fixed bottom-6 right-6 z-40">
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-bold px-4 py-3 rounded-lg shadow-xl shadow-green-500/50 transition transform hover:scale-105 active:scale-95"
      aria-label="Open terminal"
    >
      <TerminalIcon className="w-5 h-5" />
      <span>Terminal</span>
    </button>
  </div>
);
