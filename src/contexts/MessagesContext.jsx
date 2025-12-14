
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockConversations } from './messagesConstants';


const MessagesContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

export const MessagesProvider = ({ children }) => {
  const [conversations, setConversations] = useState(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      return JSON.parse(savedConversations);
    } else {
      localStorage.setItem('conversations', JSON.stringify(mockConversations));
      return mockConversations;
    }
  });
  const [currentConversation, setCurrentConversation] = useState(null);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  const sendMessage = (conversationId, message, sender) => {
    const newMessage = {
      id: Date.now(),
      sender,
      message,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: message,
          timestamp: new Date().toISOString(),
          messages: [...conv.messages, newMessage],
          unreadCount: conv.unreadCount + 1
        };
      }
      return conv;
    }));
  };

  const markAsRead = (conversationId) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(msg => ({ ...msg, isRead: true }))
        };
      }
      return conv;
    }));
  };

  const startConversation = (productId, productTitle, seller, buyer) => {
    const existingConversation = conversations.find(
      conv => conv.productId === productId && conv.buyer === buyer
    );

    if (existingConversation) {
      setCurrentConversation(existingConversation.id);
      return existingConversation.id;
    }

    const newConversation = {
      id: Date.now(),
      productId,
      productTitle,
      seller,
      buyer,
      lastMessage: "",
      timestamp: new Date().toISOString(),
      unreadCount: 0,
      messages: []
    };

    setConversations(prev => [...prev, newConversation]);
    setCurrentConversation(newConversation.id);
    return newConversation.id;
  };

  const value = {
    conversations,
    currentConversation,
    setCurrentConversation,
    sendMessage,
    markAsRead,
    startConversation
  };

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};
