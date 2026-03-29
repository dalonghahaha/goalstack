"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { League, MatchStatus } from "@/types";
import { mockLeagues } from "@/lib/mockData";

interface MatchFilterProps {
  dateFilter: "yesterday" | "today" | "tomorrow";
  leagueId: string;
  status: MatchStatus | "all";
  onDateChange: (date: "yesterday" | "today" | "tomorrow") => void;
  onLeagueChange: (leagueId: string) => void;
  onStatusChange: (status: MatchStatus | "all") => void;
}

export function MatchFilter({
  dateFilter,
  leagueId,
  status,
  onDateChange,
  onLeagueChange,
  onStatusChange,
}: MatchFilterProps) {
  const [showLeagueDropdown, setShowLeagueDropdown] = useState(false);

  const selectedLeague = mockLeagues.find((l) => l.id === leagueId);

  return (
    <div className="space-y-4">
      {/* 日期筛选 */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={dateFilter === "yesterday" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onDateChange("yesterday")}
        >
          昨天
        </Button>
        <Button
          variant={dateFilter === "today" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onDateChange("today")}
        >
          今天
        </Button>
        <Button
          variant={dateFilter === "tomorrow" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onDateChange("tomorrow")}
        >
          明天
        </Button>
      </div>

      {/* 联赛和状态筛选 */}
      <div className="flex flex-wrap gap-2">
        {/* 联赛筛选下拉 */}
        <div className="relative">
          <Button
            variant={leagueId ? "primary" : "secondary"}
            size="sm"
            onClick={() => setShowLeagueDropdown(!showLeagueDropdown)}
          >
            {selectedLeague ? selectedLeague.nameZh : "全部联赛"}
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>

          {showLeagueDropdown && (
            <div className="absolute z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  onLeagueChange("");
                  setShowLeagueDropdown(false);
                }}
              >
                全部联赛
              </button>
              {mockLeagues.map((league) => (
                <button
                  key={league.id}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    onLeagueChange(league.id);
                    setShowLeagueDropdown(false);
                  }}
                >
                  {league.nameZh}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 状态筛选 */}
        <Button
          variant={status === "all" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onStatusChange("all")}
        >
          全部
        </Button>
        <Button
          variant={status === "scheduled" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onStatusChange("scheduled")}
        >
          未开赛
        </Button>
        <Button
          variant={status === "live" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onStatusChange("live")}
        >
          进行中
        </Button>
        <Button
          variant={status === "finished" ? "primary" : "secondary"}
          size="sm"
          onClick={() => onStatusChange("finished")}
        >
          已结束
        </Button>
      </div>
    </div>
  );
}