import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { SecurityMetrics, Alert, SecurityEvent, Threat } from '@/types';
import { securityApi } from '@/api';

interface DashboardState {
  metrics: SecurityMetrics | null;
  alerts: Alert[];
  events: SecurityEvent[];
  threats: Threat[];
  isLoading: boolean;
  error: string | null;
  fetchMetrics: () => Promise<void>;
  fetchAlerts: () => Promise<void>;
  fetchEvents: () => Promise<void>;
  fetchThreats: () => Promise<void>;
  updateAlert: (id: string, data: Partial<Alert>) => Promise<void>;
  clearError: () => void;
}

export const useDashboardStore = create<DashboardState>()(
  devtools((set) => ({
    metrics: null,
    alerts: [],
    events: [],
    threats: [],
    isLoading: false,
    error: null,

    fetchMetrics: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await securityApi.getMetrics();
        if (response.data) {
          set({ metrics: response.data as SecurityMetrics });
        }
      } catch (error: any) {
        set({ error: error.message || 'Failed to fetch metrics' });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchAlerts: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await securityApi.getAlerts();
        if (response.data?.data) {
          set({ alerts: response.data.data });
        }
      } catch (error: any) {
        set({ error: error.message || 'Failed to fetch alerts' });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchEvents: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await securityApi.getEvents();
        if (response.data?.data) {
          set({ events: response.data.data });
        }
      } catch (error: any) {
        set({ error: error.message || 'Failed to fetch events' });
      } finally {
        set({ isLoading: false });
      }
    },

    fetchThreats: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await securityApi.getThreats();
        if (response.data?.data) {
          set({ threats: response.data.data });
        }
      } catch (error: any) {
        set({ error: error.message || 'Failed to fetch threats' });
      } finally {
        set({ isLoading: false });
      }
    },

    updateAlert: async (id: string, data: Partial<Alert>) => {
      try {
        const response = await securityApi.updateAlert(id, data);
        if (response.data) {
          set((state) => ({
            alerts: state.alerts.map((alert) =>
              alert.id === id ? response.data : alert
            ),
          }));
        }
      } catch (error: any) {
        set({ error: error.message || 'Failed to update alert' });
      }
    },

    clearError: () => set({ error: null }),
  }))
);
