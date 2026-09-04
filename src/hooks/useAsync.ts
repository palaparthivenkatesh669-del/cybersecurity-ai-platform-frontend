'use client';

import { useState, useCallback } from 'react';

interface UseAsyncOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useAsync = <T, E = string>(
  asyncFunction: () => Promise<T>,
  options?: UseAsyncOptions
) => {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      options?.onSuccess?.(response);
      return response;
    } catch (error) {
      setError(error as E);
      setStatus('error');
      options?.onError?.(error);
      throw error;
    }
  }, [asyncFunction, options]);

  return { execute, status, data, error, isLoading: status === 'pending' };
};
