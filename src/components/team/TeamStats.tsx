import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TeamStats as TeamStatsType } from "@/types";

interface TeamStatsProps {
  stats: TeamStatsType;
}

export function TeamStats({ stats }: TeamStatsProps) {
  const goalDiff = stats.goalsFor - stats.goalsAgainst;

  const statItems = [
    { label: "场次", value: stats.played },
    { label: "胜", value: stats.won, color: "text-green-500" },
    { label: "平", value: stats.drawn, color: "text-yellow-500" },
    { label: "负", value: stats.lost, color: "text-red-500" },
    { label: "进球", value: stats.goalsFor },
    { label: "失球", value: stats.goalsAgainst },
    { label: "净胜球", value: goalDiff, color: goalDiff > 0 ? "text-green-500" : goalDiff < 0 ? "text-red-500" : "" },
    { label: "零封", value: stats.cleanSheets },
    { label: "胜率", value: `${stats.winRate}%` },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>赛季数据</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
          {statItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className={`text-2xl font-bold ${item.color || "text-gray-900 dark:text-gray-100"}`}>
                {item.value}
              </div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
          ))}
        </div>

        {/* 额外统计 */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">胜率</span>
            <span className="font-medium">{stats.winRate}%</span>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${stats.winRate}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}