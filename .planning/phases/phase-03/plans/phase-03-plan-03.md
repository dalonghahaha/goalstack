---
phase: phase-03
plan: 03
type: execute
wave: 2
depends_on:
  - phase-03-plan-01
files_modified:
  - src/app/news/[id]/page.tsx
  - src/components/news/NewsContent.tsx
  - src/components/news/RelatedNews.tsx
autonomous: true
requirements:
  - NEWS-05
  - NEWS-06
  - NEWS-07
  - COMM-01

must_haves:
  truths:
    - 用户可以进入资讯详情页阅读正文
    - 用户可以点击资讯中的关联标签跳转到对应对象页
    - 用户可以浏览相关推荐资讯
  artifacts:
    - path: "src/app/news/[id]/page.tsx"
      provides: "资讯详情页入口"
    - path: "src/components/news/NewsContent.tsx"
      provides: "资讯正文内容组件"
    - path: "src/components/news/RelatedNews.tsx"
      provides: "相关推荐资讯组件"
  key_links:
    - from: "src/app/news/[id]/page.tsx"
      to: "src/components/news/NewsContent.tsx"
      via: "导入使用"
    - from: "src/components/news/NewsContent.tsx"
      to: "/team/[id], /player/[id], /match/[id]"
      via: "Next.js Link"
---

<objective>
创建资讯详情页，实现正文展示、关联跳转和相关推荐功能。
</objective>

<context>
@.planning/phases/phase-03/plans/phase-03-plan-01.md
@.planning/phases/phase-03/plans/phase-03-plan-02.md

## 已有组件参考

- src/components/ui/Card.tsx - 卡片组件
- src/components/ui/Button.tsx - 按钮组件

## 已有 Hooks 参考

- src/hooks/useNews.ts - useNews, useNewsDetail

## 数据类型参考

```typescript
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
  <name>Task 1: 创建 NewsContent 资讯正文组件</name>
  <files>src/components/news/NewsContent.tsx</files>
  <action>
创建 src/components/news/NewsContent.tsx：

```tsx
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { News } from "@/types";

interface NewsContentProps {
  news: News;
}

export function NewsContent({ news }: NewsContentProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* 标题 - NEWS-05 */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {news.title}
        </h1>

        {/* 摘要 - NEWS-05 */}
        {news.summary && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {news.summary}
          </p>
        )}

        {/* 底部信息 */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <span>{news.source}</span>
          <span>·</span>
          <span>{formatDate(news.publishedAt)}</span>
        </div>

        {/* 封面图 */}
        {news.coverImage && (
          <div className="mb-6">
            <img
              src={news.coverImage}
              alt={news.title}
              className="w-full rounded-lg"
            />
          </div>
        )}

        {/* 正文内容 - NEWS-05 */}
        <div className="prose dark:prose-invert max-w-none">
          {news.content.split("\n").map((paragraph, index) => {
            // 处理 Markdown 标题
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-xl font-bold mt-6 mb-3">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            // 处理 Markdown 加粗
            const content = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            return paragraph ? (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: content }} />
            ) : null;
          })}
        </div>

        {/* 标签 - NEWS-06 */}
        {news.tags && news.tags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/news?keyword=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {tag}
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
  <done>NewsContent 组件创建完成</done>
</task>

<task type="auto">
  <name>Task 2: 创建 RelatedNews 相关推荐组件</name>
  <files>src/components/news/RelatedNews.tsx</files>
  <action>
创建 src/components/news/RelatedNews.tsx：

```tsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { News } from "@/types";

interface RelatedNewsProps {
  news: News[];
}

export function RelatedNews({ news }: RelatedNewsProps) {
  if (news.length === 0) {
    return null;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>相关推荐</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="block"
            >
              <div className="flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-900 p-2 rounded">
                {/* 缩略图 */}
                {item.coverImage && (
                  <div className="w-20 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{item.source}</span>
                    <span>·</span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                </div>
              </div>
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
  <done>RelatedNews 组件创建完成</done>
</task>

<task type="auto">
  <name>Task 3: 创建资讯详情页</name>
  <files>src/app/news/[id]/page.tsx</files>
  <action>
创建 src/app/news/[id]/page.tsx：

```tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { NewsContent } from "@/components/news/NewsContent";
import { RelatedNews } from "@/components/news/RelatedNews";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { News, ApiResponse } from "@/types";

interface NewsDetailData {
  news: News;
  relatedNews: News[];
}

export default function NewsDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<NewsDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/news/${id}`);
        const result: ApiResponse<NewsDetailData> = await response.json();

        if (result.success && result.data) {
          setData(result.data);
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
          description={error || "资讯不存在"}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：资讯详情 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 面包屑导航 - NEWS-05 */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/news" className="hover:text-primary-500">
              资讯中心
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100">详情</span>
          </div>

          {/* 资讯正文 - NEWS-05 */}
          <NewsContent news={data.news} />

          {/* 关联对象跳转 - NEWS-06 */}
          {(data.news.relatedTeams?.length || data.news.relatedPlayers?.length) && (
            <Card>
              <CardHeader>
                <CardTitle>相关对象</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {/* 关联球队 */}
                  {data.news.relatedTeams?.map((team) => (
                    <Link
                      key={team.id}
                      href={`/team/${team.id}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-xs">{team.nameZh.slice(0, 2)}</span>
                      </div>
                      <span className="text-sm font-medium">{team.nameZh}</span>
                    </Link>
                  ))}

                  {/* 关联球员 */}
                  {data.news.relatedPlayers?.map((player) => (
                    <Link
                      key={player.id}
                      href={`/player/${player.id}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-xs">{player.nameZh.slice(0, 2)}</span>
                      </div>
                      <span className="text-sm font-medium">{player.nameZh}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 右侧：相关推荐 */}
        <div className="lg:col-span-1">
          <RelatedNews news={data.relatedNews} />

          {/* 热门资讯 - NEWS-07 */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>热门资讯</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link
                  href="/news/1"
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary-500"
                >
                  曼联逆转取胜，继续保持争冠希望
                </Link>
                <Link
                  href="/news/2"
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary-500"
                >
                  阿森纳战平切尔西，积分榜形势微妙
                </Link>
                <Link
                  href="/news/3"
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary-500"
                >
                  哈兰德大四喜，曼城领跑积分榜
                </Link>
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
    <automated>npm run build 成功，/news/[id] 路由可正常访问</automated>
  </verify>
  <done>资讯详情页创建完成</done>
</task>

</tasks>

<verification>
- [ ] 用户可以进入资讯详情页阅读正文（NEWS-05）
- [ ] 用户可以点击资讯中的关联标签跳转到对应对象页（NEWS-06）
- [ ] 用户可以浏览相关推荐资讯（NEWS-07）
</verification>

<success_criteria>
1. 资讯详情页展示完整资讯信息
2. 关联跳转功能正常工作
3. 相关推荐模块展示正确
4. 骨架屏、空状态、错误状态处理完善
</success_criteria>

<output>
After completion, create `.planning/phases/phase-03/plans/phase-03-plan-03-SUMMARY.md`
</output>