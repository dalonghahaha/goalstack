---
phase: phase-02
plan: 03
type: execute
wave: 2
depends_on:
  - phase-02-plan-01
files_modified:
  - src/app/match/[id]/page.tsx
  - src/components/match/MatchHeader.tsx
  - src/components/match/MatchStats.tsx
  - src/components/match/MatchEvents.tsx
  - src/components/match/MatchLineup.tsx
autonomous: true
requirements:
  - MATCH-01
  - MATCH-02
  - MATCH-03
  - MATCH-04
  - MATCH-05
  - MATCH-06
  - MATCH-07
  - MATCH-08
  - MATCH-09
  - COMM-01

must_haves:
  truths:
    - 用户可以查看比赛基本信息（联赛、轮次、时间、场地）
    - 用户可以查看实时比分和比赛状态
    - 用户可以查看比赛详细统计数据
    - 用户可以查看比赛事件时间轴
    - 用户可以查看双方首发和替补阵容
    - 用户可以点击球员名进入球员详情页
    - 用户可以点击球队名进入球队详情页
    - 用户可以点击联赛名进入赛事详情页
  artifacts:
    - path: "src/app/match/[id]/page.tsx"
      provides: "比赛详情页入口"
    - path: "src/components/match/MatchHeader.tsx"
      provides: "比赛头部信息（比分、状态、球队）"
    - path: "src/components/match/MatchStats.tsx"
      provides: "比赛统计数据展示"
    - path: "src/components/match/MatchEvents.tsx"
      provides: "比赛事件时间轴"
    - path: "src/components/match/MatchLineup.tsx"
      provides: "比赛阵容展示"
  key_links:
    - from: "src/app/match/[id]/page.tsx"
      to: "src/components/match/MatchHeader.tsx"
      via: "导入使用"
    - from: "src/app/match/[id]/page.tsx"
      to: "src/components/match/MatchStats.tsx"
      via: "导入使用"
    - from: "src/components/match/MatchHeader.tsx"
      to: "/team/[id]"
      via: "Next.js Link"
    - from: "src/components/match/MatchHeader.tsx"
      to: "/competition/[id]"
      via: "Next.js Link"
---

<objective>
创建比赛详情页，展示比赛基本信息、实时比分、统计数据、事件时间轴和阵容。
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-02/plans/phase-02-plan-01.md
@.planning/phases/phase-02/plans/phase-02-plan-02.md

## 数据类型参考

来自 phase-02-plan-01:

```typescript
// 比赛详情包含的数据
interface MatchDetail {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  startTime: Date;
  league: League;
  venue?: string;
  round?: string;
  stats: MatchStats;
  events: MatchEvent[];
  lineups: {
    home: Lineup;
    away: Lineup;
  };
}

// MatchStats
interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
  offsides: { home: number; away: number };
  passes: { home: number; away: number };
  passAccuracy: { home: number; away: number };
}

// MatchEvent
interface MatchEvent {
  id: string;
  type: MatchEventType;
  minute: number;
  player?: Player;
  assistPlayer?: Player;
  team: Team;
  detail?: string;
}

// Lineup
interface Lineup {
  formation: string;
  players: LineupPlayer[];
  substitutes: LineupPlayer[];
  coach?: string;
}
```

## 已有组件参考

- src/components/ui/Card.tsx - 卡片组件
- src/components/ui/Tabs.tsx - 如果存在则使用
</context>

<tasks>

<task type="auto">
  <name>Task 1: 创建 MatchHeader 比赛头部组件</name>
  <files>src/components/match/MatchHeader.tsx</files>
  <action>
创建 src/components/match/MatchHeader.tsx:

```tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Match } from "@/types";

interface MatchHeaderProps {
  match: Match & {
    stats?: unknown;
    events?: unknown;
    lineups?: unknown;
  };
}

export function MatchHeader({ match }: MatchHeaderProps) {
  const formatDateTime = (date: Date) => {
    const d = new Date(date);
    return {
      date: d.toLocaleDateString("zh-CN", { month: "short", day: "numeric", weekday: "short" }),
      time: d.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const { date, time } = formatDateTime(match.startTime);

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "比赛中";
      case "finished":
        return "已结束";
      case "scheduled":
        return "未开赛";
      case "postponed":
        return "推迟";
      case "cancelled":
        return "取消";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* 联赛和轮次 - MATCH-01 */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <Link
            href={`/competition/${match.league.id}`}
            className="text-primary-500 hover:underline text-sm"
          >
            {match.league.nameZh}
          </Link>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-500">{match.round}</span>
        </div>

        {/* 球队和比分 - MATCH-02 */}
        <div className="flex items-center justify-between">
          {/* 主队 - MATCH-07 */}
          <div className="flex flex-col items-center flex-1">
            <Link href={`/team/${match.homeTeam.id}`} className="group">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2 group-hover:bg-primary-100 dark:bg-gray-800">
                <span className="text-lg font-medium">
                  {match.homeTeam.nameZh.slice(0, 2)}
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-500">
                {match.homeTeam.nameZh}
              </span>
            </Link>
          </div>

          {/* 比分 */}
          <div className="flex flex-col items-center mx-4">
            {match.status === "live" ? (
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-primary-500">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="mt-1 text-sm text-red-500 font-medium">比赛中</span>
              </div>
            ) : match.status === "finished" ? (
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="mt-1 text-sm text-gray-500">已结束</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-gray-400">VS</span>
                <span className="mt-1 text-sm text-gray-500">{time}</span>
              </div>
            )}
          </div>

          {/* 客队 - MATCH-07 */}
          <div className="flex flex-col items-center flex-1">
            <Link href={`/team/${match.awayTeam.id}`} className="group">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2 group-hover:bg-primary-100 dark:bg-gray-800">
                <span className="text-lg font-medium">
                  {match.awayTeam.nameZh.slice(0, 2)}
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-500">
                {match.awayTeam.nameZh}
              </span>
            </Link>
          </div>
        </div>

        {/* 比赛信息 - MATCH-01 */}
        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
          {match.venue && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{match.venue}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date} {time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>MatchHeader 组件创建完成，展示比分、球队、联赛跳转</done>
</task>

<task type="auto">
  <name>Task 2: 创建 MatchStats 统计组件</name>
  <files>src/components/match/MatchStats.tsx</files>
  <action>
创建 src/components/match/MatchStats.tsx:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { MatchStats as MatchStatsType } from "@/types";

interface MatchStatsProps {
  stats: MatchStatsType;
}

export function MatchStats({ stats }: MatchStatsProps) {
  const statItems = [
    { label: "控球率", homeKey: "possession", homeUnit: "%", awayKey: "possession", awayUnit: "%" },
    { label: "射门", homeKey: "shots", awayKey: "shots" },
    { label: "射正", homeKey: "shotsOnTarget", awayKey: "shotsOnTarget" },
    { label: "角球", homeKey: "corners", awayKey: "corners" },
    { label: "越位", homeKey: "offsides", awayKey: "offsides" },
    { label: "犯规", homeKey: "fouls", awayKey: "fouls" },
    { label: "黄牌", homeKey: "yellowCards", awayKey: "yellowCards" },
    { label: "红牌", homeKey: "redCards", awayKey: "redCards" },
    { label: "传球", homeKey: "passes", awayKey: "passes" },
    { label: "传球成功率", homeKey: "passAccuracy", homeUnit: "%", awayKey: "passAccuracy", awayUnit: "%" },
  ];

  const getValue = (obj: { home: number; away: number }, key: string) => {
    return obj[key as keyof typeof obj] as number;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>比赛数据</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {statItems.map((item) => {
            const homeValue = getValue(stats, item.homeKey);
            const awayValue = getValue(stats, item.awayKey);
            const total = homeValue + awayValue || 1;
            const homePercent = (homeValue / total) * 100;

            return (
              <div key={item.label} className="grid grid-cols-5 gap-2 items-center">
                <div className="text-right text-sm text-gray-500">
                  {homeValue}{item.homeUnit || ""}
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <div className="flex w-full">
                    <div
                      className="h-2 bg-primary-500 rounded-l"
                      style={{ width: `${homePercent}%` }}
                    />
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700" />
                    <div
                      className="h-2 bg-primary-500 rounded-r"
                      style={{ width: `${100 - homePercent}%` }}
                    />
                  </div>
                </div>
                <div className="text-left text-sm text-gray-500">
                  {awayValue}{item.awayUnit || ""}
                </div>
              </div>
            );
          })}
        </div>

        {/* 图例 */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between text-xs text-gray-400">
            <span>{statItems[0].label}</span>
            <span>{statItems[statItems.length - 1].label}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>MatchStats 组件创建完成，展示比赛统计数据</done>
</task>

<task type="auto">
  <name>Task 3: 创建 MatchEvents 事件时间轴组件</name>
  <files>src/components/match/MatchEvents.tsx</files>
  <action>
创建 src/components/match/MatchEvents.tsx:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { MatchEvent } from "@/types";
import Link from "next/link";

interface MatchEventsProps {
  events: MatchEvent[];
}

export function MatchEvents({ events }: MatchEventsProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal":
        return (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case "yellow_card":
        return (
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
            <div className="w-4 h-2 bg-white" />
          </div>
        );
      case "red_card":
        return (
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
            <div className="w-4 h-2 bg-white" />
          </div>
        );
      case "substitution":
        return (
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
            <span className="text-white text-xs">{type[0].toUpperCase()}</span>
          </div>
        );
    }
  };

  const getEventText = (type: string) => {
    switch (type) {
      case "goal":
        return "进球";
      case "own_goal":
        return "乌龙球";
      case "penalty":
        return "点球";
      case "missed_penalty":
        return "点球罚失";
      case "yellow_card":
        return "黄牌";
      case "red_card":
        return "红牌";
      case "substitution":
        return "换人";
      case "var":
        return "VAR";
      default:
        return type;
    }
  };

  // 按时间排序
  const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <Card>
      <CardHeader>
        <CardTitle>比赛事件</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center text-gray-500 py-8">暂无比赛事件</div>
        ) : (
          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-4">
              {sortedEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  {/* 时间 */}
                  <div className="w-10 text-right text-sm font-medium text-gray-500">
                    {event.minute}'
                  </div>

                  {/* 图标 */}
                  <div className="relative z-10">
                    {getEventIcon(event.type)}
                  </div>

                  {/* 事件详情 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {event.player?.nameZh || event.team?.nameZh || ""}
                      </span>
                      {event.player && (
                        <Link
                          href={`/player/${event.player.id}`}
                          className="text-xs text-primary-500 hover:underline"
                        >
                          查看详情
                        </Link>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getEventText(event.type)}
                      {event.detail && ` - ${event.detail}`}
                    </div>
                    {event.assistPlayer && (
                      <div className="text-xs text-gray-400">
                        助攻: {event.assistPlayer.nameZh}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>MatchEvents 组件创建完成，展示比赛事件时间轴</done>
</task>

<task type="auto">
  <name>Task 4: 创建 MatchLineup 阵容组件</name>
  <files>src/components/match/MatchLineup.tsx</files>
  <action>
创建 src/components/match/MatchLineup.tsx:

```tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Lineup } from "@/types";
import Link from "next/link";

interface MatchLineupProps {
  homeLineup: Lineup;
  awayLineup: Lineup;
}

export function MatchLineup({ homeLineup, awayLineup }: MatchLineupProps) {
  const [activeTab, setActiveTab] = useState<"home" | "away">("home");

  const activeLineup = activeTab === "home" ? homeLineup : awayLineup;
  const activeName = activeTab === "home" ? "主队" : "客队";

  // 按位置分组
  const groupByPosition = (players: typeof activeLineup.players) => {
    const groups: Record<string, typeof players> = {
      "门将": [],
      "后卫": [],
      "中场": [],
      "前锋": [],
    };

    players.forEach((p) => {
      if (p.position.includes("门")) {
        groups["门将"].push(p);
      } else if (p.position.includes("后") || p.position.includes("边")) {
        groups["后卫"].push(p);
      } else if (p.position.includes("前") || p.position.includes("腰") || p.position.includes("锋") || p.position.includes("边")) {
        groups["前锋"].push(p);
      } else {
        groups["中场"].push(p);
      }
    });

    return groups;
  };

  const groupedPlayers = groupByPosition(activeLineup.players);

  return (
    <Card>
      <CardHeader>
        <CardTitle>阵容</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 阵型 */}
        <div className="text-center mb-4">
          <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {activeLineup.formation}
          </span>
          {activeLineup.coach && (
            <span className="ml-2 text-sm text-gray-500">
              主教练: {activeLineup.coach}
            </span>
          )}
        </div>

        {/* 队伍切换 */}
        <div className="flex justify-center gap-2 mb-6">
          <Button
            variant={activeTab === "home" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("home")}
          >
            主队阵容
          </Button>
          <Button
            variant={activeTab === "away" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("away")}
          >
            客队阵容
          </Button>
        </div>

        {/* 首发阵容 - MATCH-05 */}
        <div className="space-y-4">
          {Object.entries(groupedPlayers).map(([position, players]) => {
            if (players.length === 0) return null;

            return (
              <div key={position}>
                <h4 className="text-sm font-medium text-gray-500 mb-2">{position}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {players.map((item, index) => (
                    <Link
                      key={item.player.id}
                      href={`/player/${item.player.id}`}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs dark:bg-gray-700">
                        {item.number}
                      </span>
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {item.player.nameZh}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 替补 - MATCH-05 */}
        {activeLineup.substitutes.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-medium text-gray-500 mb-2">替补</h4>
            <div className="grid grid-cols-2 gap-2">
              {activeLineup.substitutes.map((item) => (
                <Link
                  key={item.player.id}
                  href={`/player/${item.player.id}`}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs dark:bg-gray-700">
                    {item.number}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {item.player.nameZh}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>MatchLineup 组件创建完成，展示首发和替补阵容</done>
</task>

<task type="auto">
  <name>Task 5: 创建比赛详情页</name>
  <files>src/app/match/[id]/page.tsx</files>
  <action>
创建 src/app/match/[id]/page.tsx:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { MatchHeader } from "@/components/match/MatchHeader";
import { MatchStats } from "@/components/match/MatchStats";
import { MatchEvents } from "@/components/match/MatchEvents";
import { MatchLineup } from "@/components/match/MatchLineup";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Match, MatchStats as MatchStatsType, MatchEvent, Lineup, ApiResponse } from "@/types";

interface MatchDetail extends Match {
  stats: MatchStatsType;
  events: MatchEvent[];
  lineups: {
    home: Lineup;
    away: Lineup;
  };
}

export default function MatchDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [match, setMatch] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMatch = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/matches/${id}`);
        const result: ApiResponse<MatchDetail> = await response.json();

        if (result.success && result.data) {
          setMatch(result.data);
        } else {
          setError(result.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-8">
        <ListSkeleton count={3} />
      </Container>
    );
  }

  if (error || !match) {
    return (
      <Container className="py-8">
        <ErrorState
          title="加载失败"
          description={error || "比赛不存在"}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="space-y-6">
        {/* 比赛头部信息 - MATCH-01, MATCH-02 */}
        <MatchHeader match={match} />

        {/* 比赛统计数据 - MATCH-03 */}
        {match.stats && <MatchStats stats={match.stats} />}

        {/* 比赛事件时间轴 - MATCH-04 */}
        {match.events && <MatchEvents events={match.events} />}

        {/* 阵容 - MATCH-05 */}
        {match.lineups && (
          <MatchLineup
            homeLineup={match.lineups.home}
            awayLineup={match.lineups.away}
          />
        )}

        {/* 相关资讯 - MATCH-09 */}
        <Card>
          <CardHeader>
            <CardTitle>相关资讯</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-4">
              暂无相关资讯
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
```
  </action>
  <verify>
    <automated>npm run build 成功，/match/[id] 路由可正常访问</automated>
  </verify>
  <done>比赛详情页创建完成，包含所有必需功能</done>
</task>

</tasks>

<verification>
- [ ] 用户可以查看比赛基本信息（MATCH-01）
- [ ] 用户可以查看实时比分和比赛状态（MATCH-02）
- [ ] 用户可以查看比赛详细统计数据（MATCH-03）
- [ ] 用户可以查看比赛事件时间轴（MATCH-04）
- [ ] 用户可以查看双方首发和替补阵容（MATCH-05）
- [ ] 用户可以点击球员名进入球员详情页（MATCH-06, COMM-01）
- [ ] 用户可以点击球队名进入球队详情页（MATCH-07, COMM-01）
- [ ] 用户可以点击联赛名进入赛事详情页（MATCH-08, COMM-01）
- [ ] 用户可以浏览比赛相关资讯（MATCH-09）
</verification>

<success_criteria>
1. 比赛详情页展示完整比赛信息
2. 统计数据、事件时间轴、阵容均已实现
3. 所有跳转链接正常工作
4. 骨架屏、空状态、错误状态处理完善
</success_criteria>

<output>
After completion, create `.planning/phases/phase-02/plans/phase-02-plan-03-SUMMARY.md`
</output>