import { create } from "zustand";

type CameraDevice = {
  deviceId: string;
  label: string;
};

type ConnectionQuality = "good" | "medium" | "poor";

type DeviceState = {
  /* ---------- Device Activity ---------- */
  micActive: boolean;
  cameraActive: boolean;
  pipActive: boolean;

  /* ---------- Connection ---------- */
  connectionQuality: ConnectionQuality;

  setMicActive: (state: boolean) => void;
  setCameraActive: (state: boolean) => void;
  setPiPActive: (state: boolean) => void;
  setConnectionQuality: (quality: ConnectionQuality) => void;

  /* ---------- Camera Selection ---------- */
  cameras: CameraDevice[];
  selectedCamera: string | null;

  setCameras: (devices: CameraDevice[]) => void;
  setSelectedCamera: (id: string) => void;
};

export const useDeviceStore = create<DeviceState>((set) => ({
  /* ---------- Activity ---------- */
  micActive: false,
  cameraActive: false,
  pipActive: false,

  /* ---------- Connection ---------- */
  connectionQuality: "good",

  setMicActive: (state) => set({ micActive: state }),
  setCameraActive: (state) => set({ cameraActive: state }),
  setPiPActive: (state) => set({ pipActive: state }),
  setConnectionQuality: (quality) => set({ connectionQuality: quality }),

  /* ---------- Cameras ---------- */
  cameras: [],
  selectedCamera: null,

  setCameras: (devices) => set({ cameras: devices }),
  setSelectedCamera: (id) => set({ selectedCamera: id }),
}));