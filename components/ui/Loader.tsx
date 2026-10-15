"use client";

import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const isLoading = useStore((state) => state.isLoading);
  const setIsLoading = useStore((state) => state.setIsLoading);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return p + Math.floor(Math.random() * 20) + 5; // Faster progress
      });
    }, 40); // Faster interval
    return () => clearInterval(interval);
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f6f1ec] text-[#2d2d2d]"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-4xl uppercase tracking-[0.2em] font-light mb-8">
              Galleries
            </h1>
            <div className="flex items-end text-sm">
              <span className="text-6xl font-light">{Math.min(progress, 100)}</span>
              <span className="ml-1 pb-2">%</span>
            </div>
            
            <div className="w-64 h-[1px] bg-gray-300 mt-8 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#2d2d2d]"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
