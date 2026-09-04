import Cookies from 'js-cookie';
import { STORAGE_KEYS } from '@/utils/constants';

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return Cookies.get(STORAGE_KEYS.AUTH_TOKEN) || null;
};

export const setAuthToken = (token: string, expiresIn?: number): void => {
  if (typeof window === 'undefined') return;
  Cookies.set(STORAGE_KEYS.AUTH_TOKEN, token, {
    expires: expiresIn ? expiresIn / (24 * 60 * 60 * 1000) : 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return Cookies.get(STORAGE_KEYS.REFRESH_TOKEN) || null;
};

export const setRefreshToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, token, {
    expires: 30,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  Cookies.remove(STORAGE_KEYS.AUTH_TOKEN);
  Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

export const getUserFromStorage = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const setUserInStorage = (user: any): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const removeUserFromStorage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.USER);
};
