import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TeamHonor } from "@/types";

interface TeamHonorsProps {
  honors: TeamHonor[];
}

export function TeamHonors({ honors }: TeamHonorsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>球队荣誉</CardTitle>
      </CardHeader>
      <CardContent>
        {honors.length === 0 ? (
          <div className="text-center text-gray-500 py-8">暂无荣誉数据</div>
        ) : (
          <div className="space-y-3">
            {honors.map((honor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {honor.competition}
                    </div>
                    <div className="text-sm text-gray-500">{honor.year}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-yellow-500">
                  {honor.count}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}