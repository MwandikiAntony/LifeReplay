// CameraContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useDeviceStore } from "@/lib/deviceStore";

interface CameraContextType {
  stream: MediaStream | null;
  brightness: number;
  setBrightness: (val: number) => void;
  contrast: number;
  setContrast: (val: number) => void;
}

const CameraContext = createContext<CameraContextType>({
  stream: null,
  brightness: 100,
  setBrightness: () => {},
  contrast: 100,
  setContrast: () => {},
});

export function CameraProvider({ children }: { children: React.ReactNode }) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  const setCameraActive = useDeviceStore.getState().setCameraActive;

  useEffect(() => {
    async function initCamera() {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(media);
        setCameraActive(true); // ✅ Signal camera is active
      } catch (err) {
        console.warn("Camera init failed:", err);
        setCameraActive(false); // ❌ Signal camera is inactive
      }
    }

    initCamera();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
      setCameraActive(false); // ✅ Stop signal when unmounted
    };
  }, []);

  return (
    <CameraContext.Provider
      value={{ stream, brightness, setBrightness, contrast, setContrast }}
    >
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  return useContext(CameraContext);
}