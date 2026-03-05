export type CameraDevice = {
  deviceId: string
  label: string
}

export async function getCameraDevices(): Promise<CameraDevice[]> {
  const devices = await navigator.mediaDevices.enumerateDevices()

  const cameras = devices
    .filter((device) => device.kind === "videoinput")
    .map((device) => ({
      deviceId: device.deviceId,
      label: device.label || `Camera ${device.deviceId.slice(0, 4)}`,
    }))

  return cameras
}