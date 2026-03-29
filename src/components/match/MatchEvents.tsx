import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { MatchEvent } from "@/types";
import Link from "next/link";

interface MatchEventsProps {
  events: MatchEvent[];
}

export function MatchEvents({ events }: MatchEventsProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal":
        return (
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case "yellow_card":
        return (
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
            <div className="w-4 h-2 bg-white" />
          </div>
        );
      case "red_card":
        return (
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
            <div className="w-4 h-2 bg-white" />
          </div>
        );
      case "substitution":
        return (
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
            <span className="text-white text-xs">{type[0].toUpperCase()}</span>
          </div>
        );
    }
  };

  const getEventText = (type: string) => {
    switch (type) {
      case "goal":
        return "进球";
      case "own_goal":
        return "乌龙球";
      case "penalty":
        return "点球";
      case "missed_penalty":
        return "点球罚失";
      case "yellow_card":
        return "黄牌";
      case "red_card":
        return "红牌";
      case "substitution":
        return "换人";
      case "var":
        return "VAR";
      default:
        return type;
    }
  };

  // 按时间排序
  const sortedEvents = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <Card>
      <CardHeader>
        <CardTitle>比赛事件</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <div className="text-center text-gray-500 py-8">暂无比赛事件</div>
        ) : (
          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-4">
              {sortedEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  {/* 时间 */}
                  <div className="w-10 text-right text-sm font-medium text-gray-500">
                    {event.minute}'
                  </div>

                  {/* 图标 */}
                  <div className="relative z-10">
                    {getEventIcon(event.type)}
                  </div>

                  {/* 事件详情 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {event.player?.nameZh || event.team?.nameZh || ""}
                      </span>
                      {event.player && (
                        <Link
                          href={`/player/${event.player.id}`}
                          className="text-xs text-primary-500 hover:underline"
                        >
                          查看详情
                        </Link>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {getEventText(event.type)}
                      {event.detail && ` - ${event.detail}`}
                    </div>
                    {event.assistPlayer && (
                      <div className="text-xs text-gray-400">
                        助攻: {event.assistPlayer.nameZh}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}