"use client";

import { useEffect, useRef } from "react";

export default function AudioWaveform({
  analyser,
}: {
  analyser: AnalyserNode | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Improve sharpness on high-DPI screens
    const dpr = window.devicePixelRatio || 1;
    const width = 200;
    const height = 60;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Responsive CSS sizing
    canvas.style.width = "calc(90vw)";
    canvas.style.maxWidth = "200px";
    canvas.style.height = "calc(10vh)";
    ctx.scale(dpr, dpr);

    analyser.fftSize = 1024;
    const buffer = new Uint8Array(analyser.fftSize);

    const draw = () => {
      analyser.getByteTimeDomainData(buffer);

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "#00e5ff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      buffer.forEach((v, i) => {
        const x = (i / buffer.length) * width;
        const y = (v / 255) * height;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });

      ctx.stroke();
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [analyser]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed bottom-6 left-2 sm:left-6 border border-[var(--border)] rounded bg-black/60 w-[90vw] sm:w-[200px] h-16 sm:h-16 max-w-[200px]"
    />
  );
}