import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ChatMessage, ChatRequest, ChatResponse } from '@/types';
import toast from 'react-hot-toast';

export function useChat() {
  const { token, user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    // Add user message to chat
    const userChatMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userChatMessage]);
    setIsLoading(true);

    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const requestBody: ChatRequest = {
        message: userMessage,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/agent/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data: ChatResponse = await response.json();

      // Add AI response to chat
      const aiChatMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiChatMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response from AI assistant');

      // Add error message to chat
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [token, user]);

  const clearHistory = useCallback(async () => {
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/agent/clear`, {
        method: 'POST',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to clear chat history');
      }

      setMessages([]);
      toast.success('Chat history cleared');
    } catch (error) {
      console.error('Error clearing history:', error);
      toast.error('Failed to clear chat history');
    }
  }, [token]);

  return {
    messages,
    isLoading,
    sendMessage,
    clearHistory,
  };
}
