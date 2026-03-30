"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { NewsFilter } from "@/components/news/NewsFilter";
import { NewsList } from "@/components/news/NewsList";
import { useNews } from "@/hooks/useNews";
import { NewsFilter as NewsFilterType } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";

function NewsPageContent() {
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";

  const [filter, setFilter] = useState<NewsFilterType>({
    type: "all",
    leagueId: "",
    teamId: "",
    keyword: initialKeyword,
    page: 1,
    pageSize: 12,
  });

  const { news, loading, error, refetch, currentPage, totalPages, hasMore, loadMore, goToPage } = useNews({
    filter,
    pageSize: 12,
    pagination: true,
  });

  const handleTypeChange = useCallback((type: NewsFilterType["type"]) => {
    setFilter((prev) => ({ ...prev, type, page: 1 }));
  }, []);

  const handleLeagueChange = useCallback((leagueId: string) => {
    setFilter((prev) => ({ ...prev, leagueId, page: 1 }));
  }, []);

  const handleTeamChange = useCallback((teamId: string) => {
    setFilter((prev) => ({ ...prev, teamId, page: 1 }));
  }, []);

  // 处理 URL 参数变化
  useEffect(() => {
    const keyword = searchParams.get("keyword") || "";
    setFilter((prev) => {
      if (prev.keyword !== keyword) {
        return { ...prev, keyword, page: 1 };
      }
      return prev;
    });
  }, [searchParams]);

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          资讯中心
        </h1>
        <p className="text-gray-500 mt-1">
          最新的足球资讯、转会新闻和深度报道
        </p>
      </div>

      {/* 筛选器 */}
      <NewsFilter
        filter={filter}
        onTypeChange={handleTypeChange}
        onLeagueChange={handleLeagueChange}
        onTeamChange={handleTeamChange}
      />

      {/* 资讯列表 */}
      <NewsList
        news={news}
        loading={loading}
        error={error}
        onRetry={refetch}
        currentPage={currentPage}
        totalPages={totalPages}
        hasMore={hasMore}
        onPageChange={goToPage}
        onLoadMore={loadMore}
      />
    </div>
  );
}

function NewsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton width={200} height={32} className="mb-2" />
        <Skeleton width={300} height={20} />
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton width={60} height={32} />
          <Skeleton width={60} height={32} />
          <Skeleton width={60} height={32} />
          <Skeleton width={60} height={32} />
        </div>
        <Skeleton width={200} height={32} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800">
            <Skeleton height={160} className="rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton height={20} />
              <Skeleton height={16} width="80%" />
              <Skeleton height={16} width="60%" />
              <div className="flex gap-2 pt-2">
                <Skeleton width={50} height={20} />
                <Skeleton width={50} height={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NewsPage() {
  return (
    <Container className="py-8">
      <Suspense fallback={<NewsPageSkeleton />}>
        <NewsPageContent />
      </Suspense>
    </Container>
  );
}