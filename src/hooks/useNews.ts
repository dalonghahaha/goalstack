import { useState, useEffect } from "react";
import { News, NewsFilter, ApiResponse } from "@/types";

interface UseNewsOptions {
  filter?: NewsFilter;
  autoFetch?: boolean;
}

export function useNews(options: UseNewsOptions = {}) {
  const { filter = {}, autoFetch = true } = options;
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchNews = async (params?: NewsFilter) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (params?.type) queryParams.set("type", params.type);
      if (params?.leagueId) queryParams.set("leagueId", params.leagueId);
      if (params?.teamId) queryParams.set("teamId", params.teamId);
      if (params?.keyword) queryParams.set("keyword", params.keyword);
      if (params?.page) queryParams.set("page", params.page.toString());
      if (params?.pageSize) queryParams.set("pageSize", params.pageSize.toString());

      const response = await fetch(`/api/news?${queryParams.toString()}`);
      const result: ApiResponse<News[]> = await response.json();

      if (result.success && result.data) {
        setNews(result.data);
        setTotal(result.data.length);
      } else {
        setError(result.error?.message || "加载失败");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchNews(filter);
    }
  }, [filter.type, filter.leagueId, filter.teamId, filter.keyword, filter.page]);

  return {
    news,
    loading,
    error,
    total,
    refetch: () => fetchNews(filter),
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