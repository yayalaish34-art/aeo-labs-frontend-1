import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Minimize2 } from 'lucide-react';

import type { Language } from '../types';
const BACKEND_URL =
  "https://aeo-labs-production.up.railway.app";

interface Props {
  lang?: Language;
}

const SupportChat: React.FC<Props> = ({ lang = 'he' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting based on language
  useEffect(() => {
    if (messages.length === 0) {
      const greeting = lang === 'he' 
        ? "היי! אני העוזר מ-AEO Labs. שאלו אותי כל מה שתרצו: על הגדרות ההרשאה לעורכי החנות, על אסטרטגיות השיפור שלנו, ואיך אפשר להתחיל."
        : "Hi! I'm the AEO Labs Assistant. Ask me anything about permission settings, our optimization strategies, or how to get started.";
      setMessages([{ role: 'model', text: greeting }]);
    }
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Helper function to render bold text and maintain spacing
  const renderMessageContent = (text: string) => {
    // Split text by newlines first to handle paragraphs
    const lines = text.split('\n');
    
    return lines.map((line, i) => {
      // Basic parsing for bold text (**text**)
      const parts = line.split(/(\*\*.*?\*\*)/g);
      
      return (
        <div key={i} className={`${line.trim() === '' ? 'h-2' : 'min-h-[20px]'}`}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
            return <span key={j}>{part}</span>;
          })}
        </div>
      );
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMsg,
          history: messages
        }),
      });

      if (!res.ok) {
        console.error("Backend error:", res.status, await res.text());
        throw new Error("Failed to get reply from backend");
      }

      const data = await res.json(); // נניח שהשרת מחזיר { reply: "..." }
      const reply = data.reply || "I'm sorry, I couldn't process that. Can you rephrase?";

      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { role: 'model', text: "I'm having trouble connecting right now. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center
          ${isOpen ? 'bg-slate-700 text-slate-300 rotate-90' : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'}
        `}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} fill="currentColor" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 md:bottom-24 right-4 md:right-6 w-[calc(100vw-32px)] md:w-[400px] h-[550px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-slate-800 p-4 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">AEO Assistant</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <Minimize2 size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-900/95 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-md whitespace-pre-wrap
                    ${msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gradient-to-br from-slate-800 to-slate-900 text-slate-200 border border-slate-700 rounded-tl-none'
                    }
                  `}
                >
                  {renderMessageContent(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-800 border-t border-slate-700">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-slate-500 transition-colors"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-600/20"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportChat;
