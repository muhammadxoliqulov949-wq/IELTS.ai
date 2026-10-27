import { Skeleton } from "@/components/ui/skeleton";

/** Instant shell while the result route resolves its task. */
export default function Loading() {
  return (
    <div className="container-page space-y-4 py-12">
      <Skeleton className="h-40" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  );
}
