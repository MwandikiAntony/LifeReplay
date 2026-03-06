"use client";

import { motion } from "framer-motion";

export default function FeedbackOverlay({ message }: { message: string }) {
  return (
    <motion.div
      key={message}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md p-2 sm:p-3 text-[12px] sm:text-sm max-w-xs sm:max-w-md mx-auto sm:mx-0"
    >
      💡 {message}
    </motion.div>
  );
}