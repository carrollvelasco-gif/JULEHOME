import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Container = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  function Container({ className, ...props }, ref) {
    return <div ref={ref} className={cn("container-site", className)} {...props} />;
  },
);
