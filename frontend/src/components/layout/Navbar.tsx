import { Bell, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center bg-gray-800 p-4 shadow-md">
      <h1 className="text-xl font-bold">LifeReplay</h1>
      <div className="flex items-center space-x-4">
        <Bell className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition" />
        <Settings className="w-6 h-6 cursor-pointer hover:text-yellow-400 transition" />
      </div>
    </header>
  );
}