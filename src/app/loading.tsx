import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="container-site space-y-12 pb-20 pt-32 md:pt-40">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-3 w-28 rounded-full" />
        <Skeleton className="h-10 w-72 rounded-full sm:h-12 sm:w-96" />
        <Skeleton className="h-4 w-64 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
            <Skeleton className="h-4 w-3/4 rounded-full" />
            <Skeleton className="h-3 w-1/2 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
