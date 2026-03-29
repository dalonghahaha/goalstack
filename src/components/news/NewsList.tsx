import { NewsCard } from "./NewsCard";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { News } from "@/types";

interface NewsListProps {
  news: News[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export function NewsList({ news, loading, error, onRetry }: NewsListProps) {
  // 加载状态
  if (loading) {
    return <ListSkeleton count={6} />;
  }

  // 错误状态
  if (error) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}