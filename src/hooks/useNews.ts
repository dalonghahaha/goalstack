import { useState, useEffect } from "react";
import { News, NewsFilter, ApiResponse } from "@/types";

interface UseNewsOptions {
  filter?: NewsFilter;
  autoFetch?: boolean;
  /** 每页数据量，默认为 12 */
  pageSize?: number;
  /** 是否启用分页模式（追加模式） */
  pagination?: boolean;
}

export function useNews(options: UseNewsOptions = {}) {
  const { filter = {}, autoFetch = true, pageSize = 12, pagination = false } = options;
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (params?: NewsFilter, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (params?.type) queryParams.set("type", params.type);
      if (params?.leagueId) queryParams.set("leagueId", params.leagueId);
      if (params?.teamId) queryParams.set("teamId", params.teamId);
      if (params?.keyword) queryParams.set("keyword", params.keyword);

      // 分页参数
      const page = append ? currentPage + 1 : 1;
      queryParams.set("page", page.toString());
      queryParams.set("pageSize", pageSize.toString());

      const response = await fetch(`/api/news?${queryParams.toString()}`);
      const result: ApiResponse<News[]> = await response.json();

      if (result.success && result.data) {
        // 如果是追加模式，则合并数据，否则替换
        if (append && pagination) {
          setNews((prev) => [...prev, ...result.data!]);
        } else {
          setNews(result.data);
        }

        // 当前页数据量作为总数（实际项目中应该从后端获取总数）
        const totalCount = result.data.length;
        setTotal(totalCount);
        setTotalPages(Math.ceil(totalCount / pageSize));
        setCurrentPage(page);
        setHasMore(result.data.length === pageSize);
      } else {
        setError(result.error?.message || "加载失败");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  // 加载更多
  const loadMore = () => {
    if (!loading && hasMore) {
      fetchNews(filter, true);
    }
  };

  // 跳转到指定页
  const goToPage = (page: number) => {
    setCurrentPage(page);
    fetchNews({ ...filter, page }, false);
  };

  useEffect(() => {
    if (autoFetch) {
      // 重置分页状态
      setCurrentPage(1);
      setHasMore(true);
      fetchNews(filter, false);
    }
  }, [filter.type, filter.leagueId, filter.teamId, filter.keyword]);

  return {
    news,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    hasMore,
    loadMore,
    goToPage,
    refetch: () => fetchNews(filter, false),
  };
}

// 获取资讯详情
export function useNewsDetail(id: string) {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/news/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setNews(result.data.news || result.data);
        } else {
          setError(result.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  return { news, loading, error };
}