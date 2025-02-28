import React from 'react';
import { ExternalLink, User, Bot } from 'lucide-react';
import { ChatBubbleProps } from '../types';

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const formattedTime = message.timestamp 
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';
    
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
            <Bot size={16} className="text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[85%] rounded-2xl p-4 ${
        isUser 
          ? 'bg-indigo-600 text-white shadow-sm' 
          : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 shadow-sm'
      }`}>
        {message.url && (
          <div className="mb-2 text-xs flex items-center gap-1 opacity-80">
            <ExternalLink size={12} />
            <a 
              href={message.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:opacity-100 transition-opacity"
            >
              {message.url}
            </a>
          </div>
        )}
        
        <div className="whitespace-pre-wrap">
          {message.content}
        </div>
        
        {formattedTime && (
          <div className={`text-xs mt-2 text-right ${
            isUser ? 'text-indigo-200' : 'text-gray-400 dark:text-gray-500'
          }`}>
            {formattedTime}
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 ml-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;