---
phase: phase-01
plan: 03
type: execute
wave: 3
depends_on:
  - phase-01-plan-02
files_modified:
  - src/app/page.tsx
  - src/types/index.ts
autonomous: false
requirements:
  - COMM-04
  - COMM-05
  - COMM-06

must_haves:
  truths:
    - 首页可以正常加载
    - 加载时显示骨架屏
    - 无数据时显示空状态
    - 错误时显示重试按钮
  artifacts:
    - path: "src/app/page.tsx"
      provides: "首页入口，集成所有基础组件"
    - path: "src/types/index.ts"
      provides: "TypeScript 类型定义"
  key_links:
    - from: "src/app/page.tsx"
      to: "src/components/ui/Skeleton.tsx"
      via: "导入使用"
    - from: "src/app/page.tsx"
      to: "src/components/ui/EmptyState.tsx"
      via: "导入使用"
    - from: "src/app/page.tsx"
      to: "src/components/ui/ErrorState.tsx"
      via: "导入使用"
---

<objective>
创建首页并验证所有基础组件正常工作，实现骨架屏、空状态、错误状态的实际应用。
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-01/research/RESEARCH.md
@.planning/phases/phase-01/plans/phase-01-plan-01.md
@.planning/phases/phase-01/plans/phase-01-plan-02.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: 创建类型定义</name>
  <files>src/types/index.ts</files>
  <action>
创建 src/types/index.ts 定义基础类型：

```typescript
// 比赛相关
export interface Match {
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

export type MatchStatus = "scheduled" | "live" | "finished" | "postponed" | "cancelled";

// 球队相关
export interface Team {
  id: string;
  name: string;
  nameZh: string;
  logo?: string;
  league?: League;
}

// 联赛相关
export interface League {
  id: string;
  name: string;
  nameZh: string;
  logo?: string;
  country?: string;
}

// 球员相关
export interface Player {
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

// 资讯相关
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

// 统计相关
export interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
}

// 分页
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// API 响应
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>类型定义创建完成</done>
</task>

<task type="auto">
  <name>Task 2: 创建示例数据和服务</name>
  <files>src/lib/mockData.ts</files>
  <action>
创建 src/lib/mockData.ts 用于开发和测试：

```typescript
import { Match, League, Team, News } from "@/types";

export const mockLeagues: League[] = [
  { id: "1", name: "Premier League", nameZh: "英超", logo: "", country: "England" },
  { id: "2", name: "La Liga", nameZh: "西甲", logo: "", country: "Spain" },
  { id: "3", name: "Serie A", nameZh: "意甲", logo: "", country: "Italy" },
  { id: "4", name: "Bundesliga", nameZh: "德甲", logo: "", country: "Germany" },
  { id: "5", name: "Ligue 1", nameZh: "法甲", logo: "", country: "France" },
  { id: "6", name: "Chinese Super League", nameZh: "中超", logo: "", country: "China" },
];

export const mockTeams: Team[] = [
  { id: "1", name: "Manchester United", nameZh: "曼联", league: mockLeagues[0] },
  { id: "2", name: "Liverpool", nameZh: "利物浦", league: mockLeagues[0] },
  { id: "3", name: "Arsenal", nameZh: "阿森纳", league: mockLeagues[0] },
  { id: "4", name: "Chelsea", nameZh: "切尔西", league: mockLeagues[0] },
  { id: "5", name: "Manchester City", nameZh: "曼城", league: mockLeagues[0] },
];

export const mockMatches: Match[] = [
  {
    id: "1",
    homeTeam: mockTeams[0],
    awayTeam: mockTeams[1],
    homeScore: 2,
    awayScore: 1,
    status: "finished",
    startTime: new Date("2026-03-28T20:00:00"),
    league: mockLeagues[0],
    venue: "Old Trafford",
    round: "第30轮",
  },
  {
    id: "2",
    homeTeam: mockTeams[2],
    awayTeam: mockTeams[3],
    homeScore: 0,
    awayScore: 0,
    status: "live",
    startTime: new Date("2026-03-29T22:00:00"),
    league: mockLeagues[0],
    venue: "Emirates Stadium",
    round: "第30轮",
  },
  {
    id: "3",
    homeTeam: mockTeams[4],
    awayTeam: mockTeams[0],
    homeScore: 0,
    awayScore: 0,
    status: "scheduled",
    startTime: new Date("2026-03-30T00:30:00"),
    league: mockLeagues[0],
    venue: "Etihad Stadium",
    round: "第30轮",
  },
];

export const mockNews: News[] = [
  {
    id: "1",
    title: "曼联逆转取胜，继续保持争冠希望",
    summary: "在今天凌晨结束的一场英超焦点战中，曼联主场2-1逆转击败利物浦。",
    content: "比赛详细内容...",
    publishedAt: new Date("2026-03-28T23:00:00"),
    source: "箩筐体育",
    tags: ["英超", "曼联", "利物浦"],
  },
  {
    id: "2",
    title: "阿森纳战平切尔西，积分榜形势微妙",
    summary: "阿森纳主场0-0战平切尔西，双方各取一分。",
    content: "比赛详细内容...",
    publishedAt: new Date("2026-03-29T01:00:00"),
    source: "箩筐体育",
    tags: ["英超", "阿森纳", "切尔西"],
  },
];
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>示例数据创建完成</done>
</task>

<task type="auto">
  <name>Task 3: 创建首页并演示骨架屏、空状态、错误状态</name>
  <files>src/app/page.tsx</files>
  <action>
创建 src/app/page.tsx，演示所有基础组件的使用：

```tsx
"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Match, League, News } from "@/types";
import { mockMatches, mockLeagues, mockNews } from "@/lib/mockData";

type MatchFilter = "all" | "yesterday" | "today" | "tomorrow";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [filter, setFilter] = useState<MatchFilter>("today");

  // 模拟数据加载
  const fetchMatches = async () => {
    setLoading(true);
    setError(null);

    try {
      // 模拟 API 调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 模拟数据
      setMatches(mockMatches);
    } catch (err) {
      setError("加载比赛数据失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [filter]);

  const filteredMatches = matches.filter((match) => {
    const now = new Date();
    const matchDate = new Date(match.startTime);

    if (filter === "today") {
      return matchDate.toDateString() === now.toDateString();
    } else if (filter === "tomorrow") {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return matchDate.toDateString() === tomorrow.toDateString();
    } else if (filter === "yesterday") {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      return matchDate.toDateString() === yesterday.toDateString();
    }
    return true;
  });

  return (
    <Container className="py-8">
      {/* 比赛筛选 */}
      <div className="mb-6 flex gap-2">
        <Button
          variant={filter === "yesterday" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setFilter("yesterday")}
        >
          昨天
        </Button>
        <Button
          variant={filter === "today" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setFilter("today")}
        >
          今天
        </Button>
        <Button
          variant={filter === "tomorrow" ? "primary" : "secondary"}
          size="sm"
          onClick={() => setFilter("tomorrow")}
        >
          明天
        </Button>
      </div>

      {/* 错误状态 - COMM-06 */}
      {error && (
        <ErrorState
          title="加载失败"
          description={error}
          onRetry={fetchMatches}
          className="mb-6"
        />
      )}

      {/* 骨架屏 - COMM-04 */}
      {loading && <ListSkeleton count={3} />}

      {/* 空状态 - COMM-05 */}
      {!loading && !error && filteredMatches.length === 0 && (
        <EmptyState
          title="暂无比赛"
          description="当前筛选条件下没有比赛"
          action={{
            label: "查看全部比赛",
            onClick: () => setFilter("all"),
          }}
        />
      )}

      {/* 比赛列表 */}
      {!loading && !error && filteredMatches.length > 0 && (
        <div className="space-y-4">
          {filteredMatches.map((match) => (
            <Card key={match.id} hover>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="font-medium">{match.homeTeam.nameZh}</div>
                    <div className="text-xs text-gray-500">{match.homeTeam.name}</div>
                  </div>
                </div>

                <div className="text-center">
                  {match.status === "live" ? (
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold text-primary-500">
                        {match.homeScore} - {match.awayScore}
                      </span>
                      <span className="text-xs text-red-500">比赛中</span>
                    </div>
                  ) : match.status === "finished" ? (
                    <div className="text-2xl font-bold">
                      {match.homeScore} - {match.awayScore}
                    </div>
                  ) : (
                    <div className="text-lg font-medium">
                      {new Date(match.startTime).toLocaleTimeString("zh-CN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="font-medium">{match.awayTeam.nameZh}</div>
                    <div className="text-xs text-gray-500">{match.awayTeam.name}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 资讯侧边栏示例 */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>热门资讯</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockNews.map((news) => (
                <div key={news.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <h4 className="font-medium hover:text-primary-500 cursor-pointer">
                    {news.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {news.summary}
                  </p>
                  <div className="mt-2 flex gap-2">
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
    </Container>
  );
}
```
  </action>
  <verify>
    <automated>npm run build 成功，首页可正常访问</automated>
  </verify>
  <done>首页创建完成，骨架屏、空状态、错误状态均已集成</done>
</task>

<task type="checkpoint:human-verify">
  <what-built>完整的基础架构，包括项目初始化、组件库、骨架屏、空状态、错误状态</what-built>
  <how-to-verify>
    1. 访问 http://localhost:3000
    2. 验证首页加载显示骨架屏（COMM-04）
    3. 验证数据加载后显示比赛列表
    4. 验证点击"昨天"/"明天"筛选查看空状态效果（COMM-05）
    5. 验证主题切换按钮功能
    6. 验证深色模式正确应用
  </how-to-verify>
  <resume-signal>输入 "approved" 或描述问题</resume-signal>
</task>

</tasks>

<verification>
- [ ] npm run dev 可以启动开发服务器
- [ ] 访问 http://localhost:3000 显示首页
- [ ] 骨架屏在加载时显示（COMM-04）
- [ ] 空状态在无数据时显示（COMM-05）
- [ ] 错误状态包含重试按钮（COMM-06）
- [ ] 主题切换功能正常
- [ ] 深色模式正确应用
</verification>

<success_criteria>
1. 项目已初始化，技术栈配置完成
2. 基础组件库（按钮、卡片、布局等）可复用
3. 页面加载时显示骨架屏（COMM-04）
4. 无数据时显示空状态提示（COMM-05）
5. 接口异常时显示重试按钮（COMM-06）
</success_criteria>

<output>
After completion, create `.planning/phases/phase-01/plans/phase-01-plan-03-SUMMARY.md`
</output>