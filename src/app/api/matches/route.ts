import { NextRequest, NextResponse } from "next/server";
import { mockMatches } from "@/lib/mockData";
import { Match, ApiResponse } from "@/types";

// GET /api/matches - 获取比赛列表（支持筛选和分页）
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date");
  const leagueId = searchParams.get("leagueId");
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");

  let filteredMatches = [...mockMatches];

  // 日期筛选
  if (date) {
    const targetDate = new Date(date);
    filteredMatches = filteredMatches.filter((match) => {
      const matchDate = new Date(match.startTime);
      return matchDate.toDateString() === targetDate.toDateString();
    });
  }

  // 联赛筛选
  if (leagueId) {
    filteredMatches = filteredMatches.filter((match) => match.league.id === leagueId);
  }

  // 状态筛选
  if (status) {
    filteredMatches = filteredMatches.filter((match) => match.status === status);
  }

  // 按时间排序
  filteredMatches.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  // 分页
  const total = filteredMatches.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedMatches = filteredMatches.slice(startIndex, startIndex + pageSize);

  const response: ApiResponse<Match[]> = {
    success: true,
    data: paginatedMatches,
    pagination: {
      currentPage: page,
      pageSize,
      total,
      totalPages,
    },
  };

  return NextResponse.json(response);
}