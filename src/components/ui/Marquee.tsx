import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
};

export function Marquee({ children, className, pauseOnHover = true }: MarqueeProps) {
  return (
    <div className={cn("mask-fade-x overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max animate-marquee items-center",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
