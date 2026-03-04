"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[64px] z-50 flex items-center px-8 bg-[rgba(5,13,20,0.92)] backdrop-blur border-b border-[var(--border)]">
      <div className="flex items-center gap-3 mr-auto">
        <div className="w-9 h-9 rounded-full border border-[var(--cyan)]" />
        <span className="font-[var(--font-display)] text-xl tracking-widest">
          LIFE<span className="text-[var(--cyan)]">REPLAY</span>
        </span>
      </div>

      <ul className="flex gap-2 text-[11px] font-mono uppercase tracking-widest">
        {["Home", "Live", "Coach", "Metrics", "Settings"].map((item) => (
          <li
            key={item}
            className="px-3 py-1 rounded hover:bg-[var(--cyan-ghost)] hover:text-[var(--cyan)] transition"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="ml-6 flex items-center gap-3">
        <span className="text-green-400 text-xs">● LIVE</span>
        <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center font-bold">
          JD
        </div>
      </div>
    </nav>
  );
}