import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Search, Palette, ChevronDown } from 'lucide-react';
import axios from 'axios'
import ReactMarkdown from 'react-markdown';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/ai/get-response`;

const suggestionChips = [
  { icon: <Palette size={16} />, text: 'Tell me about your skills' },
  { icon: <MessageCircle size={16} />, text: 'What projects have you worked on?' },
  { icon: <MessageCircle size={16} />, text: 'Tell me about your experience' },
];

const AIAssistantWidget = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'ai',
      text: "👋 Hey! I'm your AI assistant. I can help you learn about Ankit's work and experience. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const messagesEndRef = useRef(null);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    const chatArea = chatAreaRef.current;
    if (chatArea) {
      const handleScroll = () => {
        const isAtBottom = chatArea.scrollHeight - chatArea.scrollTop <= chatArea.clientHeight + 100;
        setShowScrollIndicator(!isAtBottom);
      };
      chatArea.addEventListener('scroll', handleScroll);
      return () => chatArea.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenModal = () => {
    setIsInitialLoading(true);
    setOpen(true);
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
    handleSend(new Event('submit'), text);
  };

  const handleSend = async (e, suggestedText = null) => {
    e.preventDefault();
    const messageToSend = suggestedText || input;
    if (!messageToSend.trim()) return;

    // Add user message immediately
    setMessages((msgs) => [...msgs, { from: 'user', text: messageToSend }]);
    setInput('');

    try {
      setIsLoading(true);
      const response = await axios.post(API_URL, { prompt: messageToSend });
      
      console.log("API Response:", response.data); // Debugging purpose
      setMessages((msgs) => [...msgs, { from: 'ai', text: response.data.response }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((msgs) => [
        ...msgs,
        { 
          from: 'ai', 
          text: error.response?.data?.error || "I apologize, but I'm having trouble connecting to the server. Please make sure the backend server is running and try again." 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full shadow-lg hover:scale-105 transition-transform
            focus:outline-none focus:ring-4 focus:ring-blue-400/40
            hover:shadow-[0_0_24px_6px_rgba(59,130,246,0.7),0_0_40px_10px_rgba(168,85,247,0.5)]"
          onClick={handleOpenModal}
          aria-label="Open AI Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot-message-square-icon lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
        </button>
      )}

      {/* Modal UI */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4">
          <div className="relative w-full max-w-4xl mx-auto rounded-xl sm:rounded-2xl bg-[#181c23] shadow-2xl border border-[#23283a] flex flex-col h-[85vh] sm:h-[600px]">
            {isInitialLoading ? (
              // Initial Loading State UI
              <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-6">
                <span className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 sm:p-4 rounded-full shadow-lg mb-3 sm:mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot-message-square-icon lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
                </span>
                <span className="font-semibold text-base sm:text-lg text-white mb-3 sm:mb-4">AI Assistant</span>
                <div className="flex space-x-2 justify-center items-center">
                  <span className="sr-only">Loading...</span>
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#23283a] rounded-t-xl sm:rounded-t-2xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="bg-blue-500 p-2 sm:p-2.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot-message-square-icon lucide-bot-message-square"><path d="M12 6V2H8"/><path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z"/><path d="M2 12h2"/><path d="M9 11v2"/><path d="M15 11v2"/><path d="M20 12h2"/></svg>
                    </span>
                    <div>
                      <span className="font-semibold text-base sm:text-lg text-white">AI Assistant</span>
                      <div className="text-xs sm:text-sm text-blue-200">Powered by Gemini AI</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 sm:p-2 rounded-full text-white hover:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Close AI Assistant"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>

                {/* Message Area */}
                <div
                  ref={chatAreaRef}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 overflow-y-auto bg-[#181c23] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent"
                  style={{
                    backgroundImage: `
                      linear-gradient(to bottom right, 
                        rgb(9,9,11) 0%,
                        #1a1f2e 30%,
                        #2d3748 60%,
                        #1e293b 100%
                      ),
                      radial-gradient(
                        circle at top right,
                        rgba(59, 130, 246, 0.1) 0%,
                        transparent 50%
                      ),
                      radial-gradient(
                        circle at bottom left,
                        rgba(139, 92, 246, 0.1) 0%,
                        transparent 50%
                      )
                    `
                  }}
                >
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4`}>
                      <div className={`max-w-[85%] sm:max-w-[70%] px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl ${
                        message.from === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-[#23283a] text-white rounded-tl-none'
                      }`}>
                        {message.from === 'ai' ? (
                          <ReactMarkdown
                            components={{
                              strong: ({...props}) => <strong className="text-blue-300 font-semibold" {...props} />,
                              p: ({...props}) => <p className="mb-2 text-sm sm:text-base" {...props} />,
                              ul: ({...props}) => <ul className="list-disc pl-4 mb-2 text-sm sm:text-base" {...props} />,
                              li: ({...props}) => <li className="mb-1" {...props} />
                            }}
                          >
                            {message.text}
                          </ReactMarkdown>
                        ) : (
                          <span className="text-sm sm:text-base">{message.text}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isLoading && (
                    <div className="flex justify-start mb-3 sm:mb-4">
                      <div className="bg-[#23283a] text-white rounded-xl sm:rounded-2xl rounded-tl-none px-4 sm:px-5 py-2.5 sm:py-3">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />

                  {/* Scroll Indicator */}
                  {showScrollIndicator && (
                    <button
                      onClick={scrollToBottom}
                      className="absolute bottom-16 sm:bottom-20 right-4 sm:right-6 bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 sm:p-2 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all animate-bounce"
                      aria-label="Scroll to bottom"
                    >
                      <ChevronDown size={18} className="text-white" />
                    </button>
                  )}
                </div>

                {/* Suggestion Chips */}
                <div className="px-4 sm:px-6 py-2 sm:py-3 overflow-x-auto scrollbar-hide bg-[#181c23] border-t border-[#23283a]">
                  <div className="flex gap-2 sm:gap-3">
                    {suggestionChips.map((chip, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => handleSuggestionClick(chip.text)}
                        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#23283a]/60 backdrop-blur-sm text-blue-200/90 border border-blue-700/20 text-xs sm:text-sm font-medium whitespace-nowrap hover:bg-blue-800/30 transition-all duration-200 hover:border-blue-700/40"
                      >
                        {chip.icon} {chip.text}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSend} className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-[#23283a] rounded-b-xl sm:rounded-b-2xl">
                  <input
                    type="text"
                    className="flex-1 bg-[#1e1e1e] text-white rounded-full px-4 sm:px-5 py-2 sm:py-3 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-[#9a9a9a] text-sm sm:text-base"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-full transition-colors" 
                    aria-label="Send message"
                    disabled={isLoading}
                  >
                    <Send size={18} className="sm:w-5 sm:h-5" />
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

export default AIAssistantWidget;
