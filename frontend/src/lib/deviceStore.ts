import { create } from "zustand"

export type CameraDevice = {
  deviceId: string
  label: string
}

type DeviceState = {
  cameras: CameraDevice[]
  selectedCamera: string | null
  setCameras: (devices: CameraDevice[]) => void
  setSelectedCamera: (deviceId: string) => void

  stream: MediaStream | null
  setStream: (stream: MediaStream | null) => void

  pipEnabled: boolean
  setPipEnabled: (value: boolean) => void

  connectionQuality: "good" | "medium" | "poor"
  setConnectionQuality: (q: "good" | "medium" | "poor") => void
}

export const useDeviceStore = create<DeviceState>((set) => ({
  cameras: [],
  selectedCamera: null,

  setCameras: (devices) => set({ cameras: devices }),
  setSelectedCamera: (deviceId) => set({ selectedCamera: deviceId }),

  stream: null,
  setStream: (stream) => set({ stream }),

  pipEnabled: false,
  setPipEnabled: (v) => set({ pipEnabled: v }),

  connectionQuality: "good",
  setConnectionQuality: (q) => set({ connectionQuality: q }),
}))