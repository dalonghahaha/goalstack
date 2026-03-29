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