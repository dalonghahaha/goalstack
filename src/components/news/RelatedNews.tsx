import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { News } from "@/types";

interface RelatedNewsProps {
  news: News[];
}

export function RelatedNews({ news }: RelatedNewsProps) {
  if (news.length === 0) {
    return null;
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>相关推荐</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              className="block"
            >
              <div className="flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-900 p-2 rounded">
                {/* 缩略图 */}
                {item.coverImage && (
                  <div className="w-20 h-14 flex-shrink-0 rounded overflow-hidden bg-gray-200">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* 内容 */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                    <span>{item.source}</span>
                    <span>·</span>
                    <span>{formatDate(item.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}