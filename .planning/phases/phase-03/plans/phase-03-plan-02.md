---
phase: phase-03
plan: 02
type: execute
wave: 2
depends_on:
  - phase-03-plan-01
files_modified:
  - src/app/news/page.tsx
  - src/components/news/NewsFilter.tsx
  - src/components/news/NewsCard.tsx
  - src/components/news/NewsList.tsx
autonomous: true
requirements:
  - NEWS-01
  - NEWS-02
  - NEWS-03
  - NEWS-04
  - COMM-01

must_haves:
  truths:
    - 用户可以浏览资讯列表
    - 用户可以按资讯类型筛选（全部/比赛/赛事/球队/球员）
    - 用户可以按联赛筛选资讯
    - 用户可以按球队筛选资讯
    - 用户可以点击资讯卡片进入详情页
    - 用户可以点击关联标签跳转到对应对象页
  artifacts:
    - path: "src/app/news/page.tsx"
      provides: "资讯中心列表页入口"
    - path: "src/components/news/NewsFilter.tsx"
      provides: "资讯筛选组件（类型、联赛、球队）"
    - path: "src/components/news/NewsCard.tsx"
      provides: "资讯卡片组件，支持点击跳转"
    - path: "src/components/news/NewsList.tsx"
      provides: "资讯列表组件，处理空状态和骨架屏"
  key_links:
    - from: "src/app/news/page.tsx"
      to: "src/components/news/NewsCard.tsx"
      via: "导入使用"
    - from: "src/components/news/NewsCard.tsx"
      to: "/news/[id]"
      via: "Next.js Link"
---

<objective>
创建资讯中心列表页，实现资讯筛选功能和列表展示。
</objective>

<context>
@.planning/phases/phase-03/plans/phase-03-plan-01.md

## 已有组件参考

- src/components/ui/Button.tsx - 按钮组件
- src/components/ui/Card.tsx - 卡片组件
- src/components/ui/Skeleton.tsx - 骨架屏组件
- src/components/ui/EmptyState.tsx - 空状态组件
- src/components/layout/Container.tsx - 容器组件

## 已有 Hooks 参考

- src/hooks/useNews.ts - useNews, useNewsDetail
- src/hooks/useMatches.ts - useMatches（用于获取球队列表）

## 数据类型参考

```typescript
// NewsFilter 类型
export interface NewsFilter {
  type?: "all" | "match" | "competition" | "team" | "player";
  leagueId?: string;
  teamId?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

// News 类型
export interface News {
  id: string;
  title: string;
  summary?: string;
  content: string;
  coverImage?: string;
  publishedAt: Date;
  source?: string;
  tags?: string[];
  relatedMatches?: Match[];
  relatedTeams?: Team[];
  relatedPlayers?: Player[];
}
```
</context>

<tasks>

<task type="auto">
  <name>Task 1: 创建 NewsFilter 资讯筛选组件</name>
  <files>src/components/news/NewsFilter.tsx</files>
  <action>
创建 src/components/news/NewsFilter.tsx：

```tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { NewsFilter, Team, League } from "@/types";
import { mockLeagues, mockTeams } from "@/lib/mockData";

interface NewsFilterProps {
  filter: NewsFilter;
  onTypeChange: (type: NewsFilter["type"]) => void;
  onLeagueChange: (leagueId: string) => void;
  onTeamChange: (teamId: string) => void;
}

export function NewsFilter({
  filter,
  onTypeChange,
  onLeagueChange,
  onTeamChange,
}: NewsFilterProps) {
  const [showLeagueDropdown, setShowLeagueDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  const selectedLeague = mockLeagues.find((l) => l.id === filter.leagueId);
  const selectedTeam = mockTeams.find((t) => t.id === filter.teamId);

  const newsTypes = [
    { value: "all", label: "全部" },
    { value: "match", label: "比赛" },
    { value: "team", label: "球队" },
    { value: "player", label: "球员" },
  ];

  return (
    <div className="space-y-4">
      {/* 资讯类型筛选 */}
      <div className="flex flex-wrap gap-2">
        {newsTypes.map((type) => (
          <Button
            key={type.value}
            variant={filter.type === type.value ? "primary" : "secondary"}
            size="sm"
            onClick={() => onTypeChange(type.value as NewsFilter["type"])}
          >
            {type.label}
          </Button>
        ))}
      </div>

      {/* 联赛和球队筛选 */}
      <div className="flex flex-wrap gap-2">
        {/* 联赛筛选下拉 */}
        <div className="relative">
          <Button
            variant={filter.leagueId ? "primary" : "secondary"}
            size="sm"
            onClick={() => setShowLeagueDropdown(!showLeagueDropdown)}
          >
            {selectedLeague ? selectedLeague.nameZh : "全部联赛"}
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>

          {showLeagueDropdown && (
            <div className="absolute z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  onLeagueChange("");
                  setShowLeagueDropdown(false);
                }}
              >
                全部联赛
              </button>
              {mockLeagues.map((league) => (
                <button
                  key={league.id}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    onLeagueChange(league.id);
                    setShowLeagueDropdown(false);
                  }}
                >
                  {league.nameZh}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 球队筛选下拉 */}
        <div className="relative">
          <Button
            variant={filter.teamId ? "primary" : "secondary"}
            size="sm"
            onClick={() => setShowTeamDropdown(!showTeamDropdown)}
          >
            {selectedTeam ? selectedTeam.nameZh : "全部球队"}
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>

          {showTeamDropdown && (
            <div className="absolute z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900 max-h-60 overflow-y-auto">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  onTeamChange("");
                  setShowTeamDropdown(false);
                }}
              >
                全部球队
              </button>
              {mockTeams.map((team) => (
                <button
                  key={team.id}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    onTeamChange(team.id);
                    setShowTeamDropdown(false);
                  }}
                >
                  {team.nameZh}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>NewsFilter 组件创建完成</done>
</task>

<task type="auto">
  <name>Task 2: 创建 NewsCard 资讯卡片组件</name>
  <files>src/components/news/NewsCard.tsx</files>
  <action>
创建 src/components/news/NewsCard.tsx：

```tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { News } from "@/types";

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Link href={`/news/${news.id}`}>
      <Card hover className="cursor-pointer h-full">
        {/* 封面图 */}
        {news.coverImage && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-gray-200 dark:bg-gray-800">
            <img
              src={news.coverImage}
              alt={news.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <CardContent className="p-4">
          {/* 标题 */}
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
            {news.title}
          </h3>

          {/* 摘要 */}
          {news.summary && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
              {news.summary}
            </p>
          )}

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-3">
            {news.tags?.map((tag) => (
              <Link
                key={tag}
                href={`/news?keyword=${encodeURIComponent(tag)}`}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* 底部信息 */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{news.source}</span>
            <span>{formatDate(news.publishedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>NewsCard 组件创建完成</done>
</task>

<task type="auto">
  <name>Task 3: 创建 NewsList 资讯列表组件</name>
  <files>src/components/news/NewsList.tsx</files>
  <action>
创建 src/components/news/NewsList.tsx：

```tsx
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
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>NewsList 组件创建完成</done>
</task>

<task type="auto">
  <name>Task 4: 创建资讯列表页</name>
  <files>src/app/news/page.tsx</files>
  <action>
创建 src/app/news/page.tsx：

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { NewsFilter } from "@/components/news/NewsFilter";
import { NewsList } from "@/components/news/NewsList";
import { useNews } from "@/hooks/useNews";
import { NewsFilter as NewsFilterType } from "@/types";

export default function NewsPage() {
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

  const { news, loading, error, refetch } = useNews(filter);

  const handleTypeChange = useCallback((type: NewsFilterType["type"]) => {
    setFilter((prev) => ({ ...prev, type, page: 1 }));
  }, []);

  const handleLeagueChange = useCallback((leagueId: string) => {
    setFilter((prev) => ({ ...prev, leagueId, page: 1 }));
  }, []);

  const handleTeamChange = useCallback((teamId: string) => {
    setFilter((prev) => ({ ...prev, teamId, page: 1 }));
  }, []);

  return (
    <Container className="py-8">
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

        {/* 筛选器 - NEWS-02, NEWS-03, NEWS-04 */}
        <NewsFilter
          filter={filter}
          onTypeChange={handleTypeChange}
          onLeagueChange={handleLeagueChange}
          onTeamChange={handleTeamChange}
        />

        {/* 资讯列表 - NEWS-01 */}
        <NewsList
          news={news}
          loading={loading}
          error={error}
          onRetry={refetch}
        />
      </div>
    </Container>
  );
}
```
  </action>
  <verify>
    <automated>npm run build 成功，/news 路由可正常访问</automated>
  </verify>
  <done>资讯列表页创建完成</done>
</task>

</tasks>

<verification>
- [ ] 用户可以浏览资讯列表（NEWS-01）
- [ ] 用户可以按资讯类型筛选（NEWS-02）
- [ ] 用户可以按联赛筛选资讯（NEWS-03）
- [ ] 用户可以按球队筛选资讯（NEWS-04）
- [ ] 用户可以点击资讯卡片进入详情页（COMM-01）
- [ ] 用户可以点击关联标签跳转（COMM-01）
</verification>

<success_criteria>
1. 资讯列表页展示完整资讯
2. 筛选功能正常工作（类型、联赛、球队）
3. 所有跳转链接正常工作
4. 骨架屏、空状态、错误状态处理完善
</success_criteria>

<output>
After completion, create `.planning/phases/phase-03/plans/phase-03-plan-02-SUMMARY.md`
</output>