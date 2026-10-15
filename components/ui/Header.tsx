"use client";

import { useStore } from "@/store/useStore";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const isMenuOpen = useStore((state) => state.isMenuOpen);
  const setMenuOpen = useStore((state) => state.setMenuOpen);

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 text-white mix-blend-difference">
        <div className="text-xl font-light uppercase tracking-widest cursor-pointer">
          Galleries
        </div>
        
        <button 
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <span className="uppercase text-sm tracking-widest hidden md:block">Menu</span>
          <Menu size={24} />
        </button>
      </header>

      {/* Navigation Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-50 bg-[#f6f1ec] text-[#2d2d2d] flex flex-col p-6"
          >
            <div className="flex justify-between items-center">
              <div className="text-xl font-light uppercase tracking-widest cursor-pointer">
                Galleries
              </div>
              <button 
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <span className="uppercase text-sm tracking-widest hidden md:block">Close</span>
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center items-center gap-8">
              {['Homepage', 'Events', 'Our Values', 'Company', 'Virtual Tour'].map((item, i) => (
                <motion.a 
                  key={item}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                  className="text-4xl md:text-6xl font-light uppercase tracking-widest hover:italic transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
