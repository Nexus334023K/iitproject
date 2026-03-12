import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  clearChat: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Neural Link established. I am NEXUS Core. How can I assist your credit analysis today?",
      timestamp: new Date()
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearChat = () => setMessages([]);

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearChat, isOpen, setIsOpen }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
