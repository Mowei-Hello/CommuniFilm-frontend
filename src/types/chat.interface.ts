export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}

export interface ChatStatusResponse {
  status: string;
  activeUsers: number;
  healthy: boolean;
}
