import { apiClient } from './client';
import { SecurityEvent, Alert, Threat, Device, ApiResponse, PaginatedResponse } from '@/types';

const SECURITY_ENDPOINTS = {
  EVENTS: '/security/events',
  ALERTS: '/security/alerts',
  THREATS: '/security/threats',
  DEVICES: '/security/devices',
  METRICS: '/security/metrics',
  ANALYTICS: '/security/analytics',
};

export const securityApi = {
  getEvents: async (page?: number, pageSize?: number): Promise<ApiResponse<PaginatedResponse<SecurityEvent>>> => {
    const response = await apiClient.get<PaginatedResponse<SecurityEvent>>(
      SECURITY_ENDPOINTS.EVENTS,
      { params: { page, pageSize } }
    );
    return response.data;
  },

  getEvent: async (id: string): Promise<ApiResponse<SecurityEvent>> => {
    const response = await apiClient.get<SecurityEvent>(`${SECURITY_ENDPOINTS.EVENTS}/${id}`);
    return response.data;
  },

  getAlerts: async (page?: number, pageSize?: number): Promise<ApiResponse<PaginatedResponse<Alert>>> => {
    const response = await apiClient.get<PaginatedResponse<Alert>>(
      SECURITY_ENDPOINTS.ALERTS,
      { params: { page, pageSize } }
    );
    return response.data;
  },

  getAlert: async (id: string): Promise<ApiResponse<Alert>> => {
    const response = await apiClient.get<Alert>(`${SECURITY_ENDPOINTS.ALERTS}/${id}`);
    return response.data;
  },

  updateAlert: async (id: string, data: Partial<Alert>): Promise<ApiResponse<Alert>> => {
    const response = await apiClient.put<Alert>(`${SECURITY_ENDPOINTS.ALERTS}/${id}`, data);
    return response.data;
  },

  getThreats: async (page?: number, pageSize?: number): Promise<ApiResponse<PaginatedResponse<Threat>>> => {
    const response = await apiClient.get<PaginatedResponse<Threat>>(
      SECURITY_ENDPOINTS.THREATS,
      { params: { page, pageSize } }
    );
    return response.data;
  },

  getThreat: async (id: string): Promise<ApiResponse<Threat>> => {
    const response = await apiClient.get<Threat>(`${SECURITY_ENDPOINTS.THREATS}/${id}`);
    return response.data;
  },

  getDevices: async (page?: number, pageSize?: number): Promise<ApiResponse<PaginatedResponse<Device>>> => {
    const response = await apiClient.get<PaginatedResponse<Device>>(
      SECURITY_ENDPOINTS.DEVICES,
      { params: { page, pageSize } }
    );
    return response.data;
  },

  getDevice: async (id: string): Promise<ApiResponse<Device>> => {
    const response = await apiClient.get<Device>(`${SECURITY_ENDPOINTS.DEVICES}/${id}`);
    return response.data;
  },

  getMetrics: async (): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.get(SECURITY_ENDPOINTS.METRICS);
    return response.data;
  },

  getAnalytics: async (startDate?: string, endDate?: string): Promise<ApiResponse<unknown>> => {
    const response = await apiClient.get(SECURITY_ENDPOINTS.ANALYTICS, {
      params: { startDate, endDate },
    });
    return response.data;
  },
};
