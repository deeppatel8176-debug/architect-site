"use client";

import { useStore } from "@/store/useStore";

export default function ModelLoader() {
  const isLoadingModel = useStore((s) => s.isLoadingModel);
  const modelProgress = useStore((s) => s.modelProgress);
  const currentVilla = useStore((s) => s.currentVilla);
  const modelError = useStore((s) => s.modelError);

  if (!isLoadingModel && !modelError) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none animate-in fade-in duration-300">
      <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/90 backdrop-blur-2xl border border-black/[0.08] shadow-xl text-neutral-900">
        <div className="w-4 h-4 rounded-full border-2 border-t-[#9c7442] border-r-transparent border-b-[#9c7442]/30 border-l-transparent animate-spin shrink-0" />
        <span className="text-xs font-serif text-neutral-900 tracking-wide font-medium">
          {modelError ? modelError : `Rendering ${currentVilla.name}`}
        </span>
        {!modelError && (
          <span className="text-[10px] font-mono text-[#9c7442] font-semibold">
            {modelProgress}%
          </span>
        )}
      </div>
    </div>
  );
}
