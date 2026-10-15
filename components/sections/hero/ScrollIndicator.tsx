"use client";

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 md:px-12 xl:px-20">

        {/* Left */}
        <div className="flex items-center gap-5">

          <span className="text-[11px] uppercase tracking-[0.45em] text-white/60">
            Scroll
          </span>

          <div className="relative h-px w-20 overflow-hidden bg-white/20">

            <div className="absolute inset-y-0 left-0 w-8 animate-pulse bg-white" />

          </div>

        </div>

        {/* Right */}

        <div className="text-[11px] tracking-[0.35em] text-white/60">
          01 / 05
        </div>

      </div>
    </div>
  );
}