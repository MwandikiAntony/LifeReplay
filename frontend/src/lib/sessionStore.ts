import { create } from "zustand";

type TranscriptItem = {
  text: string;
  time: number;
};

type SessionState = {
  state: "idle" | "live";
  feedback: string | null;
  transcript: TranscriptItem[];

  setState: (s: "idle" | "live") => void;
  setFeedback: (msg: string) => void;
  addTranscript: (text: string) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  state: "idle",
  feedback: null,
  transcript: [],

  setState: (s) => set({ state: s }),

  setFeedback: (msg) =>
    set({
      feedback: msg,
    }),

  addTranscript: (text) =>
    set((state) => ({
      transcript: [
        ...state.transcript,
        { text, time: Date.now() },
      ],
    })),
}));