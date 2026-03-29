import { NextRequest, NextResponse } from "next/server";
import { getPlayerDetailById, mockPlayerAbilities, mockPlayers } from "@/lib/mockData";
import { ApiResponse, PlayerStats } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/players/[id] - 获取球员详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const player = getPlayerDetailById(id);

  if (!player) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "球员不存在",
      },
    };
    return NextResponse.json(response, { status: 404 });
  }

  // 模拟球员能力数据
  const ability = mockPlayerAbilities.find((_, index) => {
    const playerIndex = parseInt(id) - 1;
    return mockPlayerAbilities[playerIndex] || mockPlayerAbilities[0];
  });

  // 模拟赛季统计数据（从 career 转换）
  const stats: PlayerStats[] = (player.career || []).map((c) => ({
    season: c.season,
    appearances: c.appearances,
    goals: c.goals,
    assists: c.assists,
    yellowCards: Math.floor(Math.random() * 3),
    redCards: 0,
    minutesPlayed: c.appearances * 90,
  }));

  const response: ApiResponse<{
    player: typeof player;
    stats: typeof stats;
    ability: typeof ability;
  }> = {
    success: true,
    data: {
      player,
      stats,
      ability: ability || mockPlayerAbilities[0],
    },
  };

  return NextResponse.json(response);
}