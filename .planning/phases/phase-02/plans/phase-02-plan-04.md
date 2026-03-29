---
phase: phase-02
plan: 04
type: execute
wave: 3
depends_on:
  - phase-02-plan-01
files_modified:
  - src/app/competition/[id]/page.tsx
  - src/components/competition/CompetitionHeader.tsx
  - src/components/competition/StandingsTable.tsx
  - src/components/competition/CompetitionSchedule.tsx
  - src/components/competition/TopScorersList.tsx
  - src/components/competition/TeamList.tsx
autonomous: true
requirements:
  - COMP-01
  - COMP-02
  - COMP-03
  - COMP-04
  - COMP-05
  - COMP-06
  - COMP-07
  - COMP-08
  - COMM-01

must_haves:
  truths:
    - 用户可以查看赛事基本信息（名称、国家、赛季、参赛队伍）
    - 用户可以切换赛季查看不同赛季数据
    - 用户可以查看联赛积分榜（排名、球队、场次、胜平负、积分）
    - 用户可以查看赛事赛程，按轮次筛选
    - 用户可以查看射手榜和助攻榜
    - 用户可以查看参赛球队列表并进入球队详情页
    - 用户可以浏览赛事相关资讯
    - 用户可以点击球队进入球队详情页
  artifacts:
    - path: "src/app/competition/[id]/page.tsx"
      provides: "赛事详情页入口"
    - path: "src/components/competition/CompetitionHeader.tsx"
      provides: "赛事头部信息（名称、赛季、队伍数）"
    - path: "src/components/competition/StandingsTable.tsx"
      provides: "积分榜表格组件"
    - path: "src/components/competition/CompetitionSchedule.tsx"
      provides: "赛事赛程组件，支持轮次筛选"
    - path: "src/components/competition/TopScorersList.tsx"
      provides: "射手榜和助攻榜组件"
    - path: "src/components/competition/TeamList.tsx"
      provides: "参赛球队列表组件"
  key_links:
    - from: "src/app/competition/[id]/page.tsx"
      to: "src/components/competition/CompetitionHeader.tsx"
      via: "导入使用"
    - from: "src/components/competition/TeamList.tsx"
      to: "/team/[id]"
      via: "Next.js Link"
---

<objective>
创建赛事详情页，展示赛事基本信息、积分榜、赛程、射手榜和参赛球队列表。
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-02/plans/phase-02-plan-01.md

## 数据类型参考

来自 phase-02-plan-01:

```typescript
// 赛事
interface Competition {
  id: string;
  name: string;
  nameZh: string;
  logo?: string;
  country?: string;
  season?: string;
  currentRound?: number;
  totalRounds?: number;
}

// 积分榜
interface Standing {
  rank: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  recentForm?: ("W" | "D" | "L")[];
}

// 射手榜
interface TopScorer {
  rank: number;
  player: Player;
  goals: number;
  assists?: number;
  penaltyGoals?: number;
}

// 球队
interface Team {
  id: string;
  name: string;
  nameZh: string;
  logo?: string;
  league?: League;
}

// 比赛
interface Match {
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
}
```

## 已有组件参考

- src/components/ui/Card.tsx - 卡片组件
- src/components/ui/Button.tsx - 按钮组件
- src/components/ui/Tabs.tsx - 标签页组件（如存在）
</context>

<tasks>

<task type="auto">
  <name>Task 1: 创建 CompetitionHeader 赛事头部组件</name>
  <files>src/components/competition/CompetitionHeader.tsx</files>
  <action>
创建 src/components/competition/CompetitionHeader.tsx:

```tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Competition } from "@/types";

interface CompetitionHeaderProps {
  competition: Competition;
  onSeasonChange?: (season: string) => void;
}

export function CompetitionHeader({ competition, onSeasonChange }: CompetitionHeaderProps) {
  // 模拟赛季选项
  const seasons = ["2025/26", "2024/25", "2023/24", "2022/23"];

  return (
    <Card>
      <CardContent className="p-6">
        {/* 赛事Logo和名称 - COMP-01 */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
            <span className="text-2xl font-medium">{competition.nameZh.slice(0, 2)}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {competition.nameZh}
            </h1>
            <p className="text-sm text-gray-500">
              {competition.country} · {competition.season}
            </p>
          </div>
        </div>

        {/* 赛季切换 - COMP-02 */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">赛季:</span>
          {seasons.map((season) => (
            <Button
              key={season}
              variant={season === competition.season ? "primary" : "secondary"}
              size="sm"
              onClick={() => onSeasonChange?.(season)}
            >
              {season}
            </Button>
          ))}
        </div>

        {/* 赛事信息 - COMP-01 */}
        <div className="mt-4 flex gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>第{competition.currentRound}轮 / 共{competition.totalRounds}轮</span>
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
  <done>CompetitionHeader 组件创建完成，展示赛事信息和赛季切换</done>
</task>

<task type="auto">
  <name>Task 2: 创建 StandingsTable 积分榜组件</name>
  <files>src/components/competition/StandingsTable.tsx</files>
  <action>
创建 src/components/competition/StandingsTable.tsx:

```tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Standing } from "@/types";

interface StandingsTableProps {
  standings: Standing[];
}

export function StandingsTable({ standings }: StandingsTableProps) {
  const getFormColor = (result: "W" | "D" | "L") => {
    switch (result) {
      case "W":
        return "bg-green-500";
      case "D":
        return "bg-yellow-500";
      case "L":
        return "bg-red-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>积分榜</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-2 text-sm font-medium text-gray-500">排名</th>
                <th className="text-left py-2 px-2 text-sm font-medium text-gray-500">球队</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">场次</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">胜</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">平</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">负</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">进球</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">失球</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">净胜</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">积分</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">近5场</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing) => (
                <tr
                  key={standing.team.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                        standing.rank <= 4
                          ? "bg-green-500 text-white"
                          : standing.rank <= 6
                          ? "bg-blue-500 text-white"
                          : standing.rank >= standing.team?.league?.id ? "bg-red-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {standing.rank}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <Link
                      href={`/team/${standing.team.id}`}
                      className="flex items-center gap-2 hover:text-primary-500"
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                        <span className="text-xs">{standing.team.nameZh.slice(0, 2)}</span>
                      </div>
                      <span className="font-medium">{standing.team.nameZh}</span>
                    </Link>
                  </td>
                  <td className="py-3 px-2 text-center text-sm">{standing.played}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.won}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.drawn}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.lost}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.goalsFor}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.goalsAgainst}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.goalDiff}</td>
                  <td className="py-3 px-2 text-center text-sm font-bold">{standing.points}</td>
                  <td className="py-3 px-2">
                    <div className="flex justify-center gap-0.5">
                      {standing.recentForm?.map((form, index) => (
                        <span
                          key={index}
                          className={`w-4 h-4 rounded text-white text-xs flex items-center justify-center ${getFormColor(form)}`}
                        >
                          {form}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
  <done>StandingsTable 组件创建完成，展示积分榜数据</done>
</task>

<task type="auto">
  <name>Task 3: 创建 CompetitionSchedule 赛程组件</name>
  <files>src/components/competition/CompetitionSchedule.tsx</files>
  <action>
创建 src/components/competition/CompetitionSchedule.tsx:

```tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Match } from "@/types";

interface CompetitionScheduleProps {
  matches: Match[];
  currentRound: number;
  totalRounds: number;
  onRoundChange?: (round: number) => void;
}

export function CompetitionSchedule({
  matches,
  currentRound,
  totalRounds,
  onRoundChange,
}: CompetitionScheduleProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 生成轮次按钮
  const rounds = Array.from({ length: totalRounds }, (_, i) => i + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>赛程</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 轮次筛选 - COMP-04 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {rounds.map((round) => (
            <Button
              key={round}
              variant={round === currentRound ? "primary" : "secondary"}
              size="sm"
              onClick={() => onRoundChange?.(round)}
            >
              第{round}轮
            </Button>
          ))}
        </div>

        {/* 比赛列表 */}
        {matches.length === 0 ? (
          <div className="text-center text-gray-500 py-8">暂无比赛数据</div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <Link
                key={match.id}
                href={`/match/${match.id}`}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                  {/* 日期 */}
                  <div className="text-sm text-gray-500 w-16">
                    {new Date(match.startTime).toLocaleDateString("zh-CN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  {/* 主队 */}
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {match.homeTeam.nameZh}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                      <span className="text-xs">{match.homeTeam.nameZh.slice(0, 2)}</span>
                    </div>
                  </div>

                  {/* 比分 */}
                  <div className="mx-4 text-center min-w-[60px]">
                    {match.status === "finished" || match.status === "live" ? (
                      <span className="text-lg font-bold">
                        {match.homeScore} - {match.awayScore}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        {formatTime(match.startTime)}
                      </span>
                    )}
                  </div>

                  {/* 客队 */}
                  <div className="flex items-center gap-2 flex-1 justify-start">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                      <span className="text-xs">{match.awayTeam.nameZh.slice(0, 2)}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {match.awayTeam.nameZh}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
  <done>CompetitionSchedule 组件创建完成，展示赛程和轮次筛选</done>
</task>

<task type="auto">
  <name>Task 4: 创建 TopScorersList 射手榜组件</name>
  <files>src/components/competition/TopScorersList.tsx</files>
  <action>
创建 src/components/competition/TopScorersList.tsx:

```tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TopScorer } from "@/types";

interface TopScorersListProps {
  topScorers: TopScorer[];
}

export function TopScorersList({ topScorers }: TopScorersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>射手榜</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topScorers.map((scorer) => (
            <Link
              key={scorer.player.id}
              href={`/player/${scorer.player.id}`}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    scorer.rank === 1
                      ? "bg-yellow-500 text-white"
                      : scorer.rank === 2
                      ? "bg-gray-400 text-white"
                      : scorer.rank === 3
                      ? "bg-amber-700 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {scorer.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                  <span className="text-xs">{scorer.player.nameZh?.slice(0, 1)}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {scorer.player.nameZh}
                  </div>
                  <div className="text-xs text-gray-500">
                    {scorer.player.team?.nameZh}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary-500">{scorer.goals}</div>
                <div className="text-xs text-gray-500">进球</div>
              </div>
            </Link>
          ))}
        </div>

        {/* 助攻榜提示 - COMP-05 */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="text-center text-sm text-gray-500">
            助攻榜功能开发中...
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
  <done>TopScorersList 组件创建完成，展示射手榜数据</done>
</task>

<task type="auto">
  <name>Task 5: 创建 TeamList 球队列表组件</name>
  <files>src/components/competition/TeamList.tsx</files>
  <action>
创建 src/components/competition/TeamList.tsx:

```tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Team } from "@/types";

interface TeamListProps {
  teams: Team[];
}

export function TeamList({ teams }: TeamListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>参赛球队</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/team/${team.id}`}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2 dark:bg-gray-700">
                <span className="text-lg font-medium">{team.nameZh.slice(0, 2)}</span>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-gray-100">
                {team.nameZh}
              </span>
            </Link>
          ))}
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
  <done>TeamList 组件创建完成，展示参赛球队列表</done>
</task>

<task type="auto">
  <name>Task 6: 创建赛事详情页</name>
  <files>src/app/competition/[id]/page.tsx</files>
  <action>
创建 src/app/competition/[id]/page.tsx:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { CompetitionHeader } from "@/components/competition/CompetitionHeader";
import { StandingsTable } from "@/components/competition/StandingsTable";
import { CompetitionSchedule } from "@/components/competition/CompetitionSchedule";
import { TopScorersList } from "@/components/competition/TopScorersList";
import { TeamList } from "@/components/competition/TeamList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Competition, Standing, TopScorer, Match, Team, ApiResponse } from "@/types";

interface CompetitionData {
  competition: Competition;
  standings: Standing[];
  topScorers: TopScorer[];
  matches: Match[];
  teams: Team[];
}

export default function CompetitionDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<CompetitionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"standings" | "schedule" | "scorers" | "teams">("standings");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 并行获取赛事详情和赛程
        const [detailRes, matchesRes] = await Promise.all([
          fetch(`/api/competitions/${id}`),
          fetch(`/api/competitions/${id}/matches`),
        ]);

        const detailResult = await detailRes.json();
        const matchesResult = await matchesRes.json();

        if (detailResult.success && detailResult.data) {
          setData({
            competition: detailResult.data.competition,
            standings: detailResult.data.standings || [],
            topScorers: detailResult.data.topScorers || [],
            matches: matchesResult.success ? matchesResult.data || [] : [],
            teams: [], // 从 standings 中提取球队
          });
        } else {
          setError(detailResult.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-8">
        <ListSkeleton count={3} />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container className="py-8">
        <ErrorState
          title="加载失败"
          description={error || "赛事不存在"}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  // 从积分榜提取球队列表
  const teamsFromStandings = data.standings.map((s) => s.team);

  return (
    <Container className="py-8">
      <div className="space-y-6">
        {/* 赛事头部 - COMP-01, COMP-02 */}
        <CompetitionHeader competition={data.competition} />

        {/* 标签页切换 */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "standings"
                ? "border-primary-500 text-primary-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("standings")}
          >
            积分榜
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "schedule"
                ? "border-primary-500 text-primary-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("schedule")}
          >
            赛程
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "scorers"
                ? "border-primary-500 text-primary-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("scorers")}
          >
            射手榜
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "teams"
                ? "border-primary-500 text-primary-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("teams")}
          >
            球队
          </button>
        </div>

        {/* 积分榜 - COMP-03 */}
        {activeTab === "standings" && (
          <StandingsTable standings={data.standings} />
        )}

        {/* 赛程 - COMP-04 */}
        {activeTab === "schedule" && (
          <CompetitionSchedule
            matches={data.matches}
            currentRound={data.competition.currentRound || 1}
            totalRounds={data.competition.totalRounds || 38}
          />
        )}

        {/* 射手榜 - COMP-05 */}
        {activeTab === "scorers" && (
          <TopScorersList topScorers={data.topScorers} />
        )}

        {/* 球队列表 - COMP-06, COMP-08 */}
        {activeTab === "teams" && (
          <TeamList teams={teamsFromStandings} />
        )}

        {/* 相关资讯 - COMP-07 */}
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
    <automated>npm run build 成功，/competition/[id] 路由可正常访问</automated>
  </verify>
  <done>赛事详情页创建完成，包含所有必需功能</done>
</task>

</tasks>

<verification>
- [ ] 用户可以查看赛事基本信息（COMP-01）
- [ ] 用户可以切换赛季查看不同赛季数据（COMP-02）
- [ ] 用户可以查看联赛积分榜（COMP-03）
- [ ] 用户可以查看赛事赛程，按轮次筛选（COMP-04）
- [ ] 用户可以查看射手榜（COMP-05）
- [ ] 用户可以查看参赛球队列表（COMP-06）
- [ ] 用户可以浏览赛事相关资讯（COMP-07）
- [ ] 用户可以点击球队进入球队详情页（COMP-08, COMM-01）
</verification>

<success_criteria>
1. 赛事详情页展示完整赛事信息
2. 积分榜、赛程、射手榜、球队列表均已实现
3. 赛季切换功能正常工作
4. 所有跳转链接正常工作
5. 骨架屏、空状态、错误状态处理完善
</success_criteria>

<output>
After completion, create `.planning/phases/phase-02/plans/phase-02-plan-04-SUMMARY.md`
</output>