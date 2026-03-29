import { NextRequest, NextResponse } from "next/server";
import { getTeamDetailById, mockTeamStats, mockPlayers } from "@/lib/mockData";
import { ApiResponse } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/teams/[id] - 获取球队详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const team = getTeamDetailById(id);

  if (!team) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "球队不存在",
      },
    };
    return NextResponse.json(response, { status: 404 });
  }

  // 获取球队球员（阵容）
  const squad = mockPlayers.filter((p) => p.team?.id === id);

  const response: ApiResponse<{
    team: typeof team;
    stats: typeof mockTeamStats;
    squad: typeof squad;
  }> = {
    success: true,
    data: {
      team,
      stats: mockTeamStats,
      squad,
    },
  };

  return NextResponse.json(response);
}