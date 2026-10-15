import { cn } from "../../lib/utils";

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

export default function Text({
  children,
  className,
}: TextProps) {
  return (
    <p
      className={cn(
        "max-w-2xl text-base leading-8 text-white/70 md:text-lg",
        className
      )}
    >
      {children}
    </p>
  );
}