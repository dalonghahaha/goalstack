import { NextRequest, NextResponse } from "next/server";
import { mockMatches } from "@/lib/mockData";
import { Match, ApiResponse } from "@/types";

// GET /api/matches - 获取比赛列表（支持筛选）
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date");
  const leagueId = searchParams.get("leagueId");
  const status = searchParams.get("status");

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

  const response: ApiResponse<Match[]> = {
    success: true,
    data: filteredMatches,
  };

  return NextResponse.json(response);
}