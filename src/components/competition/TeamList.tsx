import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Team } from "@/types";

interface TeamListProps {
  teams: Team[];
}

export function TeamList({ teams }: TeamListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>参赛球队</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/team/${team.id}`}
              className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2 dark:bg-gray-700">
                <span className="text-lg font-medium">{team.nameZh.slice(0, 2)}</span>
              </div>
              <span className="text-sm font-medium text-center text-gray-900 dark:text-gray-100">
                {team.nameZh}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}