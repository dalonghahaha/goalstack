---
phase: phase-02
plan: 02
type: execute
wave: 2
depends_on:
  - phase-02-plan-01
files_modified:
  - src/app/page.tsx
  - src/components/match/MatchCard.tsx
  - src/components/match/MatchFilter.tsx
  - src/components/match/MatchList.tsx
autonomous: true
requirements:
  - HOME-01
  - HOME-02
  - HOME-03
  - HOME-04
  - HOME-05
  - HOME-06
  - HOME-07
  - COMM-01

must_haves:
  truths:
    - 用户可以查看昨天/今天/明天比赛列表
    - 用户可以按日期筛选比赛
    - 用户可以按联赛筛选比赛
    - 用户可以按状态筛选比赛（全部/未开赛/进行中/已结束）
    - 用户可以点击比赛卡片进入比赛详情页
    - 用户可以点击联赛名称进入赛事详情页
  artifacts:
    - path: "src/app/page.tsx"
      provides: "比赛中心首页，整合筛选和列表组件"
    - path: "src/components/match/MatchCard.tsx"
      provides: "比赛卡片组件，支持点击跳转"
    - path: "src/components/match/MatchFilter.tsx"
      provides: "比赛筛选组件（日期、联赛、状态）"
    - path: "src/components/match/MatchList.tsx"
      provides: "比赛列表组件，处理空状态和骨架屏"
  key_links:
    - from: "src/app/page.tsx"
      to: "src/components/match/MatchCard.tsx"
      via: "导入使用"
    - from: "src/app/page.tsx"
      to: "src/components/match/MatchFilter.tsx"
      via: "导入使用"
    - from: "src/components/match/MatchCard.tsx"
      to: "/match/[id]"
      via: "Next.js Link"
---

<objective>
增强比赛中心（首页）功能，实现完整的比赛筛选（日期、联赛、状态）和双向跳转。
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-02/plans/phase-02-plan-01.md
@.planning/phases/phase-01/plans/phase-01-plan-02.md
@.planning/phases/phase-01/plans/phase-01-plan-03.md

## 已有组件参考

- src/components/ui/Button.tsx - 按钮组件
- src/components/ui/Card.tsx - 卡片组件
- src/components/ui/Skeleton.tsx - 骨架屏组件
- src/components/ui/EmptyState.tsx - 空状态组件
- src/components/layout/Container.tsx - 容器组件

## 已有 Hooks 参考

- src/hooks/useMatches.ts - useMatches, useMatchDetail

## 数据类型参考

来自 phase-02-plan-01:

```typescript
// MatchFilter 类型
export interface MatchFilter {
  date?: string;
  leagueId?: string;
  status?: MatchStatus;
}

// MatchStatus 类型
export type MatchStatus = "scheduled" | "live" | "finished" | "postponed" | "cancelled";

// 已有 mock 数据
export const mockLeagues: League[]
export const mockMatches: Match[]
export const mockNews: News[]
```
</context>

<tasks>

<task type="auto">
  <name>Task 1: 创建 MatchFilter 筛选组件</name>
  <files>src/components/match/MatchFilter.tsx</files>
  <action>
创建 src/components/match/MatchFilter.tsx:

```tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { League, MatchStatus } from "@/types";
import { mockLeagues } from "@/lib/mockData";

interface MatchFilterProps {
  dateFilter: "yesterday" | "today" | "tomorrow";
  leagueId: string;
  status: MatchStatus | "all";
  onDateChange: (date: "yesterday" | "today" | "tomorrow") => void;
  onLeagueChange: (leagueId: string) => void;
  onStatusChange: (status: MatchStatus | "all") => void;
}

export function MatchFilter({
  dateFilter,
  leagueId,
  status,
  onDateChange,
  onLeagueChange,
  onStatusChange,
}: MatchFilterProps) {
  const [showLeagueDropdown, setShowLeagueDropdown] = useState(false);

  const selectedLeague = mockLeagues.find((l) => l.id === leagueId);

  return (
    <div className="space-y-4">
      {/* 日期筛选 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={dateFilter === "yesterday" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onDateChange("yesterday")}
        >
          昨天
        </Button>
        <Button
          variant={dateFilter === "today" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onDateChange("today")}
        >
          今天
        </Button>
        <Button
          variant={dateFilter === "tomorrow" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onDateChange("tomorrow")}
        >
          明天
        </Button>
      </div>

      {/* 联赛和状态筛选 */}
      <div className="flex flex-wrap gap-2">
        {/* 联赛筛选下拉 */}
        <div className="relative">
          <Button
            variant={leagueId ? "primary" : "secondary"}
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

        {/* 状态筛选 */}
        <Button
          variant={status === "all" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onStatusChange("all")}
        >
          全部
        </Button>
        <Button
          variant={status === "scheduled" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onStatusChange("scheduled")}
        >
          未开赛
        </Button>
        <Button
          variant={status === "live" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onStatusChange("live")}
        >
          进行中
        </Button>
        <Button
          variant={status === "finished" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onStatusChange("finished")}
        >
          已结束
        </Button>
      </div>
    </div>
  );
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过，组件可正常导入</automated>
  </verify>
  <done>MatchFilter 筛选组件创建完成，支持日期、联赛、状态筛选</done>
</task>

<task type="auto">
  <name>Task 2: 创建 MatchCard 比赛卡片组件</name>
  <files>src/components/match/MatchCard.tsx</files>
  <action>
创建 src/components/match/MatchCard.tsx:

```tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Match } from "@/types";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  return (
    <Link href={`/match/${match.id}`}>
      <Card hover className="cursor-pointer">
        <CardContent className="flex items-center justify-between p-4">
          {/* 联赛信息 */}
          <div className="flex flex-col items-center justify-center w-20">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {match.league.nameZh}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {match.round}
            </span>
          </div>

          {/* 主队 */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
                <span className="text-xs font-medium">
                  {match.homeTeam.nameZh.slice(0, 2)}
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {match.homeTeam.nameZh}
              </span>
            </div>
          </div>

          {/* 比分/时间 */}
          <div className="flex flex-col items-center mx-4 min-w-[80px]">
            {match.status === "live" ? (
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary-500">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="text-xs text-red-500 font-medium">比赛中</span>
              </div>
            ) : match.status === "finished" ? (
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {match.homeScore} - {match.awayScore}
              </span>
              <span className="text-xs text-gray-400">已结束</span>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {formatTime(match.startTime)}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(match.startTime)}
                </span>
              </div>
            )}
          </div>

          {/* 客队 */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {match.awayTeam.nameZh}
              </span>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
                <span className="text-xs font-medium">
                  {match.awayTeam.nameZh.slice(0, 2)}
                </span>
              </div>
            </div>
          </div>

          {/* 赛事跳转 */}
          <div className="w-20 flex flex-col items-center">
            <Link
              href={`/competition/${match.league.id}`}
              className="text-xs text-primary-500 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {match.league.nameZh}
            </Link>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过，组件可正常导入</automated>
  </verify>
  <done>MatchCard 组件创建完成，支持点击进入比赛详情和联赛详情</done>
</task>

<task type="auto">
  <name>Task 3: 创建 MatchList 比赛列表组件</name>
  <files>src/components/match/MatchList.tsx</files>
  <action>
创建 src/components/match/MatchList.tsx:

```tsx
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
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过，组件可正常导入</automated>
  </verify>
  <done>MatchList 组件创建完成，集成骨架屏、空状态、错误状态</done>
</task>

<task type="auto">
  <name>Task 4: 更新首页集成筛选功能</name>
  <files>src/app/page.tsx</files>
  <action>
更新 src/app/page.tsx 集成完整的筛选和列表功能：

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
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

  const { matches, loading, error, refetch } = useMatches({
    filter: {
      date: getDateString(dateFilter),
      leagueId: leagueId || undefined,
      status: status !== "all" ? status : undefined,
    },
  });

  // 当筛选条件变化时重新获取数据
  useEffect(() => {
    refetch();
  }, [dateFilter, leagueId, status]);

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
```
  </action>
  <verify>
    <automated>npm run build 成功，首页可正常访问</automated>
  </verify>
  <done>首页更新完成，集成完整筛选功能和资讯侧边栏</done>
</task>

</tasks>

<verification>
- [ ] 用户可以查看昨天/今天/明天比赛列表（HOME-01, HOME-02）
- [ ] 用户可以按联赛筛选比赛（HOME-03）
- [ ] 用户可以按状态筛选比赛（HOME-04）
- [ ] 用户可以点击比赛卡片进入比赛详情页（HOME-05）
- [ ] 用户可以点击联赛名称进入赛事详情页（HOME-06, COMM-01）
- [ ] 用户可以浏览右侧热门资讯（HOME-07）
</verification>

<success_criteria>
1. 比赛中心首页展示昨天/今天/明天比赛
2. 支持按日期、联赛、状态筛选
3. 比赛卡片可点击跳转
4. 联赛名称可跳转赛事详情
5. 热门资讯展示在侧边栏
</success_criteria>

<output>
After completion, create `.planning/phases/phase-02/plans/phase-02-plan-02-SUMMARY.md`
</output>