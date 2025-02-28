import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Link as LinkIcon } from 'lucide-react';
import { ChatInputProps } from '../types';

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  useEffect(() => {
    if (showUrlInput && urlInputRef.current) {
      urlInputRef.current.focus();
    }
  }, [showUrlInput]);

  const handleSendMessage = () => {
    if (!input.trim() || disabled) return;
    onSendMessage(input, url);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleUrlInput = () => {
    setShowUrlInput(!showUrlInput);
  };

  // Auto-resize textarea as user types
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <div className="max-w-3xl mx-auto">
        {showUrlInput && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 mb-3 flex items-center">
            <input
              ref={urlInputRef}
              type="text"
              placeholder="Paste LeetCode problem URL here (optional)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-600 dark:text-gray-300 outline-none placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        )}
        
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-2 flex flex-col">
            <textarea
              ref={inputRef}
              placeholder="Ask about your DSA problem..."
              value={input}
              onChange={handleTextAreaChange}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              rows={1}
              className="w-full bg-transparent resize-none text-gray-800 dark:text-gray-200 outline-none placeholder-gray-400 dark:placeholder-gray-500 min-h-[40px] max-h-[150px] py-2"
            />
            
            <div className="flex justify-between items-center">
              <button
                onClick={toggleUrlInput}
                className={`p-2 rounded-md ${
                  showUrlInput 
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' 
                    : 'text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                } transition-colors`}
                title="Add LeetCode URL"
              >
                <LinkIcon size={16} />
              </button>
              
              <small className="text-xs text-gray-400 dark:text-gray-500">
                {input.length > 0 ? `${input.length} characters` : 'Shift+Enter for new line'}
              </small>
            </div>
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || disabled}
            className={`rounded-full p-3 h-12 w-12 flex items-center justify-center ${
              input.trim() && !disabled
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            } transition-all duration-200 ease-in-out`}
            title="Send message"
          >
            <ArrowUp size={18} className={disabled ? 'animate-pulse' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;