import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_VERSION } from '@/utils/constants';
import { AuthToken, ApiResponse } from '@/types';
import { getAuthToken, removeAuthToken, setAuthToken } from '@/auth/storage';

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<(token: string) => void> = [];

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/${API_VERSION}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ApiResponse>) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.failedQueue.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.client(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const response = await this.client.post<AuthToken>('/auth/refresh');
            const { accessToken } = response.data as unknown as AuthToken;
            setAuthToken(accessToken);
            this.failedQueue.forEach((callback) => callback(accessToken));
            this.failedQueue = [];
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            removeAuthToken();
            window.location.href = '/auth/login';
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public getClient() {
    return this.client;
  }

  public async get<T = unknown>(url: string, config?: any) {
    return this.client.get<ApiResponse<T>>(url, config);
  }

  public async post<T = unknown>(url: string, data?: any, config?: any) {
    return this.client.post<ApiResponse<T>>(url, data, config);
  }

  public async put<T = unknown>(url: string, data?: any, config?: any) {
    return this.client.put<ApiResponse<T>>(url, data, config);
  }

  public async patch<T = unknown>(url: string, data?: any, config?: any) {
    return this.client.patch<ApiResponse<T>>(url, data, config);
  }

  public async delete<T = unknown>(url: string, config?: any) {
    return this.client.delete<ApiResponse<T>>(url, config);
  }
}

export const apiClient = new ApiClient();
