---
phase: phase-03
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/types/index.ts
  - src/lib/mockData.ts
  - src/hooks/useNews.ts
  - src/app/api/news/route.ts
  - src/app/api/news/[id]/route.ts
autonomous: true
requirements:
  - NEWS-01
  - COMM-01

must_haves:
  truths:
    - 资讯 API 可以返回资讯列表
    - 资讯 API 支持筛选参数
    - 资讯 Hook 可以被列表页和详情页复用
    - mockData 包含足够测试数据
  artifacts:
    - path: "src/types/index.ts"
      provides: "扩展 NewsFilter, NewsCategory 类型"
    - path: "src/lib/mockData.ts"
      provides: "扩展 mockNews 模拟数据（添加更多分类）"
    - path: "src/hooks/useNews.ts"
      provides: "useNews, useNewsDetail Hook"
    - path: "src/app/api/news/route.ts"
      provides: "资讯列表 API（支持分页、筛选）"
    - path: "src/app/api/news/[id]/route.ts"
      provides: "资讯详情 API"
  key_links:
    - from: "src/hooks/useNews.ts"
      to: "src/app/api/news/route.ts"
      via: "fetch 调用"
---

<objective>
创建资讯数据层基础设施，包括扩展类型定义、模拟数据、自定义 Hooks 和 API 路由。
</objective>

<context>
@.planning/phases/phase-03/research/RESEARCH.md

## 已有类型（来自 phase-01, phase-02）

```typescript
// 当前 News 类型
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

## 需要新增的类型

```typescript
// 资讯筛选
export interface NewsFilter {
  type?: "all" | "match" | "competition" | "team" | "player";
  leagueId?: string;
  teamId?: string;
  page?: number;
  pageSize?: number;
}

// 资讯分类
export interface NewsCategory {
  id: string;
  name: string;
  nameZh: string;
}
```
</context>

<tasks>

<task type="auto">
  <name>Task 1: 扩展类型定义</name>
  <files>src/types/index.ts</files>
  <action>
扩展 src/types/index.ts 添加资讯相关类型：

```typescript
// ===== 资讯相关类型 =====

export interface NewsFilter {
  type?: "all" | "match" | "competition" | "team" | "player";
  leagueId?: string;
  teamId?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export interface NewsCategory {
  id: string;
  name: string;
  nameZh: string;
}

// 扩展 News 类型
export interface NewsDetail extends News {
  category: NewsCategory;
  author?: string;
  viewCount?: number;
  likeCount?: number;
  shareCount?: number;
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>类型定义扩展完成</done>
</task>

<task type="auto">
  <name>Task 2: 扩展模拟数据</name>
  <files>src/lib/mockData.ts</files>
  <action>
扩展 src/lib/mockData.ts 添加更多资讯数据：

```typescript
// 资讯分类
export const mockNewsCategories: NewsCategory[] = [
  { id: "1", name: "match", nameZh: "比赛" },
  { id: "2", name: "competition", nameZh: "赛事" },
  { id: "3", name: "team", nameZh: "球队" },
  { id: "4", name: "player", nameZh: "球员" },
  { id: "5", name: "transfer", nameZh: "转会" },
  { id: "6", name: "interview", nameZh: "专访" },
];

// 扩展资讯数据
export const mockNews: News[] = [
  {
    id: "1",
    title: "曼联逆转取胜，继续保持争冠希望",
    summary: "在今天凌晨结束的一场英超焦点战中，曼联主场2-1逆转击败利物浦。",
    content: `
## 比赛概述

在今天凌晨结束的一场英超焦点战中，曼联主场2-1逆转击败利物浦，继续保持争冠希望。

## 比赛进程

上半场第25分钟，利ussels先拔头筹，萨拉赫接队友传球后冷静推射破门。半场结束时，曼联0-1落后。

下半场易边再战，曼联加强进攻。第65分钟，拉什福德接B费传球后禁区内抽射破门，扳平比分。第82分钟，替补登场的加纳乔接到卡塞米罗的直塞球，单刀破门，帮助球队完成逆转。

## 赛后评论

曼联主教练阿莫林表示："这是一场伟大的逆转胜利，球队展现了永不放弃的精神。"

## 技术统计

- 控球率：曼联58% vs 利物浦42%
- 射门：曼联15次 vs 利物浦8次
- 射正：曼联6次 vs 利物浦3次
    `,
    coverImage: "/images/news/1.jpg",
    publishedAt: new Date("2026-03-28T23:00:00"),
    source: "箩筐体育",
    tags: ["英超", "曼联", "利物浦"],
    relatedMatches: [mockMatches[0]],
    relatedTeams: [mockTeams[0], mockTeams[1]],
    relatedPlayers: [mockPlayers[0], mockPlayers[2]],
  },
  {
    id: "2",
    title: "阿森纳战平切尔西，积分榜形势微妙",
    summary: "阿森纳主场0-0战平切尔西，双方各取一分。",
    content: "比赛详细内容...",
    publishedAt: new Date("2026-03-29T01:00:00"),
    source: "箩筐体育",
    tags: ["英超", "阿森纳", "切尔西"],
    relatedMatches: [mockMatches[1]],
    relatedTeams: [mockTeams[2], mockTeams[3]],
  },
  {
    id: "3",
    title: "哈兰德大四喜，曼城领跑积分榜",
    summary: "曼城客场5-0大胜，哈兰德上演大四喜。",
    content: "比赛详细内容...",
    publishedAt: new Date("2026-03-27T23:00:00"),
    source: "箩筐体育",
    tags: ["英超", "曼城", "哈兰德"],
    relatedTeams: [mockTeams[4]],
    relatedPlayers: [mockPlayers[3]],
  },
  {
    id: "4",
    title: "皇马官方宣布签下天才前锋",
    summary: "皇家马德里官方宣布签下巴西天才前锋，签约5年。",
    content: "详细内容...",
    publishedAt: new Date("2026-03-26T20:00:00"),
    source: "箩筐体育",
    tags: ["西甲", "皇马", "转会"],
    relatedTeams: [mockTeams[6]],
  },
  {
    id: "5",
    title: "梅西专访：期待与内马尔再次合作",
    summary: "梅西接受采访谈到加盟巴萨的感受和未来目标。",
    content: "详细内容...",
    publishedAt: new Date("2026-03-25T18:00:00"),
    source: "箩筐体育",
    tags: ["专访", "梅西", "巴萨"],
    relatedPlayers: [],
  },
];

// 辅助函数
export const getNewsById = (id: string): News | undefined =>
  mockNews.find((n) => n.id === id);

export const getNewsByTeamId = (teamId: string): News[] =>
  mockNews.filter((n) => n.relatedTeams?.some((t) => t.id === teamId));

export const getNewsByPlayerId = (playerId: string): News[] =>
  mockNews.filter((n) => n.relatedPlayers?.some((p) => p.id === playerId));

export const getNewsByLeagueId = (leagueId: string): News[] =>
  mockNews.filter((n) => n.relatedTeams?.some((t) => t.league?.id === leagueId));
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>模拟数据扩展完成</done>
</task>

<task type="auto">
  <name>Task 3: 创建自定义 Hooks</name>
  <files>src/hooks/useNews.ts</files>
  <action>
创建 src/hooks/useNews.ts：

```typescript
import { useState, useEffect } from "react";
import { News, NewsFilter, ApiResponse } from "@/types";

export function useNews(filter: NewsFilter = {}) {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchNews = async (params?: NewsFilter) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (params?.type) queryParams.set("type", params.type);
      if (params?.leagueId) queryParams.set("leagueId", params.leagueId);
      if (params?.teamId) queryParams.set("teamId", params.teamId);
      if (params?.keyword) queryParams.set("keyword", params.keyword);
      if (params?.page) queryParams.set("page", params.page.toString());
      if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());

      const response = await fetch(`/api/news?${queryParams.toString()}`);
      const result: ApiResponse<News[]> = await response.json();

      if (result.success && result.data) {
        setNews(result.data);
      } else {
        setError(result.error?.message || "加载失败");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(filter);
  }, [filter.type, filter.leagueId, filter.teamId, filter.keyword, filter.page]);

  return {
    news,
    loading,
    error,
    total,
    refetch: () => fetchNews(filter),
  };
}

// 获取资讯详情
export function useNewsDetail(id: string) {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/news/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setNews(result.data);
        } else {
          setError(result.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  return { news, loading, error };
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>自定义 Hooks 创建完成</done>
</task>

<task type="auto">
  <name>Task 4: 创建 API 路由</name>
  <files>src/app/api/news/route.ts, src/app/api/news/[id]/route.ts</files>
  <action>
创建 src/app/api/news/route.ts：

```typescript
import { NextRequest, NextResponse } from "next/server";
import { mockNews } from "@/lib/mockData";
import { News, ApiResponse } from "@/types";

// GET /api/news - 获取资讯列表（支持筛选）
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const type = searchParams.get("type");
  const leagueId = searchParams.get("leagueId");
  const teamId = searchParams.get("teamId");
  const keyword = searchParams.get("keyword");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  let filteredNews = [...mockNews];

  // 类型筛选
  if (type && type !== "all") {
    // 根据关联对象筛选
    filteredNews = filteredNews.filter((news) => {
      switch (type) {
        case "match":
          return news.relatedMatches && news.relatedMatches.length > 0;
        case "team":
          return news.relatedTeams && news.relatedTeams.length > 0;
        case "player":
          return news.relatedPlayers && news.relatedPlayers.length > 0;
        default:
          return true;
      }
    });
  }

  // 联赛筛选
  if (leagueId) {
    filteredNews = filteredNews.filter((news) =>
      news.relatedTeams?.some((team) => team.league?.id === leagueId)
    );
  }

  // 球队筛选
  if (teamId) {
    filteredNews = filteredNews.filter((news) =>
      news.relatedTeams?.some((team) => team.id === teamId)
    );
  }

  // 关键词搜索
  if (keyword) {
    const lowerKeyword = keyword.toLowerCase();
    filteredNews = filteredNews.filter(
      (news) =>
        news.title.toLowerCase().includes(lowerKeyword) ||
        news.summary?.toLowerCase().includes(lowerKeyword) ||
        news.tags?.some((tag) => tag.toLowerCase().includes(lowerKeyword))
    );
  }

  // 按发布时间排序
  filteredNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // 分页
  const total = filteredNews.length;
  const start = (page - 1) * pageSize;
  const paginatedNews = filteredNews.slice(start, start + pageSize);

  const response: ApiResponse<News[]> = {
    success: true,
    data: paginatedNews,
  };

  return NextResponse.json(response);
}
```

创建 src/app/api/news/[id]/route.ts：

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getNewsById, mockNews } from "@/lib/mockData";
import { ApiResponse, News } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/news/[id] - 获取资讯详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const news = getNewsById(id);

  if (!news) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "资讯不存在",
      },
    };
    return NextResponse.json(response, { status: 404 });
  }

  // 获取相关推荐资讯
  const relatedNews = mockNews
    .filter((n) => n.id !== id)
    .filter((n) => {
      // 基于关联球队和球员推荐
      const relatedTeamIds = news.relatedTeams?.map((t) => t.id) || [];
      const relatedPlayerIds = news.relatedPlayers?.map((p) => p.id) || [];
      return (
        n.relatedTeams?.some((t) => relatedTeamIds.includes(t.id)) ||
        n.relatedPlayers?.some((p) => relatedPlayerIds.includes(p.id))
      );
    })
    .slice(0, 3);

  const response: ApiResponse<{
    news: News;
    relatedNews: News[];
  }> = {
    success: true,
    data: {
      news,
      relatedNews,
    },
  };

  return NextResponse.json(response);
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>API 路由创建完成</done>
</task>

</tasks>

<verification>
- [ ] TypeScript 类型检查通过
- [ ] API 路由可以正常响应（/api/news, /api/news/[id]）
- [ ] 自定义 Hooks 可以正常导入和使用
- [ ] 模拟数据完整，支持所有筛选场景
</verification>

<success_criteria>
1. 资讯数据层基础设施完善，支持后续详情页开发
2. API 路由提供完整的资讯列表和详情
3. 自定义 Hooks 可以被各页面复用
4. 类型定义覆盖所有资讯相关数据模型
</success_criteria>

<output>
After completion, create `.planning/phases/phase-03/plans/phase-03-plan-01-SUMMARY.md`
</output>