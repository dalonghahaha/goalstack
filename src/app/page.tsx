"use client";

import { useState, useCallback } from "react";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { MatchFilter } from "@/components/match/MatchFilter";
import { MatchList } from "@/components/match/MatchList";
import { useMatches } from "@/hooks/useMatches";
import { MatchStatus, News } from "@/types";
import { mockNews } from "@/lib/mockData";
import Link from "next/link";

type DateFilter = "yesterday" | "today" | "tomorrow";

export default function HomePage() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");
  const [leagueId, setLeagueId] = useState("");
  const [status, setStatus] = useState<MatchStatus | "all">("all");

  // 计算日期
  const getDateString = (filter: DateFilter): string => {
    const now = new Date();
    const targetDate = new Date(now);

    if (filter === "yesterday") {
      targetDate.setDate(targetDate.getDate() - 1);
    } else if (filter === "tomorrow") {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    return targetDate.toISOString().split("T")[0];
  };

  const { matches, loading, error, refetch, currentPage, totalPages, hasMore, loadMore, goToPage } = useMatches({
    filter: {
      date: getDateString(dateFilter),
      leagueId: leagueId || undefined,
      status: status !== "all" ? status : undefined,
    },
    pageSize: 10,
    pagination: true,
  });

  const handleDateChange = useCallback((date: DateFilter) => {
    setDateFilter(date);
  }, []);

  const handleLeagueChange = useCallback((id: string) => {
    setLeagueId(id);
  }, []);

  const handleStatusChange = useCallback((s: MatchStatus | "all") => {
    setStatus(s);
  }, []);

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：比赛列表 */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            比赛中心
          </h1>

          {/* 筛选器 - HOME-02, HOME-03, HOME-04 */}
          <div className="mb-6">
            <MatchFilter
              dateFilter={dateFilter}
              leagueId={leagueId}
              status={status}
              onDateChange={handleDateChange}
              onLeagueChange={handleLeagueChange}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* 比赛列表 - HOME-01 */}
          <MatchList
            matches={matches}
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

        {/* 右侧：热门资讯 - HOME-07 */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>热门资讯</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNews.map((news) => (
                  <div
                    key={news.id}
                    className="border-b border-gray-100 pb-4 last:border-0 dark:border-gray-800"
                  >
                    <Link href={`/news/${news.id}`}>
                      <h4 className="font-medium hover:text-primary-500 cursor-pointer line-clamp-2">
                        {news.title}
                      </h4>
                    </Link>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
                      {news.summary}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {news.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}