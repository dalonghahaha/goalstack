import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export function Skeleton({ className, width, height, borderRadius }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
        className
      )}
      style={{
        width: width ?? "100%",
        height: height ?? "1rem",
        borderRadius: borderRadius ?? "0.375rem",
      }}
    />
  );
}

// 常用骨架屏组合
export function MatchCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton width={40} height={40} borderRadius="50%" />
          <Skeleton width={60} height={20} />
        </div>
        <Skeleton width={50} height={24} />
        <div className="flex items-center gap-3">
          <Skeleton width={60} height={20} />
          <Skeleton width={40} height={40} borderRadius="50%" />
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <Skeleton width={80} height={16} />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <MatchCardSkeleton key={i} />
      ))}
    </div>
  );
}