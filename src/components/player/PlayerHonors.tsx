import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PlayerHonor } from "@/types";

interface PlayerHonorsProps {
  honors: PlayerHonor[];
}

export function PlayerHonors({ honors }: PlayerHonorsProps) {
  if (honors.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>生涯荣誉</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">暂无荣誉数据</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>生涯荣誉</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {honors.map((honor, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
            >
              <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {honor.title}
                </div>
                <div className="text-sm text-gray-500">
                  {honor.competition} · {honor.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}