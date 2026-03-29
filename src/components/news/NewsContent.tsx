import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { News } from "@/types";

interface NewsContentProps {
  news: News;
}

export function NewsContent({ news }: NewsContentProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* 标题 - NEWS-05 */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {news.title}
        </h1>

        {/* 摘要 - NEWS-05 */}
        {news.summary && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {news.summary}
          </p>
        )}

        {/* 底部信息 */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <span>{news.source}</span>
          <span>·</span>
          <span>{formatDate(news.publishedAt)}</span>
        </div>

        {/* 封面图 */}
        {news.coverImage && (
          <div className="mb-6">
            <img
              src={news.coverImage}
              alt={news.title}
              className="w-full rounded-lg"
            />
          </div>
        )}

        {/* 正文内容 - NEWS-05 */}
        <div className="prose dark:prose-invert max-w-none">
          {news.content.split("\n").map((paragraph, index) => {
            // 处理 Markdown 标题
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-xl font-bold mt-6 mb-3">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            // 处理 Markdown 加粗
            const content = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
            return paragraph ? (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: content }} />
            ) : null;
          })}
        </div>

        {/* 标签 - NEWS-06 */}
        {news.tags && news.tags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/news?keyword=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}