import React from 'react';
import { useMessages } from '../contexts/MessagesContext';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Messages = () => {
  const { conversations, currentConversation, setCurrentConversation } = useMessages();

  if (currentConversation) {
    // Show conversation view
    const conversation = conversations.find(c => c.id === currentConversation);
    if (!conversation) {
      return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-32 md:pb-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <button 
                onClick={() => setCurrentConversation(null)}
                className="p-2 hover:bg-white rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            </div>
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Conversation not found</h2>
              <button 
                onClick={() => setCurrentConversation(null)}
                className="text-primary hover:text-slate-800 font-medium"
              >
                Back to conversations
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 pt-20 pb-32 md:pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <button 
              onClick={() => setCurrentConversation(null)}
              className="p-2 hover:bg-white rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{conversation.productTitle}</h1>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Chat Feature Coming Soon</h3>
              <p className="text-gray-500 mb-6">
                This is a demo version. In the full app, you would be able to chat with sellers here.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-left">
                <h4 className="font-semibold text-gray-800 mb-2">Conversation Details:</h4>
                <p className="text-sm text-gray-600"><strong>Seller:</strong> {conversation.seller}</p>
                <p className="text-sm text-gray-600"><strong>Buyer:</strong> {conversation.buyer}</p>
                <p className="text-sm text-gray-600"><strong>Last Message:</strong> {conversation.lastMessage}</p>
                <p className="text-sm text-gray-600"><strong>Unread Messages:</strong> {conversation.unreadCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show conversations list
  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-32 md:pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/" className="p-2 hover:bg-white rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        </div>

        {conversations.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No messages yet</h2>
            <p className="text-gray-500 mb-8">Start a conversation with a seller to see messages here</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conversation) => (
              <div 
                key={conversation.id}
                onClick={() => setCurrentConversation(conversation.id)}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:border-primary transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.productTitle}
                      </h3>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-1">
                      <span className="font-medium">{conversation.seller}</span> • <span className="font-medium">{conversation.buyer}</span>
                    </p>
                    
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
