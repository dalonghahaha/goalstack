import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Player } from "@/types";

interface TeamSquadProps {
  squad: Player[];
}

export function TeamSquad({ squad }: TeamSquadProps) {
  // 按位置分组
  const groupByPosition = (players: Player[]) => {
    const groups: Record<string, Player[]> = {
      "门将": [],
      "后卫": [],
      "中场": [],
      "前锋": [],
    };

    players.forEach((player) => {
      const pos = player.position || "";
      if (pos.includes("门")) {
        groups["门将"].push(player);
      } else if (pos.includes("后") || pos.includes("边")) {
        groups["后卫"].push(player);
      } else if (pos.includes("前") || pos.includes("腰") || pos.includes("锋") || pos.includes("边")) {
        groups["前锋"].push(player);
      } else {
        groups["中场"].push(player);
      }
    });

    return groups;
  };

  const groupedPlayers = groupByPosition(squad);

  return (
    <Card>
      <CardHeader>
        <CardTitle>球队阵容</CardTitle>
      </CardHeader>
      <CardContent>
        {squad.length === 0 ? (
          <div className="text-center text-gray-500 py-8">暂无阵容数据</div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedPlayers).map(([position, players]) => {
              if (players.length === 0) return null;

              return (
                <div key={position}>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">{position}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {players.map((player) => (
                      <Link
                        key={player.id}
                        href={`/player/${player.id}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                          {player.avatar ? (
                            <img src={player.avatar} alt={player.nameZh} className="w-full h-full object-cover rounded-full" />
                          ) : (
                            <span className="text-sm font-medium">
                              {player.number || player.nameZh.slice(0, 1)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                            {player.nameZh}
                          </div>
                          <div className="text-xs text-gray-500">{player.number}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}