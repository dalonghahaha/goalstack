---
phase: phase-02
plan: 05
type: execute
wave: 3
depends_on:
  - phase-02-plan-01
files_modified:
  - src/app/team/[id]/page.tsx
  - src/components/team/TeamHeader.tsx
  - src/components/team/TeamSquad.tsx
  - src/components/team/TeamSchedule.tsx
  - src/components/team/TeamStats.tsx
  - src/components/team/TeamHonors.tsx
autonomous: true
requirements:
  - TEAM-01
  - TEAM-02
  - TEAM-03
  - TEAM-04
  - TEAM-05
  - TEAM-06
  - TEAM-07
  - TEAM-08
  - TEAM-09
  - COMM-01

must_haves:
  truths:
    - 用户可以查看球队基本信息（名称、Logo、成立时间、主场、教练、所属联赛）
    - 用户可以查看球队阵容（按位置分类：门将、后卫、中场、前锋）
    - 用户可以点击球员进入球员详情页
    - 用户可以查看球队近期赛程（未来/过去）
    - 用户可以查看球队赛季数据统计（场次、胜平负、进球/失球、胜率）
    - 用户可以查看球队历史荣誉
    - 用户可以点击所属联赛进入赛事详情页
    - 用户可以点击某场比赛进入比赛详情页
    - 用户可以浏览球队相关新闻
  artifacts:
    - path: "src/app/team/[id]/page.tsx"
      provides: "球队详情页入口"
    - path: "src/components/team/TeamHeader.tsx"
      provides: "球队头部信息（名称、Logo、成立时间、主场、教练）"
    - path: "src/components/team/TeamSquad.tsx"
      provides: "球队阵容组件，按位置分类"
    - path: "src/components/team/TeamSchedule.tsx"
      provides: "球队赛程组件，支持切换未来/过去"
    - path: "src/components/team/TeamStats.tsx"
      provides: "球队赛季数据统计组件"
    - path: "src/components/team/TeamHonors.tsx"
      provides: "球队历史荣誉组件"
  key_links:
    - from: "src/app/team/[id]/page.tsx"
      to: "src/components/team/TeamHeader.tsx"
      via: "导入使用"
    - from: "src/components/team/TeamSquad.tsx"
      to: "/player/[id]"
      via: "Next.js Link"
    - from: "src/components/team/TeamHeader.tsx"
      to: "/competition/[id]"
      via: "Next.js Link"
---

<objective>
创建球队详情页，展示球队基本信息、阵容、赛程、数据统计和历史荣誉。
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
// 球队详情
interface TeamDetail extends Team {
  founded?: number;
  venue?: string;
  capacity?: number;
  coach?: string;
  description?: string;
  honors?: TeamHonor[];
}

// 球队荣誉
interface TeamHonor {
  competition: string;
  year: string;
  count: number;
}

// 球队统计
interface TeamStats {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
  winRate: number;
}

// 球员
interface Player {
  id: string;
  name: string;
  nameZh: string;
  avatar?: string;
  position?: string;
  number?: number;
  team?: Team;
  nationality?: string;
  birthDate?: Date;
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
</context>

<tasks>

<task type="auto">
  <name>Task 1: 创建 TeamHeader 球队头部组件</name>
  <files>src/components/team/TeamHeader.tsx</files>
  <action>
创建 src/components/team/TeamHeader.tsx:

```tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { TeamDetail } from "@/types";

interface TeamHeaderProps {
  team: TeamDetail;
}

export function TeamHeader({ team }: TeamHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        {/* 球队Logo和名称 - TEAM-01 */}
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
            <span className="text-3xl font-medium">{team.nameZh.slice(0, 2)}</span>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {team.nameZh}
            </h1>
            <p className="text-gray-500">{team.name}</p>

            {/* 联赛跳转 - TEAM-07 */}
            {team.league && (
              <Link
                href={`/competition/${team.league.id}`}
                className="inline-flex items-center gap-1 mt-2 text-sm text-primary-500 hover:underline"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {team.league.nameZh}
              </Link>
            )}
          </div>
        </div>

        {/* 球队基本信息 - TEAM-01 */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.founded && (
            <div>
              <div className="text-sm text-gray-500">成立时间</div>
              <div className="font-medium">{team.founded}年</div>
            </div>
          )}
          {team.venue && (
            <div>
              <div className="text-sm text-gray-500">主场</div>
              <div className="font-medium">{team.venue}</div>
            </div>
          )}
          {team.capacity && (
            <div>
              <div className="text-sm text-gray-500">容纳人数</div>
              <div className="font-medium">{team.capacity.toLocaleString()}人</div>
            </div>
          )}
          {team.coach && (
            <div>
              <div className="text-sm text-gray-500">主教练</div>
              <div className="font-medium">{team.coach}</div>
            </div>
          )}
        </div>

        {/* 简介 - TEAM-01 */}
        {team.description && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">{team.description}</p>
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
  <done>TeamHeader 组件创建完成，展示球队基本信息和联赛跳转</done>
</task>

<task type="auto">
  <name>Task 2: 创建 TeamSquad 球队阵容组件</name>
  <files>src/components/team/TeamSquad.tsx</files>
  <action>
创建 src/components/team/TeamSquad.tsx:

```tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Player } from "@/types";

interface TeamSquadProps {
  squad: Player[];
}

export function TeamSquad({ squad }: TeamSquadProps) {
  // 按位置分组
  const groupByPosition = (players: Player[]) => {
    const groups: Record<string, Player[]> = {
      "门将": [],
      "后卫": [],
      "中场": [],
      "前锋": [],
    };

    players.forEach((player) => {
      const pos = player.position || "";
      if (pos.includes("门")) {
        groups["门将"].push(player);
      } else if (pos.includes("后") || pos.includes("边")) {
        groups["后卫"].push(player);
      } else if (pos.includes("前") || pos.includes("腰") || pos.includes("锋") || pos.includes("边")) {
        groups["前锋"].push(player);
      } else {
        groups["中场"].push(player);
      }
    });

    return groups;
  };

  const groupedPlayers = groupByPosition(squad);

  return (
    <Card>
      <CardHeader>
        <CardTitle>球队阵容</CardTitle>
      </CardHeader>
      <CardContent>
        {squad.length === 0 ? (
          <div className="text-center text-gray-500 py-8">暂无阵容数据</div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedPlayers).map(([position, players]) => {
              if (players.length === 0) return null;

              return (
                <div key={position}>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">{position}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {players.map((player) => (
                      <Link
                        key={player.id}
                        href={`/player/${player.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                          <span className="text-sm font-medium">
                            {player.number || player.nameZh.slice(0, 1)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                            {player.nameZh}
                          </div>
                          <div className="text-xs text-gray-500">{player.number}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
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
  <done>TeamSquad 组件创建完成，按位置分类展示球员</done>
</task>

<task type="auto">
  <name>Task 3: 创建 TeamSchedule 球队赛程组件</name>
  <files>src/components/team/TeamSchedule.tsx</files>
  <action>
创建 src/components/team/TeamSchedule.tsx:

```tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Match } from "@/types";

interface TeamScheduleProps {
  upcomingMatches: Match[];
  pastMatches: Match[];
}

export function TeamSchedule({ upcomingMatches, pastMatches }: TeamScheduleProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const matches = activeTab === "upcoming" ? upcomingMatches : pastMatches;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>赛程</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 切换未来/过去 - TEAM-04 */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeTab === "upcoming" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("upcoming")}
          >
            未来比赛
          </Button>
          <Button
            variant={activeTab === "past" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("past")}
          >
            过去比赛
          </Button>
        </div>

        {/* 比赛列表 */}
        {matches.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            暂无{activeTab === "upcoming" ? "未来" : "过去"}比赛
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <Link
                key={match.id}
                href={`/match/${match.id}`}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                  {/* 日期/时间 */}
                  <div className="text-sm text-gray-500 w-20">
                    {formatDate(match.startTime)}
                  </div>

                  {/* 联赛 */}
                  <div className="text-xs text-gray-400 w-16">
                    {match.league.nameZh}
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

                  {/* 比分/时间 */}
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
  <done>TeamSchedule 组件创建完成，展示未来和过去比赛</done>
</task>

<task type="auto">
  <name>Task 4: 创建 TeamStats 球队统计组件</name>
  <files>src/components/team/TeamStats.tsx</files>
  <action>
创建 src/components/team/TeamStats.tsx:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TeamStats as TeamStatsType } from "@/types";

interface TeamStatsProps {
  stats: TeamStatsType;
}

export function TeamStats({ stats }: TeamStatsProps) {
  const statItems = [
    { label: "场次", value: stats.played },
    { label: "胜", value: stats.won, color: "text-green-500" },
    { label: "平", value: stats.drawn, color: "text-yellow-500" },
    { label: "负", value: stats.lost, color: "text-red-500" },
    { label: "进球", value: stats.goalsFor },
    { label: "失球", value: stats.goalsAgainst },
    { label: "净胜球", value: stats.goalDiff, color: stats.goalDiff > 0 ? "text-green-500" : stats.goalDiff < 0 ? "text-red-500" : "" },
    { label: "零封", value: stats.cleanSheets },
    { label: "胜率", value: `${stats.winRate}%` },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>赛季数据</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {statItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className={`text-2xl font-bold ${item.color || "text-gray-900 dark:text-gray-100"}`}>
                {item.value}
              </div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>

        {/* 额外统计 */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">胜率</span>
            <span className="font-medium">{stats.winRate}%</span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="h-2 bg-primary-500 rounded-full"
              style={{ width: `${stats.winRate}%` }}
            />
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
  <done>TeamStats 组件创建完成，展示球队赛季统计</done>
</task>

<task type="auto">
  <name>Task 5: 创建 TeamHonors 球队荣誉组件</name>
  <files>src/components/team/TeamHonors.tsx</files>
  <action>
创建 src/components/team/TeamHonors.tsx:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TeamHonor } from "@/types";

interface TeamHonorsProps {
  honors: TeamHonor[];
}

export function TeamHonors({ honors }: TeamHonorsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>球队荣誉</CardTitle>
      </CardHeader>
      <CardContent>
        {honors.length === 0 ? (
          <div className="text-center text-gray-500 py-8">暂无荣誉数据</div>
        ) : (
          <div className="space-y-3">
            {honors.map((honor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {honor.competition}
                    </div>
                    <div className="text-sm text-gray-500">{honor.year}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-500">
                  {honor.count}
                </div>
              </div>
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
  <done>TeamHonors 组件创建完成，展示球队历史荣誉</done>
</task>

<task type="auto">
  <name>Task 6: 创建球队详情页</name>
  <files>src/app/team/[id]/page.tsx</files>
  <action>
创建 src/app/team/[id]/page.tsx:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { TeamHeader } from "@/components/team/TeamHeader";
import { TeamSquad } from "@/components/team/TeamSquad";
import { TeamSchedule } from "@/components/team/TeamSchedule";
import { TeamStats } from "@/components/team/TeamStats";
import { TeamHonors } from "@/components/team/TeamHonors";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { TeamDetail, TeamStats as TeamStatsType, Player, Match, ApiResponse } from "@/types";

interface TeamData {
  team: TeamDetail;
  stats: TeamStatsType;
  squad: Player[];
}

export default function TeamDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/teams/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setData({
            team: result.data.team,
            stats: result.data.stats,
            squad: result.data.squad || [],
          });
        } else {
          setError(result.error?.message || "加载失败");
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
          description={error || "球队不存在"}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="space-y-6">
        {/* 球队头部 - TEAM-01, TEAM-07 */}
        <TeamHeader team={data.team} />

        {/* 球队阵容 - TEAM-02, TEAM-03 */}
        <TeamSquad squad={data.squad} />

        {/* 球队赛程 - TEAM-04, TEAM-08 */}
        <TeamSchedule
          upcomingMatches={[]} // TODO: 从 API 获取
          pastMatches={[]} // TODO: 从 API 获取
        />

        {/* 球队统计 - TEAM-05 */}
        <TeamStats stats={data.stats} />

        {/* 球队荣誉 - TEAM-06 */}
        {data.team.honors && data.team.honors.length > 0 && (
          <TeamHonors honors={data.team.honors} />
        )}

        {/* 相关资讯 - TEAM-09 */}
        <Card>
          <CardHeader>
            <CardTitle>相关新闻</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-4">
              暂无相关新闻
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
    <automated>npm run build 成功，/team/[id] 路由可正常访问</automated>
  </verify>
  <done>球队详情页创建完成，包含所有必需功能</done>
</task>

</tasks>

<verification>
- [ ] 用户可以查看球队基本信息（TEAM-01）
- [ ] 用户可以查看球队阵容（TEAM-02）
- [ ] 用户可以点击球员进入球员详情页（TEAM-03, COMM-01）
- [ ] 用户可以查看球队近期赛程（TEAM-04）
- [ ] 用户可以查看球队赛季数据统计（TEAM-05）
- [ ] 用户可以查看球队历史荣誉（TEAM-06）
- [ ] 用户可以点击所属联赛进入赛事详情页（TEAM-07, COMM-01）
- [ ] 用户可以点击某场比赛进入比赛详情页（TEAM-08, COMM-01）
- [ ] 用户可以浏览球队相关新闻（TEAM-09）
</verification>

<success_criteria>
1. 球队详情页展示完整球队信息
2. 阵容、赛程、数据统计、荣誉均已实现
3. 所有跳转链接正常工作
4. 骨架屏、空状态、错误状态处理完善
</success_criteria>

<output>
After completion, create `.planning/phases/phase-02/plans/phase-02-plan-05-SUMMARY.md`
</output>