"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { TeamHeader } from "@/components/team/TeamHeader";
import { TeamSquad } from "@/components/team/TeamSquad";
import { TeamSchedule } from "@/components/team/TeamSchedule";
import { TeamStats } from "@/components/team/TeamStats";
import { TeamHonors } from "@/components/team/TeamHonors";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { TeamDetail, TeamStats as TeamStatsType, Player, Match } from "@/types";

interface TeamData {
  team: TeamDetail;
  stats: TeamStatsType;
  squad: Player[];
  upcomingMatches: Match[];
  pastMatches: Match[];
}

export default function TeamDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<TeamData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/teams/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setData({
            team: result.data.team,
            stats: result.data.stats,
            squad: result.data.squad || [],
            upcomingMatches: result.data.upcomingMatches || [],
            pastMatches: result.data.pastMatches || [],
          });
        } else {
          setError(result.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-8">
        <ListSkeleton count={3} />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container className="py-8">
        <ErrorState
          title="加载失败"
          description={error || "球队不存在"}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="space-y-6">
        {/* 球队头部 */}
        <TeamHeader team={data.team} />

        {/* 球队阵容 */}
        <TeamSquad squad={data.squad} />

        {/* 球队赛程 */}
        <TeamSchedule
          upcomingMatches={data.upcomingMatches}
          pastMatches={data.pastMatches}
        />

        {/* 球队统计 */}
        <TeamStats stats={data.stats} />

        {/* 球队荣誉 */}
        {data.team.honors && data.team.honors.length > 0 && (
          <TeamHonors honors={data.team.honors} />
        )}

        {/* 相关资讯 */}
        <Card>
          <CardHeader>
            <CardTitle>相关新闻</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-4">
              暂无相关新闻
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}