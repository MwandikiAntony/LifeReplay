import { useEffect, useRef } from "react";

export function useWebSocket(url: string) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("Connected to backend");
    };

    return () => {
      socketRef.current?.close();
    };
  }, [url]);

  const send = (data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(data);
    }
  };

  return { send };
}