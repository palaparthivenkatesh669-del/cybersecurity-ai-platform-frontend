'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { getAuthToken } from '@/auth/storage';

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, error, login, register, logout, getUser } =
    useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthToken();
      if (token && !isAuthenticated) {
        await getUser();
      }
    };
    initAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      await register(firstName, lastName, email, password);
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
};
