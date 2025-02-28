import { useState } from 'react'

import React from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import useChat from './hooks/useChat';

const App: React.FC = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header onClearChat={clearChat} />
      
      <ChatWindow 
        messages={messages} 
        isLoading={isLoading} 
      />
      
      <ChatInput 
        onSendMessage={sendMessage} 
        disabled={isLoading} 
      />
    </div>
  );
};

export default App;