import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AskResult, ChatMessage } from "../types";

interface ChatState {
  messages: ChatMessage[];
  addMessage: (question: string, result: AskResult) => void;
  clearHistory: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (question, result) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              ...result,
              id: crypto.randomUUID(),
              question,
              askedAt: Date.now(),
            },
          ],
        })),
      clearHistory: () => set({ messages: [] }),
    }),
    {
      name: "bonaire-bites-chat-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
