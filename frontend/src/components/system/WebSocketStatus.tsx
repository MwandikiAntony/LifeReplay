"use client";

import { motion } from "framer-motion";

interface Props {
  status: string;
}

export default function WebSocketStatus({ status }: Props) {
  const getColor = () => {
    switch (status) {
      case "CONNECTED":
        return "bg-green-500";
      case "ERROR":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-6 left-6 z-50"
    >
      <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl shadow-xl">
        <span className={`w-3 h-3 rounded-full ${getColor()}`} />
        <span className="text-xs text-gray-300 tracking-wide">
          LifeReplay Stream: {status}
        </span>
      </div>
    </motion.div>
  );
}