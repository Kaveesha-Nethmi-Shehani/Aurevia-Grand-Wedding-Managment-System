import React, { useState } from 'react';
import API from '../services/api';
import { Sparkles, X, Send, Bot, HelpCircle, MessageCircle } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hello! I am your AI Wedding Concierge for Aurevia Grand. How many guests are you expecting, or what is your budget?',
    },
  ]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await API.post('/ai/chat', { prompt: userMessage });
      if (res.data.success) {
        setMessages((prev) => [...prev, { sender: 'ai', text: res.data.answer }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'I am your AI Wedding Concierge. We offer The Royal Crystal Hall (250 guests) and The Grand Bliss Ballroom (450 guests). How can I assist your planning?' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {
      /* Floating Button */
      }
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-3.5 rounded-full shadow-2xl flex items-center space-x-2 font-bold transition transform hover:scale-105 border-2 border-slate-900 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-slate-950" />
          <span className="text-sm">AI Wedding Planner</span>
        </button>
      )}

      {

      }
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[460px]">
          
          {
          /* Header */
          }
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between border-b border-amber-500/30">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-amber-500 rounded-lg text-slate-950">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-amber-400 font-serif">Aurevia AI Concierge</h4>
                <span className="text-[10px] text-slate-400 block">Online | Wedding Assistant</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {
          /* Messages */
          }
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 rounded-br-none font-semibold'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm leading-relaxed'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-slate-400 text-xs flex items-center space-x-1">
                <span>AI Concierge is typing...</span>
              </div>
            )}
          </div>

          {
          /* Input Box */
          }
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex space-x-2">
            <input
              type="text"
              placeholder="Ask: 'I have 200 guests' or 'budget'..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 text-slate-900"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white p-2.5 rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};

export default AIChatBot;