---
phase: phase-02
plan: 06
type: execute
wave: 3
depends_on:
  - phase-02-plan-01
files_modified:
  - src/app/player/[id]/page.tsx
  - src/components/player/PlayerHeader.tsx
  - src/components/player/PlayerStats.tsx
  - src/components/player/PlayerCareer.tsx
  - src/components/player/PlayerHonors.tsx
  - src/components/player/PlayerAbilityChart.tsx
autonomous: true
requirements:
  - PLAYER-01
  - PLAYER-02
  - PLAYER-03
  - PLAYER-04
  - PLAYER-05
  - PLAYER-06
  - PLAYER-07
  - COMM-01

must_haves:
  truths:
    - 用户可以查看球员基本信息（姓名、头像、年龄、国籍、位置、所属球队、球衣号码）
    - 用户可以切换赛季查看不同赛季数据
    - 用户可以查看球员赛季数据（出场、进球、助攻、黄红牌等）
    - 用户可以查看球员生涯荣誉
    - 用户可以查看球员能力维度（雷达图）
    - 用户可以点击所属球队进入球队详情页
    - 用户可以浏览球员相关新闻
  artifacts:
    - path: "src/app/player/[id]/page.tsx"
      provides: "球员详情页入口"
    - path: "src/components/player/PlayerHeader.tsx"
      provides: "球员头部信息（姓名、头像、年龄、国籍、位置）"
    - path: "src/components/player/PlayerStats.tsx"
      provides: "球员赛季数据组件"
    - path: "src/components/player/PlayerCareer.tsx"
      provides: "球员生涯履历组件"
    - path: "src/components/player/PlayerHonors.tsx"
      provides: "球员生涯荣誉组件"
    - path: "src/components/player/PlayerAbilityChart.tsx"
      provides: "球员能力雷达图组件（使用 Recharts）"
  key_links:
    - from: "src/app/player/[id]/page.tsx"
      to: "src/components/player/PlayerHeader.tsx"
      via: "导入使用"
    - from: "src/components/player/PlayerHeader.tsx"
      to: "/team/[id]"
      via: "Next.js Link"
---

<objective>
创建球员详情页，展示球员基本信息、赛季数据、生涯荣誉和能力雷达图。
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
// 球员详情
interface PlayerDetail extends Player {
  height?: number;
  weight?: number;
  birthDate?: string;
  birthPlace?: string;
  career?: PlayerCareer[];
  honors?: PlayerHonor[];
}

// 球员生涯
interface PlayerCareer {
  season: string;
  team: Team;
  appearances: number;
  goals: number;
  assists: number;
}

// 球员荣誉
interface PlayerHonor {
  competition: string;
  year: string;
  title: string;
}

// 球员赛季统计
interface PlayerStats {
  season: string;
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
}

// 球员能力
interface PlayerAbility {
  overall: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

// 球队
interface Team {
  id: string;
  name: string;
  nameZh: string;
  logo?: string;
  league?: League;
}
```

## 已有组件参考

- src/components/ui/Card.tsx - 卡片组件
- src/components/ui/Button.tsx - 按钮组件
- Recharts 已安装 - 用于雷达图
</context>

<tasks>

<task type="auto">
  <name>Task 1: 创建 PlayerHeader 球员头部组件</name>
  <files>src/components/player/PlayerHeader.tsx</files>
  <action>
创建 src/components/player/PlayerHeader.tsx:

```tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { PlayerDetail } from "@/types";

interface PlayerHeaderProps {
  player: PlayerDetail;
}

export function PlayerHeader({ player }: PlayerHeaderProps) {
  // 计算年龄
  const getAge = (birthDate?: string) => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const now = new Date();
    const age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const age = getAge(player.birthDate);

  return (
    <Card>
      <CardContent className="p-6">
        {/* 球员头像和基本信息 - PLAYER-01 */}
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
            <span className="text-3xl font-medium">{player.nameZh.slice(0, 2)}</span>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {player.nameZh}
            </h1>
            <p className="text-gray-500">{player.name}</p>

            {/* 球衣号码 - PLAYER-01 */}
            {player.number && (
              <div className="mt-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 text-white font-bold">
                {player.number}
              </div>
            )}
          </div>
        </div>

        {/* 球员详细信息 - PLAYER-01 */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {player.position && (
            <div>
              <div className="text-sm text-gray-500">位置</div>
              <div className="font-medium">{player.position}</div>
            </div>
          )}
          {age && (
            <div>
              <div className="text-sm text-gray-500">年龄</div>
              <div className="font-medium">{age}岁</div>
            </div>
          )}
          {player.nationality && (
            <div>
              <div className="text-sm text-gray-500">国籍</div>
              <div className="font-medium">{player.nationality}</div>
            </div>
          )}
          {player.birthPlace && (
            <div>
              <div className="text-sm text-gray-500">出生地</div>
              <div className="font-medium">{player.birthPlace}</div>
            </div>
          )}
        </div>

        {/* 身体信息 - PLAYER-01 */}
        {(player.height || player.weight) && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
            {player.height && (
              <div>
                <div className="text-sm text-gray-500">身高</div>
                <div className="font-medium">{player.height} cm</div>
              </div>
            )}
            {player.weight && (
              <div>
                <div className="text-sm text-gray-500">体重</div>
                <div className="font-medium">{player.weight} kg</div>
              </div>
            )}
          </div>
        )}

        {/* 所属球队跳转 - PLAYER-06 */}
        {player.team && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Link
              href={`/team/${player.team.id}`}
              className="inline-flex items-center gap-2 text-primary-500 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {player.team.nameZh}
            </Link>
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
  <done>PlayerHeader 组件创建完成，展示球员基本信息和球队跳转</done>
</task>

<task type="auto">
  <name>Task 2: 创建 PlayerStats 球员统计组件</name>
  <files>src/components/player/PlayerStats.tsx</files>
  <action>
创建 src/components/player/PlayerStats.tsx:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PlayerStats as PlayerStatsType } from "@/types";

interface PlayerStatsProps {
  stats: PlayerStatsType[];
  currentSeason: string;
  onSeasonChange?: (season: string) => void;
}

export function PlayerStats({ stats, currentSeason, onSeasonChange }: PlayerStatsProps) {
  const currentStats = stats.find((s) => s.season === currentSeason) || stats[0];

  if (!currentStats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>赛季数据</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">暂无数据</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>赛季数据</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 赛季切换 - PLAYER-02 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stats.map((stat) => (
            <Button
              key={stat.season}
              variant={stat.season === currentSeason ? "primary" : "secondary"}
              size="sm"
              onClick={() => onSeasonChange?.(stat.season)}
            >
              {stat.season}
            </Button>
          ))}
        </div>

        {/* 数据展示 - PLAYER-03 */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentStats.appearances}
            </div>
            <div className="text-sm text-gray-500">出场</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {currentStats.goals}
            </div>
            <div className="text-sm text-gray-500">进球</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {currentStats.assists}
            </div>
            <div className="text-sm text-gray-500">助攻</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {currentStats.yellowCards}
            </div>
            <div className="text-sm text-gray-500">黄牌</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">
              {currentStats.redCards}
            </div>
            <div className="text-sm text-gray-500">红牌</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentStats.minutesPlayed}
            </div>
            <div className="text-sm text-gray-500">出场时间</div>
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
  <done>PlayerStats 组件创建完成，展示球员赛季数据</done>
</task>

<task type="auto">
  <name>Task 3: 创建 PlayerCareer 球员生涯组件</name>
  <files>src/components/player/PlayerCareer.tsx</files>
  <action>
创建 src/components/player/PlayerCareer.tsx:

```tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PlayerCareer as PlayerCareerType } from "@/types";

interface PlayerCareerProps {
  career: PlayerCareerType[];
}

export function PlayerCareer({ career }: PlayerCareerProps) {
  if (career.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>生涯履历</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">暂无生涯数据</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>生涯履历</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {career.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-16">
                  {item.season}
                </span>
                <Link
                  href={`/team/${item.team.id}`}
                  className="font-medium text-gray-900 dark:text-gray-100 hover:text-primary-500"
                >
                  {item.team.nameZh}
                </Link>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-500">
                  {item.appearances}场
                </span>
                <span className="text-green-500">
                  {item.goals}球
                </span>
                <span className="text-blue-500">
                  {item.assists}助
                </span>
              </div>
            </div>
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
  <done>PlayerCareer 组件创建完成，展示球员生涯履历</done>
</task>

<task type="auto">
  <name>Task 4: 创建 PlayerHonors 球员荣誉组件</name>
  <files>src/components/player/PlayerHonors.tsx</files>
  <action>
创建 src/components/player/PlayerHonors.tsx:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PlayerHonor } from "@/types";

interface PlayerHonorsProps {
  honors: PlayerHonor[];
}

export function PlayerHonors({ honors }: PlayerHonorsProps) {
  if (honors.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>生涯荣誉</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">暂无荣誉数据</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>生涯荣誉</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {honors.map((honor, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {honor.title}
                </div>
                <div className="text-sm text-gray-500">
                  {honor.competition} · {honor.year}
                </div>
              </div>
            </div>
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
  <done>PlayerHonors 组件创建完成，展示球员生涯荣誉</done>
</task>

<task type="auto">
  <name>Task 5: 创建 PlayerAbilityChart 球员能力雷达图组件</name>
  <files>src/components/player/PlayerAbilityChart.tsx</files>
  <action>
创建 src/components/player/PlayerAbilityChart.tsx:

```tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PlayerAbility } from "@/types";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

interface PlayerAbilityChartProps {
  ability: PlayerAbility;
}

export function PlayerAbilityChart({ ability }: PlayerAbilityChartProps) {
  const data = [
    { subject: "速度", value: ability.pace, fullMark: 100 },
    { subject: "射门", value: ability.shooting, fullMark: 100 },
    { subject: "传球", value: ability.passing, fullMark: 100 },
    { subject: "带球", value: ability.dribbling, fullMark: 100 },
    { subject: "防守", value: ability.defending, fullMark: 100 },
    { subject: "身体", value: ability.physical, fullMark: 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>能力评分</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 总体评分 - PLAYER-05 */}
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-primary-500">{ability.overall}</div>
          <div className="text-sm text-gray-500">综合评分</div>
        </div>

        {/* 雷达图 - PLAYER-05 */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "#9ca3af", fontSize: 10 }}
              />
              <Radar
                name="能力值"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 详细能力条 - PLAYER-05 */}
        <div className="mt-4 space-y-3">
          {[
            { label: "速度", value: ability.pace },
            { label: "射门", value: ability.shooting },
            { label: "传球", value: ability.passing },
            { label: "带球", value: ability.dribbling },
            { label: "防守", value: ability.defending },
            { label: "身体", value: ability.physical },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-12 text-sm text-gray-500">{item.label}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="h-2 bg-primary-500 rounded-full"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="w-8 text-sm text-right font-medium">{item.value}</span>
            </div>
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
  <done>PlayerAbilityChart 组件创建完成，使用 Recharts 展示雷达图</done>
</task>

<task type="auto">
  <name>Task 6: 创建球员详情页</name>
  <files>src/app/player/[id]/page.tsx</files>
  <action>
创建 src/app/player/[id]/page.tsx:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PlayerHeader } from "@/components/player/PlayerHeader";
import { PlayerStats } from "@/components/player/PlayerStats";
import { PlayerCareer } from "@/components/player/PlayerCareer";
import { PlayerHonors } from "@/components/player/PlayerHonors";
import { PlayerAbilityChart } from "@/components/player/PlayerAbilityChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { PlayerDetail, PlayerStats as PlayerStatsType, PlayerAbility, ApiResponse } from "@/types";

interface PlayerData {
  player: PlayerDetail;
  stats: PlayerStatsType[];
  ability: PlayerAbility;
}

export default function PlayerDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/players/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setData({
            player: result.data.player,
            stats: result.data.stats || [],
            ability: result.data.ability,
          });
          // 设置当前赛季
          if (result.data.stats && result.data.stats.length > 0) {
            setCurrentSeason(result.data.stats[0].season);
          }
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
          description={error || "球员不存在"}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="space-y-6">
        {/* 球员头部 - PLAYER-01, PLAYER-06 */}
        <PlayerHeader player={data.player} />

        {/* 能力雷达图 - PLAYER-05 */}
        {data.ability && <PlayerAbilityChart ability={data.ability} />}

        {/* 赛季数据 - PLAYER-02, PLAYER-03 */}
        {data.stats.length > 0 && (
          <PlayerStats
            stats={data.stats}
            currentSeason={currentSeason}
            onSeasonChange={setCurrentSeason}
          />
        )}

        {/* 生涯履历 */}
        {data.player.career && data.player.career.length > 0 && (
          <PlayerCareer career={data.player.career} />
        )}

        {/* 生涯荣誉 - PLAYER-04 */}
        {data.player.honors && data.player.honors.length > 0 && (
          <PlayerHonors honors={data.player.honors} />
        )}

        {/* 相关资讯 - PLAYER-07 */}
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
    <automated>npm run build 成功，/player/[id] 路由可正常访问</automated>
  </verify>
  <done>球员详情页创建完成，包含所有必需功能</done>
</task>

</tasks>

<verification>
- [ ] 用户可以查看球员基本信息（PLAYER-01）
- [ ] 用户可以切换赛季查看不同赛季数据（PLAYER-02）
- [ ] 用户可以查看球员赛季数据（PLAYER-03）
- [ ] 用户可以查看球员生涯荣誉（PLAYER-04）
- [ ] 用户可以查看球员能力维度（PLAYER-05）
- [ ] 用户可以点击所属球队进入球队详情页（PLAYER-06, COMM-01）
- [ ] 用户可以浏览球员相关新闻（PLAYER-07）
</verification>

<success_criteria>
1. 球员详情页展示完整球员信息
2. 赛季数据切换、雷达图、生涯荣誉均已实现
3. 所有跳转链接正常工作
4. 骨架屏、空状态、错误状态处理完善
</success_criteria>

<output>
After completion, create `.planning/phases/phase-02/plans/phase-02-plan-06-SUMMARY.md`
</output>