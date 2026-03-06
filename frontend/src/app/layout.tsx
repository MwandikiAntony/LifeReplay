import "@/app/global.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/system/CommandPalette";
import { CameraProvider } from "@/components/hud/CameraContext"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CameraProvider>
        <Navbar />
        <div className="pt-[64px] flex">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
        <CommandPalette/>
        <Footer />
        </CameraProvider>
      </body>
    </html>
  );
}