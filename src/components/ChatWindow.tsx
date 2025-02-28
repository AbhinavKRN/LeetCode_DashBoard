import React, { useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import { ChatWindowProps } from '../types';

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const LoadingIndicator = () => (
    <div className="flex justify-start mb-4">
      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
        <div className="w-5 h-5 rounded-full border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin"></div>
      </div>
      
      <div className="max-w-[85%] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        {messages.length === 1 && (
          <div className="text-center mb-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
              Welcome to LeetCode Assistant
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-lg mx-auto">
              I'll help you understand DSA problems without giving away solutions.
              Share a LeetCode URL and your specific question to get started.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">What I can do</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 text-left list-disc pl-4">
                  <li>Guide you with targeted hints</li>
                  <li>Suggest relevant data structures</li>
                  <li>Help identify pattern recognition</li>
                  <li>Provide step-by-step approaches</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">What I won't do</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 text-left list-disc pl-4">
                  <li>Give complete solutions</li>
                  <li>Solve the problem for you</li>
                  <li>Provide full working code</li>
                  <li>Do your homework directly</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {isLoading && <LoadingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;