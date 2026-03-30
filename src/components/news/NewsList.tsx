import { useState, useEffect } from "react";
import { NewsCard } from "./NewsCard";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Pagination } from "@/components/ui/Pagination";
import { LoadMore } from "@/components/ui/LoadMore";
import { News } from "@/types";

interface NewsListProps {
  news: News[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  currentPage?: number;
  totalPages?: number;
  hasMore?: boolean;
  onPageChange?: (page: number) => void;
  onLoadMore?: () => void;
}

export function NewsList({
  news,
  loading,
  error,
  onRetry,
  currentPage = 1,
  totalPages = 0,
  hasMore = false,
  onPageChange,
  onLoadMore,
}: NewsListProps) {
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
  if (loading && news.length === 0) {
    return <ListSkeleton count={6} />;
  }

  // 错误状态
  if (error && news.length === 0) {
    return (
      <ErrorState
        title="加载失败"
        description={error}
        onRetry={onRetry}
      />
    );
  }

  // 空状态
  if (news.length === 0) {
    return (
      <EmptyState
        title="暂无资讯"
        description="当前筛选条件下没有资讯"
      />
    );
  }

  // 资讯列表
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item) => (
          <NewsCard key={item.id} news={item} />
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
            buttonText="加载更多资讯"
            loadingText="加载中..."
            endText="没有更多资讯了"
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