"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { NewsFilter as NewsFilterType, Team, League } from "@/types";
import { mockLeagues, mockTeams } from "@/lib/mockData";

interface NewsFilterProps {
  filter: NewsFilterType;
  onTypeChange: (type: NewsFilterType["type"]) => void;
  onLeagueChange: (leagueId: string) => void;
  onTeamChange: (teamId: string) => void;
}

export function NewsFilter({
  filter,
  onTypeChange,
  onLeagueChange,
  onTeamChange,
}: NewsFilterProps) {
  const [showLeagueDropdown, setShowLeagueDropdown] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  const selectedLeague = mockLeagues.find((l) => l.id === filter.leagueId);
  const selectedTeam = mockTeams.find((t) => t.id === filter.teamId);

  const newsTypes = [
    { value: "all", label: "全部" },
    { value: "match", label: "比赛" },
    { value: "team", label: "球队" },
    { value: "player", label: "球员" },
  ];

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setShowLeagueDropdown(false);
        setShowTeamDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="space-y-4">
      {/* 资讯类型筛选 */}
      <div className="flex flex-wrap gap-2">
        {newsTypes.map((type) => (
          <Button
            key={type.value}
            variant={filter.type === type.value ? "primary" : "secondary"}
            size="sm"
            onClick={() => onTypeChange(type.value as NewsFilterType["type"])}
          >
            {type.label}
          </Button>
        ))}
      </div>

      {/* 联赛和球队筛选 */}
      <div className="flex flex-wrap gap-2">
        {/* 联赛筛选下拉 */}
        <div className="relative dropdown-container">
          <Button
            variant={filter.leagueId ? "primary" : "secondary"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowLeagueDropdown(!showLeagueDropdown);
              setShowTeamDropdown(false);
            }}
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
                onClick={(e) => {
                  e.stopPropagation();
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
                  onClick={(e) => {
                    e.stopPropagation();
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

        {/* 球队筛选下拉 */}
        <div className="relative dropdown-container">
          <Button
            variant={filter.teamId ? "primary" : "secondary"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowTeamDropdown(!showTeamDropdown);
              setShowLeagueDropdown(false);
            }}
          >
            {selectedTeam ? selectedTeam.nameZh : "全部球队"}
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>

          {showTeamDropdown && (
            <div className="absolute z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900 max-h-60 overflow-y-auto">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={(e) => {
                  e.stopPropagation();
                  onTeamChange("");
                  setShowTeamDropdown(false);
                }}
              >
                全部球队
              </button>
              {mockTeams.map((team) => (
                <button
                  key={team.id}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTeamChange(team.id);
                    setShowTeamDropdown(false);
                  }}
                >
                  {team.nameZh}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}