import { useState, useEffect } from "react";
import { Match, MatchFilter, ApiResponse } from "@/types";

interface UseMatchesOptions {
  filter?: MatchFilter;
  autoFetch?: boolean;
  /** 每页数据量，默认为 10 */
  pageSize?: number;
  /** 是否启用分页模式（追加模式） */
  pagination?: boolean;
}

export function useMatches(options: UseMatchesOptions = {}) {
  const { filter = {}, autoFetch = true, pageSize = 10, pagination = false } = options;
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchMatches = async (params?: MatchFilter, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (params?.date) queryParams.set("date", params.date);
      if (params?.leagueId) queryParams.set("leagueId", params.leagueId);
      if (params?.status) queryParams.set("status", params.status);

      // 分页参数
      const page = append ? currentPage + 1 : 1;
      queryParams.set("page", page.toString());
      queryParams.set("pageSize", pageSize.toString());

      const response = await fetch(`/api/matches?${queryParams.toString()}`);
      const result: ApiResponse<Match[]> = await response.json();

      if (result.success && result.data) {
        // 如果是追加模式，则合并数据，否则替换
        if (append && pagination) {
          setMatches((prev) => [...prev, ...result.data!]);
        } else {
          setMatches(result.data);
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
      fetchMatches(filter, true);
    }
  };

  // 跳转到指定页
  const goToPage = (page: number) => {
    setCurrentPage(page);
    fetchMatches(filter, false);
  };

  useEffect(() => {
    if (autoFetch) {
      // 重置分页状态
      setCurrentPage(1);
      setHasMore(true);
      fetchMatches(filter, false);
    }
  }, [filter.date, filter.leagueId, filter.status]);

  return {
    matches,
    loading,
    error,
    total,
    currentPage,
    totalPages,
    hasMore,
    loadMore,
    goToPage,
    refetch: () => fetchMatches(filter, false),
  };
}

// 获取单场比赛详情
export function useMatchDetail(id: string) {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMatch = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/matches/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setMatch(result.data);
        } else {
          setError(result.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  return { match, loading, error };
}