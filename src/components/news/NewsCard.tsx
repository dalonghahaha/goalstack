import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { News } from "@/types";

interface NewsCardProps {
  news: News;
}

export function NewsCard({ news }: NewsCardProps) {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Link href={`/news/${news.id}`}>
      <Card hover className="cursor-pointer h-full">
        {/* 封面图 */}
        {news.coverImage && (
          <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-gray-200 dark:bg-gray-800">
            <img
              src={news.coverImage}
              alt={news.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <CardContent className="p-4">
          {/* 标题 */}
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2">
            {news.title}
          </h3>

          {/* 摘要 */}
          {news.summary && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
              {news.summary}
            </p>
          )}

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-3">
            {news.tags?.map((tag) => (
              <Link
                key={tag}
                href={`/news?keyword=${encodeURIComponent(tag)}`}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* 底部信息 */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{news.source}</span>
            <span>{formatDate(news.publishedAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}