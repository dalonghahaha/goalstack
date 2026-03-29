import { NextRequest, NextResponse } from "next/server";
import { getMatchById, mockMatchStats, mockMatchEvents, mockLineups } from "@/lib/mockData";
import { ApiResponse } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/matches/[id] - 获取比赛详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const match = getMatchById(id);

  if (!match) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "比赛不存在",
      },
    };
    return NextResponse.json(response, { status: 404 });
  }

  // 附加额外数据
  const matchDetail = {
    ...match,
    stats: mockMatchStats,
    events: mockMatchEvents,
    lineups: mockLineups,
  };

  const response: ApiResponse<typeof matchDetail> = {
    success: true,
    data: matchDetail,
  };

  return NextResponse.json(response);
}