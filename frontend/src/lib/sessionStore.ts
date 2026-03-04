import { create } from "zustand";

export type SessionState = "idle" | "live" | "paused";

interface SessionStore {
  state: SessionState;
  feedback: string | null;

  setState: (state: SessionState) => void;
  setFeedback: (message: string | null) => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  state: "idle",
  feedback: null,

  setState: (state) => set({ state }),
  setFeedback: (feedback) => set({ feedback }),
}));