"use client";

import { useState } from "react";
import "@/app/global.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/system/CommandPalette";
import { CameraProvider } from "@/components/hud/CameraContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <html lang="en">
      <body>
        <CameraProvider>

          <Navbar />

          <div className="flex pt-[64px]">

            <Sidebar
              collapsed={sidebarCollapsed}
              setCollapsed={setSidebarCollapsed}
            />

            <main
              className={`flex-1 p-4 transition-all duration-300
              ${sidebarCollapsed ? "md:ml-20" : "md:ml-48"}`}
            >
              {children}
            </main>

          </div>

          <CommandPalette />
          <Footer />

        </CameraProvider>
      </body>
    </html>
  );
}