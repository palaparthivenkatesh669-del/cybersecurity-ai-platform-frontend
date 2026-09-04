import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AIConversation, AIMessage } from '@/types';
import { aiApi } from '@/api';

interface AIState {
  currentConversation: AIConversation | null;
  conversations: AIConversation[];
  isLoading: boolean;
  isMessageLoading: boolean;
  error: string | null;
  createConversation: (title: string) => Promise<void>;
  getConversations: () => Promise<void>;
  selectConversation: (id: string) => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  clearError: () => void;
}

export const useAIStore = create<AIState>()(
  devtools((set, get) => ({
    currentConversation: null,
    conversations: [],
    isLoading: false,
    isMessageLoading: false,
    error: null,

    createConversation: async (title: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await aiApi.createConversation(title);
        if (response.data) {
          set((state) => ({
            conversations: [response.data, ...state.conversations],
            currentConversation: response.data,
          }));
        }
      } catch (error: any) {
        set({ error: error.message || 'Failed to create conversation' });
      } finally {
        set({ isLoading: false });
      }
    },

    getConversations: async () => {
      set({ isLoading: true, error: null });
      try {
        const response = await aiApi.getConversations();
        if (response.data?.data) {
          set({ conversations: response.data.data });
        }
      } catch (error: any) {
        set({ error: error.message || 'Failed to fetch conversations' });
      } finally {
        set({ isLoading: false });
      }
    },

    selectConversation: async (id: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await aiApi.getConversation(id);
        if (response.data) {
          set({ currentConversation: response.data });
        }
      } catch (error: any) {
        set({ error: error.message || 'Failed to load conversation' });
      } finally {
        set({ isLoading: false });
      }
    },

    sendMessage: async (message: string) => {
      set({ isMessageLoading: true, error: null });
      try {
        const conversationId = get().currentConversation?.id;
        if (!conversationId) {
          throw new Error('No conversation selected');
        }
        const response = await aiApi.sendMessage(conversationId, message);
        if (response.data) {
          set((state) => ({
            currentConversation: state.currentConversation
              ? {
                  ...state.currentConversation,
                  messages: [...state.currentConversation.messages, response.data],
                }
              : null,
          }));
        }
      } catch (error: any) {
        set({ error: error.message || 'Failed to send message' });
      } finally {
        set({ isMessageLoading: false });
      }
    },

    clearError: () => set({ error: null }),
  }))
);
