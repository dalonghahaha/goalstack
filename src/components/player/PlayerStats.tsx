import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PlayerStats as PlayerStatsType } from "@/types";

interface PlayerStatsProps {
  stats: PlayerStatsType[];
  currentSeason: string;
  onSeasonChange?: (season: string) => void;
}

export function PlayerStats({ stats, currentSeason, onSeasonChange }: PlayerStatsProps) {
  const currentStats = stats.find((s) => s.season === currentSeason) || stats[0];

  if (!currentStats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>赛季数据</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">暂无数据</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>赛季数据</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 赛季切换 - PLAYER-02 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stats.map((stat) => (
            <Button
              key={stat.season}
              variant={stat.season === currentSeason ? "primary" : "secondary"}
              size="sm"
              onClick={() => onSeasonChange?.(stat.season)}
            >
              {stat.season}
            </Button>
          ))}
        </div>

        {/* 数据展示 - PLAYER-03 */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentStats.appearances}
            </div>
            <div className="text-sm text-gray-500">出场</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {currentStats.goals}
            </div>
            <div className="text-sm text-gray-500">进球</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {currentStats.assists}
            </div>
            <div className="text-sm text-gray-500">助攻</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {currentStats.yellowCards}
            </div>
            <div className="text-sm text-gray-500">黄牌</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-500">
              {currentStats.redCards}
            </div>
            <div className="text-sm text-gray-500">红牌</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentStats.minutesPlayed}
            </div>
            <div className="text-sm text-gray-500">出场时间</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}