import { cn } from "../../lib/utils";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: "h1" | "h2" | "h3";
  size?: "hero" | "display" | "title";
}

export default function Heading({
  children,
  className,
  level = "h2",
  size = "display",
}: HeadingProps) {
  const Component = level;

  const sizes = {
    hero:
      "text-[54px] leading-[0.9] md:text-[82px] lg:text-[110px] xl:text-[140px]",
    display:
      "text-[42px] leading-[1] md:text-[64px] lg:text-[84px] xl:text-[110px]",
    title:
      "text-[28px] leading-tight md:text-[38px] lg:text-[48px]",
  };

  return (
    <Component
      className={cn(
        "font-extralight tracking-tight text-white",
        sizes[size],
        className
      )}
    >
      {children}
    </Component>
  );
}