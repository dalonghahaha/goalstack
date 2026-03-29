import { NextRequest, NextResponse } from "next/server";
import { mockTeams } from "@/lib/mockData";
import { Team, ApiResponse } from "@/types";

// GET /api/teams - 获取球队列表
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const leagueId = searchParams.get("leagueId");

  let filteredTeams = [...mockTeams];

  if (leagueId) {
    filteredTeams = filteredTeams.filter((team) => team.league?.id === leagueId);
  }

  const response: ApiResponse<Team[]> = {
    success: true,
    data: filteredTeams,
  };

  return NextResponse.json(response);
}