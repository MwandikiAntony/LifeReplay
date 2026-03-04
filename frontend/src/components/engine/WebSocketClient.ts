import { useSessionStore } from "@/lib/sessionStore";

export function startMockWebSocket() {
  const { setState } = useSessionStore.getState();

  // Simulate connection lifecycle
  setTimeout(() => setState("live"), 1500);
  setTimeout(() => setState("paused"), 12000);
  setTimeout(() => setState("live"), 18000);
}