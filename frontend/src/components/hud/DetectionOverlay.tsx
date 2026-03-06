"use client";

export default function DetectionOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">

      {/* FACE DETECTOR FRAME */}
        <div
            className="
            absolute
            top-[18%] sm:top-[20%] md:top-[22%]
            left-1/2 -translate-x-1/2
            w-[85vw] sm:w-[65vw] md:w-[420px]
            h-[60vw] sm:h-[45vw] md:h-[380px]
            max-w-[420px]
            border border-[var(--cyan)]
            rounded-xl
            opacity-80
            overflow-hidden
            pointer-events-none
            z-10
          "
          >

        {/* Scanner animation */}
        <div className="ai-scan-line"></div>

        {/* Corner brackets */}
        <div className="ai-corner tl"></div>
        <div className="ai-corner tr"></div>
        <div className="ai-corner bl"></div>
        <div className="ai-corner br"></div>

        {/* AI Pulse */}
        <div className="ai-pulse"></div>

      </div>


      {/* AI STATUS HUD (moved lower so it doesn't hide LIVE) */}
      <div className="
        absolute 
        top-12 sm:top-16
        left-2 sm:left-6
        bg-[var(--bg-card)]
        border border-[var(--border)]
        rounded
        px-3 sm:px-4
        py-1.5 sm:py-2
        text-[10px] sm:text-xs
        font-mono
        tracking-widest
        text-[var(--cyan)]
        backdrop-blur-md
        shadow-[0_0_15px_var(--cyan-glow)]
      ">
        AI VISION • GAZE • POSTURE • VOICE
      </div>

    </div>
  );
}