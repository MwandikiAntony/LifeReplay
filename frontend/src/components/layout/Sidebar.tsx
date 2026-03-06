"use client";

import Link from "next/link";
import { Home, Video, BarChart2, Settings, LifeBuoy } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

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
        className="fixed top-[70px] left-3 z-50 md:hidden bg-gray-700 text-white p-2 rounded"
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
        fixed
        top-[64px]
        left-0
        h-[calc(100vh-64px)]
        bg-gray-800
        flex
        flex-col
        overflow-y-auto
        transition-all
        duration-300
        z-40
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${desktopCollapsed ? "md:w-[70px]" : "md:w-[190px]"}
        w-[190px]
      `}
      >
        {/* DESKTOP COLLAPSE BUTTON */}
        <button
          className="hidden md:flex items-center justify-center text-gray-400 hover:text-white p-3"
          onClick={() => setDesktopCollapsed(!desktopCollapsed)}
        >
          ☰
        </button>

        {/* MENU */}
        <div className="flex flex-col px-2">
          {menu.map((item) => (
            <Link key={item.name} href={item.href}>
              <div
                className="flex items-center gap-3 p-2 my-1 rounded hover:bg-gray-700 cursor-pointer transition"
                onClick={() => setMobileOpen(false)}
              >
                {/* ICON */}
                <div className="text-gray-300 flex justify-center w-6">
                  {item.icon}
                </div>

                {/* TEXT */}
                {!desktopCollapsed && (
                  <span className="text-gray-200 text-sm">{item.name}</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}