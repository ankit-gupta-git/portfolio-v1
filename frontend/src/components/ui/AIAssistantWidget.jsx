import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { FaPalette, FaComments, FaChevronDown } from 'react-icons/fa';
import { Send, Check, CheckCheck, Copy, RotateCcw, Sparkles, Bot, X } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const isLocalhost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1'
);

const defaultBackendUrl = isLocalhost 
  ? 'http://localhost:5000'
  : (import.meta.env.VITE_BACKEND_URL || 'https://portfolio-v1-1-uc52.onrender.com');

const backendBase = defaultBackendUrl.replace(/\/$/, '');
const API_URL = `${backendBase}/ai/get-response`;

const formatTime = (date = new Date()) => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const suggestionChips = [
  { icon: <FaPalette size={14} />, text: 'Tell me about Ankit\'s skills' },
  { icon: <FaComments size={14} />, text: 'What projects has Ankit built?' },
  { icon: <FaComments size={14} />, text: 'Tell me about his internship experience' },
  { icon: <Sparkles size={14} />, text: 'Has Ankit won any hackathons?' },
];

// Memoized suggestion chips
const SuggestionChips = memo(({ onSuggestionClick }) => (
  <div className="px-4 sm:px-6 py-2 sm:py-2.5 overflow-x-auto scrollbar-hide bg-[#14171f] border-t border-[#23283a] relative z-20">
    <div className="flex gap-2 sm:gap-2.5">
      {suggestionChips.map((chip, idx) => (
        <button 
          key={idx} 
          onClick={() => onSuggestionClick(chip.text)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#1e2333]/80 backdrop-blur-sm text-blue-200/90 border border-blue-500/20 text-xs sm:text-xs font-medium whitespace-nowrap hover:bg-blue-600/20 hover:border-blue-400/40 transition-all duration-200 shadow-sm"
        >
          {chip.icon} {chip.text}
        </button>
      ))}
    </div>
  </div>
));

// WhatsApp-style Message component
const Message = memo(({ message }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (message.text) {
      navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUser = message.from === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4 group`}>
      <div className={`relative max-w-[88%] sm:max-w-[78%] px-4 sm:px-5 py-3 rounded-2xl shadow-md transition-all ${
        isUser 
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs border border-blue-500/30' 
          : 'bg-[#212638] text-gray-100 rounded-bl-xs border border-[#2d354d]'
      }`}>
        {!isUser && (
          <div className="flex items-center justify-between border-b border-blue-500/10 pb-1.5 mb-2">
            <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
              <Bot size={13} className="text-blue-400" /> Ankit's AI
            </span>
            <button
              onClick={handleCopy}
              className="text-gray-400 hover:text-white p-1 rounded transition-colors text-xs flex items-center gap-1 bg-[#181c27] border border-[#2e3752]"
              title="Copy response"
            >
              {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
              <span className="text-[10px] text-gray-300">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        )}

        {isUser ? (
          <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{message.text}</p>
        ) : (
          <div className="prose prose-invert max-w-none text-sm sm:text-base leading-relaxed">
            <ReactMarkdown
              components={{
                strong: ({...props}) => <strong className="text-blue-300 font-semibold" {...props} />,
                p: ({...props}) => <p className="mb-2 text-sm sm:text-base last:mb-0" {...props} />,
                ul: ({...props}) => <ul className="list-disc pl-4 mb-2 text-sm sm:text-base space-y-1" {...props} />,
                ol: ({...props}) => <ol className="list-decimal pl-4 mb-2 text-sm sm:text-base space-y-1" {...props} />,
                li: ({...props}) => <li className="mb-0.5" {...props} />,
                a: ({...props}) => <a className="text-blue-400 underline hover:text-blue-300 transition-colors" target="_blank" rel="noreferrer" {...props} />
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        )}

        {/* Timestamp and Delivery Indicators */}
        <div className={`flex items-center gap-1 mt-1.5 text-[10px] ${isUser ? 'justify-end text-blue-200/80' : 'justify-end text-gray-400'}`}>
          <span>{message.time || formatTime()}</span>
          {isUser && (
            <CheckCheck size={13} className="text-blue-200" title="Delivered & Read" />
          )}
        </div>
      </div>
    </div>
  );
});

const AIAssistantWidget = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: "👋 Hey there! I'm Ankit's AI assistant. Feel free to chat with me casually about Ankit's background, full-stack & AIML projects, internship experience, or tech stack!",
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const messagesEndRef = useRef(null);
  const chatAreaRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  const handleScroll = useCallback(() => {
    const chatArea = chatAreaRef.current;
    if (chatArea) {
      const isAtBottom = chatArea.scrollHeight - chatArea.scrollTop <= chatArea.clientHeight + 100;
      setShowScrollIndicator(!isAtBottom);
    }
  }, []);

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (chatArea) {
      chatArea.addEventListener('scroll', handleScroll);
      return () => chatArea.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, open, isThinking, scrollToBottom]);

  // Scroll lock effect - locks background page
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [open]);

  const handleOpenModal = () => {
    setIsInitialLoading(true);
    setOpen(true);
    fetch(`${backendBase}/api/warmup`).catch(() => {});
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 400);
  };

  const handleClearChat = () => {
    setMessages([
      {
        from: 'ai',
        text: "Conversation cleared! What would you like to know about Ankit?",
        time: formatTime(),
      },
    ]);
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
    handleSend(new Event('submit'), text);
  };

  const handleSend = useCallback(async (e, suggestedText = null) => {
    e.preventDefault();
    const messageToSend = suggestedText || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessageObj = { from: 'user', text: messageToSend, time: formatTime() };
    const updatedMessages = [...messages, userMessageObj];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setIsThinking(true);

    const maxRetries = 2;
    let attempt = 0;
    let success = false;
    let responseData = null;
    let lastError = null;

    while (attempt <= maxRetries && !success) {
      try {
        console.log(`🔄 Frontend: Making request to: ${API_URL} (Attempt ${attempt + 1})`);
        
        // Pass conversation history turns for multi-turn chat memory
        const historyPayload = updatedMessages.map(m => ({
          from: m.from,
          text: m.text
        }));

        const response = await axios.post(
          API_URL, 
          { prompt: messageToSend, history: historyPayload }, 
          { timeout: 40000 }
        );

        responseData = response.data;
        success = true;
      } catch (error) {
        lastError = error;
        console.error(`❌ Frontend attempt ${attempt + 1} error:`, error.message);
        attempt++;
        if (attempt <= maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }

    setIsLoading(false);
    setIsThinking(false);

    if (success && responseData?.response) {
      setMessages(prev => [...prev, { from: 'ai', text: responseData.response, time: formatTime() }]);
    } else {
      const errorText = lastError?.response?.data?.error || 
        "Hey! I had a minor trouble connecting to the server. Please try sending your message once again!";
      setMessages(prev => [...prev, { from: 'ai', text: errorText, time: formatTime() }]);
    }
  }, [input, isLoading, messages]);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300
            focus:outline-none focus:ring-4 focus:ring-blue-400/40
            hover:shadow-[0_0_30px_8px_rgba(59,130,246,0.6)] group"
          onClick={handleOpenModal}
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-slate-900"></span>
            </span>
          </div>
        </button>
      )}

      {/* WhatsApp / iMessage Style Modal UI */}
      {open && (
        <div 
          data-lenis-prevent
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div 
            data-lenis-prevent
            className="relative w-full max-w-4xl mx-auto rounded-2xl bg-[#141720] shadow-2xl border border-[#23293e] flex flex-col h-[90vh] sm:h-[640px] overflow-hidden"
          >
            {isInitialLoading ? (
              <div className="flex flex-col items-center justify-center flex-1 p-6">
                <div className="relative mb-4">
                  <span className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-xl flex items-center justify-center">
                    <Bot size={36} className="text-white" />
                  </span>
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-[#141720]"></span>
                </div>
                <span className="font-bold text-xl text-white mb-1">Ankit's AI Assistant</span>
                <span className="text-xs text-blue-300/80 mb-6">Initializing resume memory & context...</span>
                <div className="flex space-x-2 justify-center items-center">
                  <div className="h-2.5 w-2.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2.5 w-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2.5 w-2.5 bg-purple-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            ) : (
              <>
                {/* Header (WhatsApp style with Online Status & Actions) */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#1b202e] border-b border-[#2a3148] rounded-t-2xl shadow-sm z-10">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-inner">
                        <Bot size={22} className="text-white" />
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-[#1b202e]" title="Online"></span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base sm:text-lg text-white tracking-wide">Ankit's AI</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          Online
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span>Casual & Friendly Assistant</span>
                        <span>•</span>
                        <span className="text-blue-300">Responds instantly</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={handleClearChat}
                      className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#283046] transition-all"
                      title="Clear Chat History"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-[#283046] transition-all"
                      aria-label="Close Chat"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Message Area */}
                <div
                  ref={chatAreaRef}
                  data-lenis-prevent
                  className="flex-1 relative overflow-y-auto px-4 sm:px-6 py-4 scrollbar-thin scrollbar-thumb-blue-600/40 scrollbar-track-transparent"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
                      radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 40%),
                      linear-gradient(to bottom, #11141c, #161a25)
                    `
                  }}
                >
                  {messages.map((message, index) => (
                    <Message key={index} message={message} />
                  ))}
                  
                  {/* WhatsApp style Typing / Thinking Indicator */}
                  {isThinking && (
                    <div className="flex justify-start mb-4 animate-in fade-in duration-200">
                      <div className="bg-[#212638] text-white rounded-2xl rounded-bl-xs px-4 py-3 border border-[#2d354d] shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex space-x-1.5 items-center">
                            <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce"></div>
                          </div>
                          <span className="text-xs text-blue-300 font-medium">Ankit's AI is typing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />

                  {/* Scroll to Bottom Floating Button */}
                  {showScrollIndicator && (
                    <button
                      onClick={scrollToBottom}
                      className="absolute bottom-4 right-6 bg-blue-600 text-white p-2 rounded-full shadow-xl hover:bg-blue-500 transition-all animate-bounce z-20 border border-blue-400/30"
                      aria-label="Scroll to bottom"
                    >
                      <FaChevronDown size={14} />
                    </button>
                  )}
                </div>

                <SuggestionChips onSuggestionClick={handleSuggestionClick} />

                {/* Input Bar (WhatsApp / iMessage style) */}
                <form 
                  onSubmit={handleSend} 
                  className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#1b202e] border-t border-[#2a3148]"
                >
                  <input
                    type="text"
                    className="flex-1 bg-[#12151f] text-white rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none border border-[#2c344d] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-500"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white p-2.5 sm:p-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center shrink-0 active:scale-95" 
                    aria-label="Send message"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(AIAssistantWidget);
