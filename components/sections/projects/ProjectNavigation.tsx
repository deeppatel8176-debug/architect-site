"use client";

interface ProjectNavigationProps {
  total: number;
  current: number;
}

export default function ProjectNavigation({
  total,
  current,
}: ProjectNavigationProps) {
  return (
    <div className="absolute right-10 top-1/2 z-50 -translate-y-1/2">
      <div className="flex flex-col gap-4">
        {Array.from({ length: total }).map((_, index) => {
          const active = current === index + 1;

          return (
            <div
              key={index}
              className={`
                relative
                h-3
                w-3
                rounded-full
                transition-all
                duration-500
                ${
                  active
                    ? "scale-125 bg-white"
                    : "bg-white/30 hover:bg-white/70"
                }
              `}
            >
              {active && (
                <span
                  className="
                    absolute
                    inset-0
                    animate-ping
                    rounded-full
                    bg-white/30
                  "
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}