import { type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  container?: boolean;
};

export function Section({ className, container = true, ...props }: SectionProps) {
  const inner = <section className={cn("relative", className)} {...props} />;
  return container ? (
    <Container className="px-0">{inner}</Container>
  ) : (
    inner
  );
}

export function SectionInner({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("container-site", className)} {...props} />;
}
