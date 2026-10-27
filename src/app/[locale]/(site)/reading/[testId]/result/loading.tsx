import { Skeleton } from "@/components/ui/skeleton";

/** Instant shell while the result route resolves its test. */
export default function Loading() {
  return (
    <div className="container-page space-y-4 py-12">
      <Skeleton className="h-40" />
      <Skeleton className="h-96" />
    </div>
  );
}
