import { motion } from "framer-motion";

export default function FeedbackOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 p-4 rounded-lg shadow-lg w-full md:w-1/2"
    >
      <h3 className="text-lg font-bold mb-2">Feedback Overlay</h3>
      <ul className="space-y-1 text-yellow-400">
        <li>💡 Speak slower</li>
        <li>👀 Maintain eye contact</li>
        <li>🗣️ Clear pronunciation</li>
      </ul>
    </motion.div>
  );
}