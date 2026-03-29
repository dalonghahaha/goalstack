"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { CompetitionHeader } from "@/components/competition/CompetitionHeader";
import { StandingsTable } from "@/components/competition/StandingsTable";
import { CompetitionSchedule } from "@/components/competition/CompetitionSchedule";
import { TopScorersList } from "@/components/competition/TopScorersList";
import { TeamList } from "@/components/competition/TeamList";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { Competition, Standing, TopScorer, Match, Team } from "@/types";

interface CompetitionData {
  competition: Competition;
  standings: Standing[];
  topScorers: TopScorer[];
  matches: Match[];
  teams: Team[];
}

export default function CompetitionDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<CompetitionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"standings" | "schedule" | "scorers" | "teams">("standings");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 并行获取赛事详情和赛程
        const [detailRes, matchesRes] = await Promise.all([
          fetch(`/api/competitions/${id}`),
          fetch(`/api/competitions/${id}/matches`),
        ]);

        const detailResult = await detailRes.json();
        const matchesResult = await matchesRes.json();

        if (detailResult.success && detailResult.data) {
          setData({
            competition: detailResult.data.competition,
            standings: detailResult.data.standings || [],
            topScorers: detailResult.data.topScorers || [],
            matches: matchesResult.success ? matchesResult.data || [] : [],
            teams: [],
          });
        } else {
          setError(detailResult.error?.message || "加载失败");
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
          description={error || "赛事不存在"}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  // 从积分榜提取球队列表
  const teamsFromStandings = data.standings.map((s) => s.team);

  return (
    <Container className="py-8">
      <div className="space-y-6">
        {/* 赛事头部 - COMP-01, COMP-02 */}
        <CompetitionHeader competition={data.competition} />

        {/* 标签页切换 */}
        <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "standings"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("standings")}
          >
            积分榜
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "schedule"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("schedule")}
          >
            赛程
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "scorers"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("scorers")}
          >
            射手榜
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "teams"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("teams")}
          >
            球队
          </button>
        </div>

        {/* 积分榜 - COMP-03 */}
        {activeTab === "standings" && (
          <StandingsTable standings={data.standings} />
        )}

        {/* 赛程 - COMP-04 */}
        {activeTab === "schedule" && (
          <CompetitionSchedule
            matches={data.matches}
            currentRound={data.competition.currentRound || 1}
            totalRounds={data.competition.totalRounds || 38}
          />
        )}

        {/* 射手榜 - COMP-05 */}
        {activeTab === "scorers" && (
          <TopScorersList topScorers={data.topScorers} />
        )}

        {/* 球队列表 - COMP-06, COMP-08 */}
        {activeTab === "teams" && (
          <TeamList teams={teamsFromStandings} />
        )}

        {/* 相关资讯 - COMP-07 */}
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