import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Match } from "@/types";

interface CompetitionScheduleProps {
  matches: Match[];
  currentRound: number;
  totalRounds: number;
  onRoundChange?: (round: number) => void;
}

export function CompetitionSchedule({
  matches,
  currentRound,
  totalRounds,
  onRoundChange,
}: CompetitionScheduleProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 生成轮次按钮
  const rounds = Array.from({ length: totalRounds }, (_, i) => i + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>赛程</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 轮次筛选 - COMP-04 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {rounds.map((round) => (
            <Button
              key={round}
              variant={round === currentRound ? "primary" : "secondary"}
              size="sm"
              onClick={() => onRoundChange?.(round)}
            >
              第{round}轮
            </Button>
          ))}
        </div>

        {/* 比赛列表 */}
        {matches.length === 0 ? (
          <div className="text-center text-gray-500 py-8">暂无比赛数据</div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <Link
                key={match.id}
                href={`/match/${match.id}`}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                  {/* 日期 */}
                  <div className="text-sm text-gray-500 w-16">
                    {new Date(match.startTime).toLocaleDateString("zh-CN", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  {/* 主队 */}
                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {match.homeTeam.nameZh}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                      <span className="text-xs">{match.homeTeam.nameZh.slice(0, 2)}</span>
                    </div>
                  </div>

                  {/* 比分 */}
                  <div className="mx-4 text-center min-w-[60px]">
                    {match.status === "finished" || match.status === "live" ? (
                      <span className="text-lg font-bold">
                        {match.homeScore} - {match.awayScore}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        {formatTime(match.startTime)}
                      </span>
                    )}
                  </div>

                  {/* 客队 */}
                  <div className="flex items-center gap-2 flex-1 justify-start">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                      <span className="text-xs">{match.awayTeam.nameZh.slice(0, 2)}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {match.awayTeam.nameZh}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}