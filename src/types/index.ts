export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: number;
  role: MessageRole;
  content: string;
  url?: string | null;
  isError?: boolean;
  timestamp?: number;
}

export interface ApiMessage {
  role: MessageRole;
  content: string;
}

export interface ChatBubbleProps {
  message: Message;
}

export interface ChatInputProps {
  onSendMessage: (content: string, url: string) => void;
  disabled: boolean;
}

export interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export interface HeaderProps {
  onClearChat: () => void;
}

export interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string, leetCodeUrl?: string) => Promise<void>;
  clearChat: () => void;
}

export interface DeepseekResponse {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface PromptContext {
  [key: string]: string;
}

export type ProblemSolvingStage = 
  | 'UNDERSTAND_PROBLEM'
  | 'DATA_STRUCTURE_GUIDANCE'
  | 'ALGORITHM_PATTERNS'
  | 'STEP_BY_STEP_APPROACH'
  | 'PROGRESSIVE_HINTS'
  | 'COMPLEXITY_ANALYSIS'
  | 'RELATED_PROBLEMS';