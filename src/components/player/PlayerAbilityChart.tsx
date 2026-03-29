"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PlayerAbility } from "@/types";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

interface PlayerAbilityChartProps {
  ability: PlayerAbility;
}

export function PlayerAbilityChart({ ability }: PlayerAbilityChartProps) {
  const data = [
    { subject: "速度", value: ability.pace, fullMark: 100 },
    { subject: "射门", value: ability.shooting, fullMark: 100 },
    { subject: "传球", value: ability.passing, fullMark: 100 },
    { subject: "带球", value: ability.dribbling, fullMark: 100 },
    { subject: "防守", value: ability.defending, fullMark: 100 },
    { subject: "身体", value: ability.physical, fullMark: 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>能力评分</CardTitle>
      </CardHeader>
      <CardContent>
        {/* 总体评分 - PLAYER-05 */}
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-blue-500">{ability.overall}</div>
          <div className="text-sm text-gray-500">综合评分</div>
        </div>

        {/* 雷达图 - PLAYER-05 */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: "#9ca3af", fontSize: 10 }}
              />
              <Radar
                name="能力值"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 详细能力条 - PLAYER-05 */}
        <div className="mt-4 space-y-3">
          {[
            { label: "速度", value: ability.pace },
            { label: "射门", value: ability.shooting },
            { label: "传球", value: ability.passing },
            { label: "带球", value: ability.dribbling },
            { label: "防守", value: ability.defending },
            { label: "身体", value: ability.physical },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="w-12 text-sm text-gray-500">{item.label}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="w-8 text-sm text-right font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}