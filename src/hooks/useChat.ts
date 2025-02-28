import { useState, useCallback } from 'react';
import { getChatCompletion } from '../services/api';
import { Message, ApiMessage, UseChatReturn } from '../types';

const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm your LeetCode assistant. Share a problem URL and tell me what you're struggling with. I'll guide you toward a solution without giving it away directly.",
      timestamp: Date.now()
    }
  ]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [error, setError] = useState<string | null>(null);
  

  const sendMessage = useCallback(async (content: string, leetCodeUrl = ''): Promise<void> => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content,
      url: leetCodeUrl || null,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    setError(null);
    
    try {
      const apiMessages: ApiMessage[] = messages
        .concat(userMessage)
        .filter(msg => msg.role === 'user' || msg.role === 'assistant')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      const response = await getChatCompletion(apiMessages, leetCodeUrl);
      
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMessage);
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again or check your connection.',
          isError: true,
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);
 
  const clearChat = useCallback((): void => {
    setMessages([
      {
        id: Date.now(),
        role: 'assistant',
        content: "Hi! I'm your LeetCode assistant. Share a problem URL and tell me what you're struggling with. I'll guide you toward a solution without giving it away directly.",
        timestamp: Date.now()
      }
    ]);
    setError(null);
  }, []);
  
  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  };
};

export default useChat;