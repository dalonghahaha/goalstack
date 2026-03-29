import { NextRequest, NextResponse } from "next/server";
import { mockPlayers } from "@/lib/mockData";
import { Player, ApiResponse } from "@/types";

// GET /api/players - 获取球员列表
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");
  const position = searchParams.get("position");

  let filteredPlayers = [...mockPlayers];

  if (teamId) {
    filteredPlayers = filteredPlayers.filter((player) => player.team?.id === teamId);
  }

  if (position) {
    filteredPlayers = filteredPlayers.filter((player) => player.position === position);
  }

  const response: ApiResponse<Player[]> = {
    success: true,
    data: filteredPlayers,
  };

  return NextResponse.json(response);
}