import { create } from "zustand";

interface Message {
  role: string;
  content: string;
}

interface ChatState {
  currentChatId: string | null;
  messages: Message[];

  setCurrentChatId: (id: string) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  currentChatId: null,
  messages: [],

  setCurrentChatId: (id) =>
    set({ currentChatId: id }),

  setMessages: (messages) =>
    set({ messages }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));