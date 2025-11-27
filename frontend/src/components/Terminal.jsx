import React from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const Terminal = ({ isOpen, onClose }) => {

  const [history, setHistory] = React.useState([
    { type: 'output', content: "Welcome to Ankit's Interactive Portfolio Terminal!" },
    { type: 'output', content: 'Type "help" to see available commands or click the tabs above.' },
  ]);

  const [input, setInput] = React.useState('');
  const terminalRef = React.useRef(null);

  // -----------------------------
  //       FIXED COMMANDS
  // -----------------------------
  const commands = {
    home: {
      execute: () => window.location.href = '/#home',
      description: 'Return to main portfolio',
    },

    exit: {
      execute: () => onClose(),
      description: 'Exit terminal',
    },

    about: {
      execute: () => `
About Me
----------
I'm Ankit, a passionate developer with expertise in building modern web applications.
Strong foundation in computer science + full-stack development experience.
`,
      description: 'Learn about me',
    },

    skills: {
      execute: () => `
Technical Skills
----------------
Frontend: React, Next.js, TypeScript, TailwindCSS
Backend: Node.js, Express, Python
Databases: MongoDB, PostgreSQL
DevOps: Docker, AWS, GitHub Actions
`,
      description: 'View my technical skills',
    },

    projects: {
      execute: () => `
Featured Projects
----------------
1. Portfolio Website
2. E-commerce Platform
3. Task Manager App
`,
      description: 'See my projects',
    },

    experience: {
      execute: () => `
Experience
----------
• Full Stack Developer @ WebSolutions
• Senior Engineer @ TechCorp
`,
      description: 'My work experience',
    },

    contact: {
      execute: () => `
Get In Touch
------------
Email: your.email@example.com
LinkedIn: linkedin.com/in/yourprofile
GitHub: github.com/yourusername
`,
      description: 'Contact details',
    },

    book: {
      execute: () => `Opening booking calendar...`,
      description: 'Book a meeting',
    },

    whoami: {
      execute: () => `You are a visitor to Ankit's portfolio.`,
      description: 'Identify user',
    },

    ls: {
      execute: () => `
Sections:
- about
- skills
- projects
- experience
- contact
`,
      description: 'List sections',
    },

    cat: {
      execute: (args) => {
        if (!args[0]) return 'Usage: cat [file]';
        if (args[0] === 'about.txt') return 'This is Ankit’s about file.';
        return `cat: ${args[0]} — file not found`;
      },
      description: 'Read file',
    },

    sudo: {
      execute: () => `Nice try 😄 You are not root.`,
      description: 'Fake sudo',
    },

    clear: {
      execute: () => { setHistory([]); return null; },
      description: 'Clear terminal',
    },

    help: {
      execute: () => `
Available commands:

Portfolio:
  about        - About me
  skills       - Skill set
  projects     - Project list
  experience   - Work history
  contact      - Contact details
  book         - Book a meeting

System:
  whoami       - Show user info
  ls           - List sections
  cat [file]   - Open file
  sudo         - Fake sudo
  clear        - Clear terminal

Navigation:
  home         - Back to portfolio
  exit         - Close terminal
`,
      description: 'Help menu',
    },
  };

  // -----------------------------
  //       Execute Command
  // -----------------------------
  const executeCommand = (cmd) => {
    const trimmed = cmd.trim();
    const [base, ...args] = trimmed.split(/\s+/);
    const lower = base.toLowerCase();

    setHistory(prev => [...prev, { type: 'input', content: `ankit@portfolio:~$ ${trimmed}` }]);

    if (!trimmed) return;

    if (commands[lower]) {
      const result = commands[lower].execute(args);
      if (result === null) return;

      const outputLines = result.split("\n").map(line => line.trim());
      setHistory(prev => [...prev, ...outputLines.map(l => ({ type: 'output', content: l }))]);
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'error', content: `Command not found: ${lower}` },
        { type: 'output', content: `Type "help" to see available commands.` }
      ]);
    }
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  // Auto-scroll
  React.useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  // -----------------------------
  //       Terminal UI
  // -----------------------------
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
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">terminal</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terminal body */}
        <div 
          ref={terminalRef}
          className="flex-1 p-4 overflow-y-auto bg-black/90 text-green-400 font-mono text-sm"
        >
          {history.map((item, idx) => (
            <div key={idx} className={`${item.type === 'error' ? 'text-red-400' : ''}`}>
              {item.content}
            </div>
          ))}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="mr-2">ankit@portfolio:~$</span>
            <input
              className="flex-1 bg-transparent outline-none text-green-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
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
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg transition transform hover:scale-105"
    >
      <TerminalIcon className="w-5 h-5" />
      <span>Terminal</span>
    </button>
  </div>
);
