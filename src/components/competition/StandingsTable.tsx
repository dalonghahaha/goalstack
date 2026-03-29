import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Standing } from "@/types";

interface StandingsTableProps {
  standings: Standing[];
}

export function StandingsTable({ standings }: StandingsTableProps) {
  const getFormColor = (result: "W" | "D" | "L") => {
    switch (result) {
      case "W":
        return "bg-green-500";
      case "D":
        return "bg-yellow-500";
      case "L":
        return "bg-red-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>积分榜</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-2 text-sm font-medium text-gray-500">排名</th>
                <th className="text-left py-2 px-2 text-sm font-medium text-gray-500">球队</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">场次</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">胜</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">平</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">负</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">进球</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">失球</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">净胜</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">积分</th>
                <th className="text-center py-2 px-2 text-sm font-medium text-gray-500">近5场</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing) => (
                <tr
                  key={standing.team.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="py-3 px-2">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                        standing.rank <= 4
                          ? "bg-green-500 text-white"
                          : standing.rank <= 6
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {standing.rank}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <Link
                      href={`/team/${standing.team.id}`}
                      className="flex items-center gap-2 hover:text-blue-500"
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center dark:bg-gray-700">
                        <span className="text-xs">{standing.team.nameZh.slice(0, 2)}</span>
                      </div>
                      <span className="font-medium">{standing.team.nameZh}</span>
                    </Link>
                  </td>
                  <td className="py-3 px-2 text-center text-sm">{standing.played}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.won}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.drawn}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.lost}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.goalsFor}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.goalsAgainst}</td>
                  <td className="py-3 px-2 text-center text-sm">{standing.goalDiff}</td>
                  <td className="py-3 px-2 text-center text-sm font-bold">{standing.points}</td>
                  <td className="py-3 px-2">
                    <div className="flex justify-center gap-0.5">
                      {standing.recentForm?.map((form, index) => (
                        <span
                          key={index}
                          className={`w-4 h-4 rounded text-white text-xs flex items-center justify-center ${getFormColor(form)}`}
                        >
                          {form}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}