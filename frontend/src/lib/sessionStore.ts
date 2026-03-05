import { create } from "zustand";

export const useSessionStore = create((set) => ({
  transcript: [],

  addTranscript: (text: string) =>
    set((state: any) => ({
      transcript: [
        ...state.transcript,
        { text, time: Date.now() },
      ],
    })),
}));