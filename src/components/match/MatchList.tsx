import { MatchCard } from "./MatchCard";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Match } from "@/types";

interface MatchListProps {
  matches: Match[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export function MatchList({ matches, loading, error, onRetry }: MatchListProps) {
  // 加载状态
  if (loading) {
    return <ListSkeleton count={5} />;
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
    <div className="space-y-3">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
}