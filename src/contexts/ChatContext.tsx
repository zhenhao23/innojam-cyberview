import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ChatResponse {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
  conversationId?: string;
  user: string;
}

interface WorkflowResult {
  title: string;
  description: string;
  image_link: string;
}

interface ChatContextType {
  responses: ChatResponse[];
  workflowResult: WorkflowResult | null;
  addResponse: (response: ChatResponse) => void;
  setWorkflowResult: (result: WorkflowResult) => void;
  getResponsesByUser: (user: string) => ChatResponse[];
  clearResponses: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [responses, setResponses] = useState<ChatResponse[]>([]);
  const [workflowResult, setWorkflowResult] = useState<WorkflowResult | null>(
    null
  );

  const addResponse = (response: ChatResponse) => {
    setResponses((prev) => [...prev, response]);
  };

  const getResponsesByUser = (user: string) => {
    return responses.filter((response) => response.user === user);
  };

  const clearResponses = () => {
    setResponses([]);
  };

  const value = {
    responses,
    workflowResult,
    addResponse,
    setWorkflowResult,
    getResponsesByUser,
    clearResponses,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export default ChatContext;
