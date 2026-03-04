import "@/app/global.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/system/CommandPalette";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="pt-[64px] flex">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
        <CommandPalette/>
        <Footer />
      </body>
    </html>
  );
}