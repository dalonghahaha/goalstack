"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Lineup } from "@/types";
import Link from "next/link";

interface MatchLineupProps {
  homeLineup: Lineup;
  awayLineup: Lineup;
}

export function MatchLineup({ homeLineup, awayLineup }: MatchLineupProps) {
  const [activeTab, setActiveTab] = useState<"home" | "away">("home");

  const activeLineup = activeTab === "home" ? homeLineup : awayLineup;
  const activeName = activeTab === "home" ? "主队" : "客队";

  // 按位置分组
  const groupByPosition = (players: typeof activeLineup.players) => {
    const groups: Record<string, typeof players> = {
      "门将": [],
      "后卫": [],
      "中场": [],
      "前锋": [],
    };

    players.forEach((p) => {
      if (p.position.includes("门")) {
        groups["门将"].push(p);
      } else if (p.position.includes("后") || p.position.includes("边")) {
        groups["后卫"].push(p);
      } else if (p.position.includes("前") || p.position.includes("腰") || p.position.includes("锋") || p.position.includes("边")) {
        groups["前锋"].push(p);
      } else {
        groups["中场"].push(p);
      }
    });

    return groups;
  };

  const groupedPlayers = groupByPosition(activeLineup.players);

  return (
    <Card>
      <CardHeader>
        <CardTitle>阵容</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 阵型 */}
        <div className="text-center mb-4">
          <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {activeLineup.formation}
          </span>
          {activeLineup.coach && (
            <span className="ml-2 text-sm text-gray-500">
              主教练: {activeLineup.coach}
            </span>
          )}
        </div>

        {/* 队伍切换 */}
        <div className="flex justify-center gap-2 mb-6">
          <Button
            variant={activeTab === "home" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("home")}
          >
            主队阵容
          </Button>
          <Button
            variant={activeTab === "away" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("away")}
          >
            客队阵容
          </Button>
        </div>

        {/* 首发阵容 - MATCH-05 */}
        <div className="space-y-4">
          {Object.entries(groupedPlayers).map(([position, players]) => {
            if (players.length === 0) return null;

            return (
              <div key={position}>
                <h4 className="text-sm font-medium text-gray-500 mb-2">{position}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {players.map((item, index) => (
                    <Link
                      key={item.player.id}
                      href={`/player/${item.player.id}`}
                      className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs dark:bg-gray-700">
                        {item.number}
                      </span>
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {item.player.nameZh}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* 替补 - MATCH-05 */}
        {activeLineup.substitutes.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-medium text-gray-500 mb-2">替补</h4>
            <div className="grid grid-cols-2 gap-2">
              {activeLineup.substitutes.map((item) => (
                <Link
                  key={item.player.id}
                  href={`/player/${item.player.id}`}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs dark:bg-gray-700">
                    {item.number}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {item.player.nameZh}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}