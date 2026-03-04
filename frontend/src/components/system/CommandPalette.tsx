"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const commands = [
  { label: "Go Live", action: "/live" },
  { label: "View Metrics", action: "/metrics" },
  { label: "Settings", action: "/settings" },
  { label: "Help", action: "/help" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center">
      <div className="bg-[#060d14] w-96 rounded-xl border border-[var(--border)]">
        {commands.map((cmd) => (
          <button
            key={cmd.label}
            onClick={() => {
              router.push(cmd.action);
              setOpen(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-white/5"
          >
            {cmd.label}
          </button>
        ))}
      </div>
    </div>
  );
}