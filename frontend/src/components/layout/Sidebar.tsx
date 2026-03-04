import Link from "next/link";
import { Home, Video, BarChart2, Settings, LifeBuoy } from "lucide-react";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", icon: <Home />, href: "/" },
    { name: "Live", icon: <Video />, href: "/live" },
    { name: "Metrics", icon: <BarChart2 />, href: "/metrics" },
    { name: "Settings", icon: <Settings />, href: "/settings" },
    { name: "Help", icon: <LifeBuoy />, href: "/help" },
  ];

  return (
    <div className="w-20 md:w-60 bg-gray-800 flex flex-col p-2">
      {menu.map((item) => (
        <Link key={item.name} href={item.href}>
          <div className="flex items-center p-2 my-1 rounded hover:bg-gray-700 cursor-pointer transition">
            <div className="mr-2">{item.icon}</div>
            <span className="hidden md:block">{item.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}