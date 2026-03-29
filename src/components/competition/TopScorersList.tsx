import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TopScorer } from "@/types";

interface TopScorersListProps {
  topScorers: TopScorer[];
}

export function TopScorersList({ topScorers }: TopScorersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>射手榜</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topScorers.map((scorer) => (
            <Link
              key={scorer.player.id}
              href={`/player/${scorer.player.id}`}
              className="flex items-center justify-between p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    scorer.rank === 1
                      ? "bg-yellow-500 text-white"
                      : scorer.rank === 2
                      ? "bg-gray-400 text-white"
                      : scorer.rank === 3
                      ? "bg-amber-700 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  {scorer.rank}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                  <span className="text-xs">{scorer.player.nameZh?.slice(0, 1)}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {scorer.player.nameZh}
                  </div>
                  <div className="text-xs text-gray-500">
                    {scorer.player.team?.nameZh}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-500">{scorer.goals}</div>
                <div className="text-xs text-gray-500">进球</div>
              </div>
            </Link>
          ))}
        </div>

        {/* 助攻榜提示 - COMP-05 */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="text-center text-sm text-gray-500">
            助攻榜功能开发中...
          </div>
        </div>
      </CardContent>
    </Card>
  );
}