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