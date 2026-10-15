import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function SectionLabel({
  children,
  className,
}: Props) {
  return (
    <span
      className={cn(
        "block text-xs uppercase tracking-[0.45em] text-white/60",
        className
      )}
    >
      {children}
    </span>
  );
}