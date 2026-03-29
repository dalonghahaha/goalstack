import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PlayerCareer as PlayerCareerType } from "@/types";

interface PlayerCareerProps {
  career: PlayerCareerType[];
}

export function PlayerCareer({ career }: PlayerCareerProps) {
  if (career.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>生涯履历</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">暂无生涯数据</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>生涯履历</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {career.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-16">
                  {item.season}
                </span>
                <Link
                  href={`/team/${item.team.id}`}
                  className="font-medium text-gray-900 dark:text-gray-100 hover:text-blue-500"
                >
                  {item.team.nameZh}
                </Link>
              </div>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-500">
                  {item.appearances}场
                </span>
                <span className="text-green-500">
                  {item.goals}球
                </span>
                <span className="text-blue-500">
                  {item.assists}助
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}