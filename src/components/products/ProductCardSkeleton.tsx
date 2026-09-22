import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
      <div className="space-y-2 pt-4">
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="h-4 w-3/4 rounded-full" />
        <Skeleton className="h-3 w-1/3 rounded-full" />
        <Skeleton className="h-4 w-1/2 rounded-full" />
      </div>
    </div>
  );
}
