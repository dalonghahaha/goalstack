import { NextRequest, NextResponse } from "next/server";
import { getCompetitionById, mockStandings, mockTopScorers } from "@/lib/mockData";
import { ApiResponse } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/competitions/[id] - 获取赛事详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const competition = getCompetitionById(id);

  if (!competition) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "赛事不存在",
      },
    };
    return NextResponse.json(response, { status: 404 });
  }

  const response: ApiResponse<{
    competition: typeof competition;
    standings: typeof mockStandings;
    topScorers: typeof mockTopScorers;
  }> = {
    success: true,
    data: {
      competition,
      standings: mockStandings,
      topScorers: mockTopScorers,
    },
  };

  return NextResponse.json(response);
}