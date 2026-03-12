import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Zap, 
  Info, 
  ExternalLink,
  ChevronRight,
  Minimize2
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useLocation, useNavigate } from 'react-router-dom';

const NeuralLink = () => {
  const { messages, addMessage, isOpen, setIsOpen } = useChat();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userQuery = inputValue;
    addMessage(userQuery, 'user');
    setInputValue('');
    setIsTyping(true);

    // Simulate AI Intelligence
    setTimeout(() => {
      let response = "";
      const query = userQuery.toLowerCase();

      if (query.includes('how') && query.includes('execute')) {
        response = "To execute a credit appraisal: 1. Upload your documents in the Data Room. 2. Navigate to the Appraisal Engine. 3. Select your sources and click 'Engage'.";
      } else if (query.includes('market') || query.includes('intelligence')) {
        response = "I've detected some volatility in the Financials sector. You should check the Real-time Sector Heatmap in the Market Intelligence hub for a deeper look.";
      } else if (query.includes('data room')) {
        response = "The Data Room is your secure document vault. You can upload GST, ITR, and Bank Statements there for cross-pillar verification.";
      } else {
        response = "Acknowledged. I'm analyzing your request through the NEXUS neural swarm. Is there a specific entity or sector you'd like me to deep-dive into?";
      }

      addMessage(response, 'assistant');
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            className="glass-panel"
            style={{ 
              width: '400px', 
              height: '600px', 
              display: 'flex', 
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(139, 92, 246, 0.2)',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}
          >
            {/* Header */}
            <div style={{ 
              padding: '1.5rem', 
              background: 'rgba(139, 92, 246, 0.1)', 
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ position: 'relative' }}>
                  <Zap size={24} color="var(--primary)" fill="var(--primary)" />
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--primary)', borderRadius: '50%', filter: 'blur(8px)' }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>NEXUS Neural Link</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: 6, height: 6, background: '#4ade80', borderRadius: '50%' }} />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Core Intelligence Active</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                  <Minimize2 size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                scrollBehavior: 'smooth'
              }}
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  style={{ 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%'
                  }}
                >
                  <div style={{ 
                    padding: '1rem', 
                    borderRadius: msg.role === 'user' ? '1.2rem 1.2rem 0 1.2rem' : '1.2rem 1.2rem 1.2rem 0',
                    background: msg.role === 'user' ? 'var(--grad-main)' : 'rgba(255,255,255,0.05)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--glass-border)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                    color: msg.role === 'user' ? 'white' : 'var(--text-main)'
                  }}>
                    {msg.content}
                  </div>
                  <p style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '0.4rem', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start' }}>
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div style={{ padding: '0 1rem 1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
              <SuggestionChip icon={<Info size={12}/>} text="How to execute?" onClick={() => setInputValue("How do I execute an appraisal?")} />
              <SuggestionChip icon={<Zap size={12}/>} text="Market Intel" onClick={() => setInputValue("What's the current market intelligence?")} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask NEXUS Core..."
                  style={{ 
                    width: '100%', 
                    padding: '0.8rem 3rem 0.8rem 1rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid var(--glass-border)', 
                    borderRadius: '0.8rem',
                    color: 'white',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
                <button 
                  onClick={handleSend}
                  style={{ 
                    position: 'absolute', 
                    right: '0.5rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    background: 'var(--primary)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            layoutId="neural-link-button"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '50%', 
              background: 'var(--grad-main)', 
              border: 'none', 
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'white', 
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Sparkles size={28} />
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 3 }}
              style={{ 
                position: 'absolute', 
                top: -5, right: -5, bottom: -5, left: -5, 
                border: '2px solid var(--primary)', 
                borderRadius: '50%' 
              }} 
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const SuggestionChip = ({ text, icon, onClick }: { text: string, icon: any, onClick: () => void }) => (
  <button 
    onClick={onClick}
    style={{ 
      padding: '0.4rem 0.8rem', 
      background: 'rgba(255,255,255,0.05)', 
      border: '1px solid var(--glass-border)', 
      borderRadius: '2rem', 
      fontSize: '0.75rem', 
      color: 'var(--text-dim)',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}
  >
    {icon}
    {text}
  </button>
);

export default NeuralLink;
