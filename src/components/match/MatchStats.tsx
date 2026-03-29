import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { MatchStats as MatchStatsType } from "@/types";

interface MatchStatsProps {
  stats: MatchStatsType;
}

export function MatchStats({ stats }: MatchStatsProps) {
  const statItems = [
    { label: "控球率", homeKey: "possession", homeUnit: "%", awayKey: "possession", awayUnit: "%" },
    { label: "射门", homeKey: "shots", awayKey: "shots" },
    { label: "射正", homeKey: "shotsOnTarget", awayKey: "shotsOnTarget" },
    { label: "角球", homeKey: "corners", awayKey: "corners" },
    { label: "越位", homeKey: "offsides", awayKey: "offsides" },
    { label: "犯规", homeKey: "fouls", awayKey: "fouls" },
    { label: "黄牌", homeKey: "yellowCards", awayKey: "yellowCards" },
    { label: "红牌", homeKey: "redCards", awayKey: "redCards" },
    { label: "传球", homeKey: "passes", awayKey: "passes" },
    { label: "传球成功率", homeKey: "passAccuracy", homeUnit: "%", awayKey: "passAccuracy", awayUnit: "%" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>比赛数据</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {statItems.map((item) => {
            const homeValue = (stats[item.homeKey as keyof typeof stats] as { home: number; away: number }).home;
            const awayValue = (stats[item.awayKey as keyof typeof stats] as { home: number; away: number }).away;
            const total = homeValue + awayValue || 1;
            const homePercent = (homeValue / total) * 100;

            return (
              <div key={item.label} className="grid grid-cols-5 gap-2 items-center">
                <div className="text-right text-sm text-gray-500">
                  {homeValue}{item.homeUnit || ""}
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <div className="flex w-full">
                    <div
                      className="h-2 bg-primary-500 rounded-l"
                      style={{ width: `${homePercent}%` }}
                    />
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700" />
                    <div
                      className="h-2 bg-primary-500 rounded-r"
                      style={{ width: `${100 - homePercent}%` }}
                    />
                  </div>
                </div>
                <div className="text-left text-sm text-gray-500">
                  {awayValue}{item.awayUnit || ""}
                </div>
              </div>
            );
          })}
        </div>

        {/* 图例 */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between text-xs text-gray-400">
            <span>{statItems[0].label}</span>
            <span>{statItems[statItems.length - 1].label}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}