"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Day({ day }: { day: Date }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-center cursor-pointer"
    >
      {format(day, "d")}
    </motion.div>
  );
}