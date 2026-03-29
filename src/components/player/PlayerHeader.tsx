import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { PlayerDetail } from "@/types";

interface PlayerHeaderProps {
  player: PlayerDetail;
}

export function PlayerHeader({ player }: PlayerHeaderProps) {
  // 计算年龄
  const getAge = (birthDate?: string) => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const now = new Date();
    const age = now.getFullYear() - birth.getFullYear();
    const monthDiff = now.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const age = getAge(player.birthDate);

  return (
    <Card>
      <CardContent className="p-6">
        {/* 球员头像和基本信息 - PLAYER-01 */}
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-800">
            <span className="text-3xl font-medium">{player.nameZh?.slice(0, 2) || "球"}</span>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {player.nameZh}
            </h1>
            <p className="text-gray-500">{player.name}</p>

            {/* 球衣号码 - PLAYER-01 */}
            {player.number && (
              <div className="mt-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
                {player.number}
              </div>
            )}
          </div>
        </div>

        {/* 球员详细信息 - PLAYER-01 */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {player.position && (
            <div>
              <div className="text-sm text-gray-500">位置</div>
              <div className="font-medium">{player.position}</div>
            </div>
          )}
          {age && (
            <div>
              <div className="text-sm text-gray-500">年龄</div>
              <div className="font-medium">{age}岁</div>
            </div>
          )}
          {player.nationality && (
            <div>
              <div className="text-sm text-gray-500">国籍</div>
              <div className="font-medium">{player.nationality}</div>
            </div>
          )}
          {player.birthPlace && (
            <div>
              <div className="text-sm text-gray-500">出生地</div>
              <div className="font-medium">{player.birthPlace}</div>
            </div>
          )}
        </div>

        {/* 身体信息 - PLAYER-01 */}
        {(player.height || player.weight) && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
            {player.height && (
              <div>
                <div className="text-sm text-gray-500">身高</div>
                <div className="font-medium">{player.height} cm</div>
              </div>
            )}
            {player.weight && (
              <div>
                <div className="text-sm text-gray-500">体重</div>
                <div className="font-medium">{player.weight} kg</div>
              </div>
            )}
          </div>
        )}

        {/* 所属球队跳转 - PLAYER-06 */}
        {player.team && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Link
              href={`/team/${player.team.id}`}
              className="inline-flex items-center gap-2 text-blue-500 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {player.team.nameZh}
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}