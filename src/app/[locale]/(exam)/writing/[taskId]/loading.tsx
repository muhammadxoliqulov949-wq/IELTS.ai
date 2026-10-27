import { Skeleton } from "@/components/ui/skeleton";

/** Instant shell while the exam route resolves its task. */
export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col bg-muted/30">
      <div className="h-14 border-b bg-background" />
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-4 p-4 sm:p-6 lg:grid-cols-[2fr_3fr]">
        <Skeleton className="h-80" />
        <Skeleton className="min-h-[60vh]" />
      </div>
    </div>
  );
}
