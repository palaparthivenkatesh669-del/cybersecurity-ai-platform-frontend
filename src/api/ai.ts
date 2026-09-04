import { apiClient } from './client';
import { AIConversation, AIMessage, Prediction, AnomalyDetectionResult, ApiResponse } from '@/types';

const AI_ENDPOINTS = {
  CHAT: '/ai/chat',
  CONVERSATIONS: '/ai/conversations',
  PREDICT: '/ai/predict',
  ANOMALY: '/ai/anomaly',
  SEARCH: '/ai/search',
  STATUS: '/ai/status',
  INSIGHTS: '/ai/insights',
};

export const aiApi = {
  sendMessage: async (conversationId: string, message: string): Promise<ApiResponse<AIMessage>> => {
    const response = await apiClient.post<AIMessage>(AI_ENDPOINTS.CHAT, {
      conversationId,
      message,
    });
    return response.data;
  },

  getConversations: async (page?: number, pageSize?: number): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.get(AI_ENDPOINTS.CONVERSATIONS, {
      params: { page, pageSize },
    });
    return response.data;
  },

  getConversation: async (id: string): Promise<ApiResponse<AIConversation>> => {
    const response = await apiClient.get<AIConversation>(`${AI_ENDPOINTS.CONVERSATIONS}/${id}`);
    return response.data;
  },

  createConversation: async (title: string): Promise<ApiResponse<AIConversation>> => {
    const response = await apiClient.post<AIConversation>(AI_ENDPOINTS.CONVERSATIONS, { title });
    return response.data;
  },

  predict: async (features: Record<string, unknown>): Promise<ApiResponse<Prediction>> => {
    const response = await apiClient.post<Prediction>(AI_ENDPOINTS.PREDICT, features);
    return response.data;
  },

  detectAnomaly: async (data: Record<string, unknown>): Promise<ApiResponse<AnomalyDetectionResult>> => {
    const response = await apiClient.post<AnomalyDetectionResult>(AI_ENDPOINTS.ANOMALY, data);
    return response.data;
  },

  search: async (query: string): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.post(AI_ENDPOINTS.SEARCH, { query });
    return response.data;
  },

  getStatus: async (): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.get(AI_ENDPOINTS.STATUS);
    return response.data;
  },

  getInsights: async (): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.get(AI_ENDPOINTS.INSIGHTS);
    return response.data;
  },
};
