import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Match } from "@/types";

interface MatchHeaderProps {
  match: Match & {
    stats?: unknown;
    events?: unknown;
    lineups?: unknown;
  };
}

export function MatchHeader({ match }: MatchHeaderProps) {
  const formatDateTime = (date: Date) => {
    const d = new Date(date);
    return {
      date: d.toLocaleDateString("zh-CN", { month: "short", day: "numeric", weekday: "short" }),
      time: d.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const { date, time } = formatDateTime(match.startTime);

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "比赛中";
      case "finished":
        return "已结束";
      case "scheduled":
        return "未开赛";
      case "postponed":
        return "推迟";
      case "cancelled":
        return "取消";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* 联赛和轮次 - MATCH-01 */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <Link
            href={`/competition/${match.league.id}`}
            className="text-primary-500 hover:underline text-sm"
          >
            {match.league.nameZh}
          </Link>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-500">{match.round}</span>
        </div>

        {/* 球队和比分 - MATCH-02 */}
        <div className="flex items-center justify-between">
          {/* 主队 - MATCH-07 */}
          <div className="flex flex-col items-center flex-1">
            <Link href={`/team/${match.homeTeam.id}`} className="group">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2 group-hover:bg-primary-100 dark:bg-gray-800">
                <span className="text-lg font-medium">
                  {match.homeTeam.nameZh.slice(0, 2)}
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-500">
                {match.homeTeam.nameZh}
              </span>
            </Link>
          </div>

          {/* 比分 */}
          <div className="flex flex-col items-center mx-4">
            {match.status === "live" ? (
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-primary-500">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="mt-1 text-sm text-red-500 font-medium">比赛中</span>
              </div>
            ) : match.status === "finished" ? (
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="mt-1 text-sm text-gray-500">已结束</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-gray-400">VS</span>
                <span className="mt-1 text-sm text-gray-500">{time}</span>
              </div>
            )}
          </div>

          {/* 客队 - MATCH-07 */}
          <div className="flex flex-col items-center flex-1">
            <Link href={`/team/${match.awayTeam.id}`} className="group">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2 group-hover:bg-primary-100 dark:bg-gray-800">
                <span className="text-lg font-medium">
                  {match.awayTeam.nameZh.slice(0, 2)}
                </span>
              </div>
              <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-500">
                {match.awayTeam.nameZh}
              </span>
            </Link>
          </div>
        </div>

        {/* 比赛信息 - MATCH-01 */}
        <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
          {match.venue && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{match.venue}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date} {time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}