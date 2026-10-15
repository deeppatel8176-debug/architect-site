"use client";

interface Props {
  current: number;
  total: number;
}

export default function ProjectCounter({
  current,
  total,
}: Props) {
  return (
    <div className="absolute bottom-12 right-12 z-40">

      <div className="flex items-end gap-3">

        <span
          className="
            text-[48px]
            md:text-[64px]
            font-extralight
            tracking-[-0.05em]
            text-white
            tabular-nums
          "
        >
          {String(current).padStart(2, "0")}
        </span>

        <span className="pb-2 text-white/40 text-xl">
          /
        </span>

        <span
          className="
            pb-2
            text-white/50
            text-xl
            tracking-[0.3em]
            tabular-nums
          "
        >
          {String(total).padStart(2, "0")}
        </span>

      </div>

    </div>
  );
}