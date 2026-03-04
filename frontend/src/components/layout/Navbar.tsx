"use client";

type SessionState = "idle" | "live" | "paused";

function SessionIndicator({ state }: { state: SessionState }) {
  const styles: Record<SessionState, string> = {
    idle: "text-gray-400",
    live: "text-green-400",
    paused: "text-amber-400",
  };

  return (
    <span className={`text-xs font-mono uppercase tracking-widest ${styles[state]}`}>
      ● {state}
    </span>
  );
}

export default function Navbar() {
  // 🔌 later this comes from WebSocket / store
  const sessionState: SessionState = "idle";

  return (
    <nav className="fixed top-0 left-0 right-0 h-[64px] z-50 flex items-center px-8 bg-[rgba(5,13,20,0.92)] backdrop-blur border-b border-[var(--border)]">
      {/* Logo */}
      <div className="flex items-center gap-3 mr-auto">
        <div className="w-9 h-9 rounded-full border border-[var(--cyan)]" />
        <span className="font-[var(--font-display)] text-xl tracking-widest">
          LIFE<span className="text-[var(--cyan)]">REPLAY</span>
        </span>
      </div>

      {/* Navigation */}
      <ul className="flex gap-2 text-[11px] font-mono uppercase tracking-widest">
        {["Home", "Live", "Coach", "Metrics", "Settings"].map((item) => (
          <li
            key={item}
            className="px-3 py-1 rounded hover:bg-[var(--cyan-ghost)] hover:text-[var(--cyan)] transition cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Status + User */}
      <div className="ml-6 flex items-center gap-4">
        <SessionIndicator state={sessionState} />

        <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black">
          JD
        </div>
      </div>
    </nav>
  );
}