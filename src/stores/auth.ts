import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { User, AuthToken } from '@/types';
import { authApi } from '@/api';
import { setAuthToken, setRefreshToken, removeAuthToken, getAuthToken } from './storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  getUser: () => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null });
          try {
            const response = await authApi.login({ email, password, rememberMe: false });
            if (response.data) {
              const { accessToken, refreshToken } = response.data;
              setAuthToken(accessToken);
              setRefreshToken(refreshToken);
              set({ isAuthenticated: true });
              await get().getUser();
            }
          } catch (error: any) {
            set({ error: error.message || 'Login failed' });
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },

        register: async (firstName: string, lastName: string, email: string, password: string) => {
          set({ isLoading: true, error: null });
          try {
            const response = await authApi.register({ firstName, lastName, email, password, confirmPassword: password });
            if (response.data) {
              const { accessToken, refreshToken } = response.data;
              setAuthToken(accessToken);
              setRefreshToken(refreshToken);
              set({ isAuthenticated: true });
              await get().getUser();
            }
          } catch (error: any) {
            set({ error: error.message || 'Registration failed' });
            throw error;
          } finally {
            set({ isLoading: false });
          }
        },

        logout: async () => {
          set({ isLoading: true });
          try {
            await authApi.logout();
          } finally {
            removeAuthToken();
            set({ user: null, isAuthenticated: false, isLoading: false });
          }
        },

        refreshToken: async () => {
          try {
            const response = await authApi.refresh();
            if (response.data) {
              const { accessToken, refreshToken } = response.data;
              setAuthToken(accessToken);
              setRefreshToken(refreshToken);
            }
          } catch (error) {
            removeAuthToken();
            set({ user: null, isAuthenticated: false });
          }
        },

        getUser: async () => {
          try {
            const response = await authApi.getMe();
            if (response.data) {
              set({ user: response.data, isAuthenticated: true });
            }
          } catch (error: any) {
            set({ user: null, isAuthenticated: false });
          }
        },

        clearError: () => set({ error: null }),
        setUser: (user: User) => set({ user, isAuthenticated: true }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
