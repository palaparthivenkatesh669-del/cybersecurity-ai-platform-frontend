'use client';

import { ReactNode } from 'react';
import { useAuthStore, useDashboardStore, useAIStore } from '@/stores';

export function Providers({ children }: { children: ReactNode }) {
  // Initialize stores
  const { getUser } = useAuthStore();
  const { fetchMetrics } = useDashboardStore();
  const { getConversations } = useAIStore();

  return <>{children}</>;
}
