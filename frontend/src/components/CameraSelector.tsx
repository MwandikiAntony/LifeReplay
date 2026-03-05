"use client"

import { useEffect } from "react"
import { getCameraDevices } from "@/lib/getMediaDevice"
import { useDeviceStore } from "@/lib/deviceStore"

export default function CameraSelector() {
  const cameras = useDeviceStore((s) => s.cameras)
  const setCameras = useDeviceStore((s) => s.setCameras)

  const selectedCamera = useDeviceStore((s) => s.selectedCamera)
  const setSelectedCamera = useDeviceStore((s) => s.setSelectedCamera)

  useEffect(() => {
    async function loadDevices() {
      const devices = await getCameraDevices()

      setCameras(devices)

      if (devices.length > 0 && !selectedCamera) {
        setSelectedCamera(devices[0].deviceId)
      }
    }

    loadDevices()
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-cyan-400 font-mono">
        Camera Source
      </label>

      <select
        value={selectedCamera ?? ""}
        onChange={(e) => setSelectedCamera(e.target.value)}
        className="bg-slate-900 border border-cyan-700 rounded-md p-2 text-sm"
      >
        {cameras.map((cam) => (
          <option key={cam.deviceId} value={cam.deviceId}>
            {cam.label}
          </option>
        ))}
      </select>
    </div>
  )
}