"use client";

import { useDeviceStore } from "@/lib/deviceStore";

export default function CameraSelector() {
  const cameras = useDeviceStore((s) => s.cameras);
  const selectedCamera = useDeviceStore((s) => s.selectedCamera);
  const setSelectedCamera = useDeviceStore((s) => s.setSelectedCamera);

  if (!cameras.length) return null;

  return (
    <div className="absolute top-4 left-4 z-20">
      <select
        value={selectedCamera ?? ""}
        onChange={(e) => setSelectedCamera(e.target.value)}
        className="bg-black/70 border border-[var(--border)] px-3 py-1 rounded text-xs font-mono"
      >
        {cameras.map((cam) => (
          <option key={cam.deviceId} value={cam.deviceId}>
            {cam.label}
          </option>
        ))}
      </select>
    </div>
  );
}