"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PlayerHeader } from "@/components/player/PlayerHeader";
import { PlayerStats } from "@/components/player/PlayerStats";
import { PlayerCareer } from "@/components/player/PlayerCareer";
import { PlayerHonors } from "@/components/player/PlayerHonors";
import { PlayerAbilityChart } from "@/components/player/PlayerAbilityChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { PlayerDetail, PlayerStats as PlayerStatsType, PlayerAbility } from "@/types";

interface PlayerData {
  player: PlayerDetail;
  stats: PlayerStatsType[];
  ability: PlayerAbility;
}

export default function PlayerDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/players/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setData({
            player: result.data.player,
            stats: result.data.stats || [],
            ability: result.data.ability,
          });
          // 设置当前赛季
          if (result.data.stats && result.data.stats.length > 0) {
            setCurrentSeason(result.data.stats[0].season);
          }
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
          description={error || "球员不存在"}
          onRetry={() => window.location.reload()}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="space-y-6">
        {/* 球员头部 - PLAYER-01, PLAYER-06 */}
        <PlayerHeader player={data.player} />

        {/* 能力雷达图 - PLAYER-05 */}
        {data.ability && <PlayerAbilityChart ability={data.ability} />}

        {/* 赛季数据 - PLAYER-02, PLAYER-03 */}
        {data.stats.length > 0 && (
          <PlayerStats
            stats={data.stats}
            currentSeason={currentSeason}
            onSeasonChange={setCurrentSeason}
          />
        )}

        {/* 生涯履历 */}
        {data.player.career && data.player.career.length > 0 && (
          <PlayerCareer career={data.player.career} />
        )}

        {/* 生涯荣誉 - PLAYER-04 */}
        {data.player.honors && data.player.honors.length > 0 && (
          <PlayerHonors honors={data.player.honors} />
        )}

        {/* 相关资讯 - PLAYER-07 */}
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