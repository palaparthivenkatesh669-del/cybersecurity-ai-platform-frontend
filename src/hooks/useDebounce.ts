'use client';

import { useEffect, useState } from 'react';

interface UseDebounceOptions {
  delay?: number;
}

export const useDebounce = <T,>(
  value: T,
  options: UseDebounceOptions = { delay: 500 }
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, options.delay);

    return () => clearTimeout(handler);
  }, [value, options.delay]);

  return debouncedValue;
};
