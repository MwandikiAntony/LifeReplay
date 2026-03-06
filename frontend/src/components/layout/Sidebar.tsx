"use client";

import Link from "next/link";
import { Home, Video, BarChart2, Settings, LifeBuoy } from "lucide-react";
import { useState } from "react";

export default function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {

  const [mobileOpen, setMobileOpen] = useState(false);

  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, href: "/" },
    { name: "Live", icon: <Video size={20} />, href: "/live" },
    { name: "Metrics", icon: <BarChart2 size={20} />, href: "/metrics" },
    { name: "Settings", icon: <Settings size={20} />, href: "/settings" },
    { name: "Help", icon: <LifeBuoy size={20} />, href: "/help" },
  ];

  return (
    <>
      {/* MOBILE HAMBURGER */}
      <button
        className="fixed top-[72px] left-3 z-50 md:hidden bg-gray-700 text-white p-2 rounded"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>

      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-[64px] left-0
          h-[calc(100vh-64px)]
          bg-gray-800 flex flex-col p-2 overflow-y-auto
          z-40 transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${collapsed ? "md:w-20" : "md:w-48"}
          w-64
        `}
      >

        {/* DESKTOP COLLAPSE BUTTON */}
        <button
          className="hidden md:block text-gray-400 hover:text-white p-2 mb-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>

        {menu.map((item) => (
          <Link key={item.name} href={item.href}>
            <div
              className="flex items-center p-2 my-1 rounded hover:bg-gray-700 cursor-pointer transition"
              onClick={() => setMobileOpen(false)}
            >
              <div className="text-gray-300">{item.icon}</div>

              {!collapsed && (
                <span className="ml-3 text-gray-200">
                  {item.name}
                </span>
              )}
            </div>
          </Link>
        ))}

      </aside>
    </>
  );
}