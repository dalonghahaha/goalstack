import { useState, useEffect } from "react";
import { MatchCard } from "./MatchCard";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Pagination } from "@/components/ui/Pagination";
import { LoadMore } from "@/components/ui/LoadMore";
import { Match } from "@/types";

interface MatchListProps {
  matches: Match[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  currentPage?: number;
  totalPages?: number;
  hasMore?: boolean;
  onPageChange?: (page: number) => void;
  onLoadMore?: () => void;
}

export function MatchList({
  matches,
  loading,
  error,
  onRetry,
  currentPage = 1,
  totalPages = 0,
  hasMore = false,
  onPageChange,
  onLoadMore,
}: MatchListProps) {
  // 用于检测是否为移动端
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 加载状态
  if (loading && matches.length === 0) {
    return <ListSkeleton count={5} />;
  }

  // 错误状态
  if (error && matches.length === 0) {
    return (
      <ErrorState
        title="加载失败"
        description={error}
        onRetry={onRetry}
      />
    );
  }

  // 空状态
  if (matches.length === 0) {
    return (
      <EmptyState
        title="暂无比赛"
        description="当前筛选条件下没有比赛"
      />
    );
  }

  // 比赛列表
  return (
    <div>
      <div className="flex flex-col gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      {/* 分页/加载更多 - PC 端显示分页，移动端显示加载更多 */}
      <div className="mt-6">
        {isMobile ? (
          <LoadMore
            loading={loading}
            hasMore={hasMore}
            onLoadMore={onLoadMore || (() => {})}
            mode="click"
            buttonText="加载更多比赛"
            loadingText="加载中..."
            endText="没有更多比赛了"
          />
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || (() => {})}
          />
        )}
      </div>
    </div>
  );
}