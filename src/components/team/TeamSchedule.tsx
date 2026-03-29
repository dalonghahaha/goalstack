"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Match } from "@/types";

interface TeamScheduleProps {
  upcomingMatches: Match[];
  pastMatches: Match[];
}

export function TeamSchedule({ upcomingMatches, pastMatches }: TeamScheduleProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const matches = activeTab === "upcoming" ? upcomingMatches : pastMatches;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
      weekday: "short",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>赛程</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 切换未来/过去 */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={activeTab === "upcoming" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("upcoming")}
          >
            未来比赛
          </Button>
          <Button
            variant={activeTab === "past" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("past")}
          >
            过去比赛
          </Button>
        </div>

        {/* 比赛列表 */}
        {matches.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            暂无{activeTab === "upcoming" ? "未来" : "过去"}比赛
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <Link
                key={match.id}
                href={`/match/${match.id}`}
                className="block"
              >
                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                  {/* 日期/时间 */}
                  <div className="text-sm text-gray-500 w-20">
                    {formatDate(match.startTime)}
                  </div>

                  {/* 联赛 */}
                  <div className="text-xs text-gray-400 w-16">
                    {match.league.nameZh}
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

                  {/* 比分/时间 */}
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