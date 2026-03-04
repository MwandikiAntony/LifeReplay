import { create } from "zustand";

type DeviceState = {
  micActive: boolean;
  cameraActive: boolean;
  pipActive: boolean;
  connectionQuality: "good" | "medium" | "poor";
  setMic: (v: boolean) => void;
  setCamera: (v: boolean) => void;
  setPiP: (v: boolean) => void;
  setConnection: (v: "good" | "medium" | "poor") => void;
};

export const useDeviceStore = create<DeviceState>((set) => ({
  micActive: false,
  cameraActive: false,
  pipActive: false,
  connectionQuality: "good",
  setMic: (v) => set({ micActive: v }),
  setCamera: (v) => set({ cameraActive: v }),
  setPiP: (v) => set({ pipActive: v }),
  setConnection: (v) => set({ connectionQuality: v }),
}));