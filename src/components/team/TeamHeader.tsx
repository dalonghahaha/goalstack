import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { TeamDetail } from "@/types";

interface TeamHeaderProps {
  team: TeamDetail;
}

export function TeamHeader({ team }: TeamHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        {/* 球队Logo和名称 */}
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
            {team.logo ? (
              <img src={team.logo} alt={team.nameZh} className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-3xl font-medium">{team.nameZh.slice(0, 2)}</span>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {team.nameZh}
            </h1>
            <p className="text-gray-500">{team.name}</p>

            {/* 联赛跳转 */}
            {team.league && (
              <Link
                href={`/competition/${team.league.id}`}
                className="inline-flex items-center gap-1 mt-2 text-sm text-blue-500 hover:underline"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {team.league.nameZh}
              </Link>
            )}
          </div>
        </div>

        {/* 球队基本信息 */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.founded && (
            <div>
              <div className="text-sm text-gray-500">成立时间</div>
              <div className="font-medium">{team.founded}年</div>
            </div>
          )}
          {team.venue && (
            <div>
              <div className="text-sm text-gray-500">主场</div>
              <div className="font-medium">{team.venue}</div>
            </div>
          )}
          {team.capacity && (
            <div>
              <div className="text-sm text-gray-500">容纳人数</div>
              <div className="font-medium">{team.capacity.toLocaleString()}人</div>
            </div>
          )}
          {team.coach && (
            <div>
              <div className="text-sm text-gray-500">主教练</div>
              <div className="font-medium">{team.coach}</div>
            </div>
          )}
        </div>

        {/* 简介 */}
        {team.description && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">{team.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}