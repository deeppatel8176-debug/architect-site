"use client";

import { useStore, FloorType } from "@/store/useStore";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloorSelector() {
  const currentFloor = useStore((state) => state.currentFloor);
  const setFloor = useStore((state) => state.setFloor);
  const [isOpen, setIsOpen] = useState(false);

  const floors: { id: FloorType; label: string }[] = [
    { id: "popup", label: "Pop-Up Window" },
    { id: "first", label: "First Floor" },
    { id: "ground", label: "Ground Floor" },
    { id: "underground", label: "Underground" },
  ];

  return (
    <div className="fixed bottom-8 left-16 md:left-24 z-40 text-white font-light tracking-widest uppercase text-sm">
      <div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-full mb-4 left-0 flex flex-col gap-4 bg-black/50 backdrop-blur-md p-4 border border-white/20 rounded-md"
            >
              {floors.map((floor) => (
                <button
                  key={floor.id}
                  onClick={() => {
                    setFloor(floor.id);
                    setIsOpen(false);
                  }}
                  className={`text-left hover:text-gray-300 transition-colors whitespace-nowrap ${currentFloor === floor.id ? 'italic text-gray-400' : ''}`}
                >
                  {floor.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-4 hover:opacity-70 transition-opacity"
        >
          <div className="w-10 h-10 border border-white/50 flex flex-col items-center justify-center rounded-full bg-black/30">
            <ChevronUp size={16} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
          </div>
          <span className="hidden md:block">
            {floors.find(f => f.id === currentFloor)?.label}
          </span>
        </button>
      </div>
    </div>
  );
}
