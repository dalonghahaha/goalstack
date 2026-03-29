import { NextRequest, NextResponse } from "next/server";
import { mockMatches } from "@/lib/mockData";
import { Match, ApiResponse } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/competitions/[id]/matches - 获取赛事赛程
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const round = searchParams.get("round");

  let filteredMatches = mockMatches.filter((match) => match.league.id === id);

  if (round) {
    filteredMatches = filteredMatches.filter((match) => match.round === `第${round}轮`);
  }

  const response: ApiResponse<Match[]> = {
    success: true,
    data: filteredMatches,
  };

  return NextResponse.json(response);
}