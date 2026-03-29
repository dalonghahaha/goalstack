"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { MatchHeader } from "@/components/match/MatchHeader";
import { MatchStats } from "@/components/match/MatchStats";
import { MatchEvents } from "@/components/match/MatchEvents";
import { MatchLineup } from "@/components/match/MatchLineup";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Match, MatchStats as MatchStatsType, MatchEvent, Lineup, ApiResponse } from "@/types";

interface MatchDetail extends Match {
  stats: MatchStatsType;
  events: MatchEvent[];
  lineups: {
    home: Lineup;
    away: Lineup;
  };
}

export default function MatchDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [match, setMatch] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMatch = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/matches/${id}`);
        const result: ApiResponse<MatchDetail> = await response.json();

        if (result.success && result.data) {
          setMatch(result.data);
        } else {
          setError(result.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-8">
        <ListSkeleton count={3} />
      </Container>
    );
  }

  if (error || !match) {
    return (
      <Container className="py-8">
        <ErrorState
          title="加载失败"
          description={error || "比赛不存在"}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="space-y-6">
        {/* 比赛头部信息 - MATCH-01, MATCH-02 */}
        <MatchHeader match={match} />

        {/* 比赛统计数据 - MATCH-03 */}
        {match.stats && <MatchStats stats={match.stats} />}

        {/* 比赛事件时间轴 - MATCH-04 */}
        {match.events && <MatchEvents events={match.events} />}

        {/* 阵容 - MATCH-05 */}
        {match.lineups && (
          <MatchLineup
            homeLineup={match.lineups.home}
            awayLineup={match.lineups.away}
          />
        )}

        {/* 相关资讯 - MATCH-09 */}
        <Card>
          <CardHeader>
            <CardTitle>相关资讯</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-gray-500 py-4">
              暂无相关资讯
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}