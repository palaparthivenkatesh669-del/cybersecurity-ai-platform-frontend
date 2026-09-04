import { apiClient } from './client';
import {
  User,
  AuthToken,
  LoginFormData,
  RegisterFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  ApiResponse,
} from '@/types';

const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ME: '/users/me',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
};

export const authApi = {
  login: async (data: LoginFormData): Promise<ApiResponse<AuthToken>> => {
    const response = await apiClient.post<AuthToken>(AUTH_ENDPOINTS.LOGIN, data);
    return response.data;
  },

  register: async (data: RegisterFormData): Promise<ApiResponse<AuthToken>> => {
    const response = await apiClient.post<AuthToken>(AUTH_ENDPOINTS.REGISTER, data);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<void>(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
  },

  refresh: async (): Promise<ApiResponse<AuthToken>> => {
    const response = await apiClient.post<AuthToken>(AUTH_ENDPOINTS.REFRESH);
    return response.data;
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<User>(AUTH_ENDPOINTS.ME);
    return response.data;
  },

  forgotPassword: async (data: ForgotPasswordFormData): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<void>(AUTH_ENDPOINTS.FORGOT_PASSWORD, data);
    return response.data;
  },

  resetPassword: async (data: ResetPasswordFormData): Promise<ApiResponse<void>> => {
    const response = await apiClient.post<void>(AUTH_ENDPOINTS.RESET_PASSWORD, data);
    return response.data;
  },
};
