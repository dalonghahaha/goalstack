import { NextResponse } from "next/server";
import { mockCompetitions } from "@/lib/mockData";
import { Competition, ApiResponse } from "@/types";

// GET /api/competitions - 获取赛事列表
export async function GET() {
  const response: ApiResponse<Competition[]> = {
    success: true,
    data: mockCompetitions,
  };

  return NextResponse.json(response);
}