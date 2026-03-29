import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Match } from "@/types";

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  return (
    <Link href={`/match/${match.id}`}>
      <Card hover className="cursor-pointer">
        <CardContent className="flex items-center justify-between p-4">
          {/* 联赛信息 */}
          <div className="flex flex-col items-center justify-center w-20">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {match.league.nameZh}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {match.round}
            </span>
          </div>

          {/* 主队 */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
                <span className="text-xs font-medium">
                  {match.homeTeam.nameZh.slice(0, 2)}
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {match.homeTeam.nameZh}
              </span>
            </div>
          </div>

          {/* 比分/时间 */}
          <div className="flex flex-col items-center mx-4 min-w-[80px]">
            {match.status === "live" ? (
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-red-500">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="text-xs text-red-500 font-medium">比赛中</span>
              </div>
            ) : match.status === "finished" ? (
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="text-xs text-gray-400">已结束</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {formatTime(match.startTime)}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(match.startTime)}
                </span>
              </div>
            )}
          </div>

          {/* 客队 */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {match.awayTeam.nameZh}
              </span>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
                <span className="text-xs font-medium">
                  {match.awayTeam.nameZh.slice(0, 2)}
                </span>
              </div>
            </div>
          </div>

          {/* 赛事跳转 */}
          <div className="w-20 flex flex-col items-center">
            <Link
              href={`/competition/${match.league.id}`}
              className="text-xs text-primary-500 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {match.league.nameZh}
            </Link>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}