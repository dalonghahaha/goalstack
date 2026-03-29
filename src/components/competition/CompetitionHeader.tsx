import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Competition } from "@/types";

interface CompetitionHeaderProps {
  competition: Competition;
  onSeasonChange?: (season: string) => void;
}

export function CompetitionHeader({ competition, onSeasonChange }: CompetitionHeaderProps) {
  // 模拟赛季选项
  const seasons = ["2025/26", "2024/25", "2023/24", "2022/23"];

  return (
    <Card>
      <CardContent className="p-6">
        {/* 赛事Logo和名称 - COMP-01 */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
            <span className="text-2xl font-medium">{competition.nameZh.slice(0, 2)}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {competition.nameZh}
            </h1>
            <p className="text-sm text-gray-500">
              {competition.country} · {competition.season}
            </p>
          </div>
        </div>

        {/* 赛季切换 - COMP-02 */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">赛季:</span>
          {seasons.map((season) => (
            <Button
              key={season}
              variant={season === competition.season ? "primary" : "secondary"}
              size="sm"
              onClick={() => onSeasonChange?.(season)}
            >
              {season}
            </Button>
          ))}
        </div>

        {/* 赛事信息 - COMP-01 */}
        <div className="mt-4 flex gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>第{competition.currentRound}轮 / 共{competition.totalRounds}轮</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}