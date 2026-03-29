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