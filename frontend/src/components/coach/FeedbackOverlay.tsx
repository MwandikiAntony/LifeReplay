"use client";

import { motion } from "framer-motion";

export default function FeedbackOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md p-3 text-sm"
    >
      💡 Slow down slightly — your clarity improves with pauses.
    </motion.div>
  );
}