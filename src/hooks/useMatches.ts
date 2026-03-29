import { useState, useEffect } from "react";
import { Match, MatchFilter, ApiResponse } from "@/types";

interface UseMatchesOptions {
  filter?: MatchFilter;
  autoFetch?: boolean;
}

export function useMatches(options: UseMatchesOptions = {}) {
  const { filter = {}, autoFetch = true } = options;
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = async (params?: MatchFilter) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (params?.date) queryParams.set("date", params.date);
      if (params?.leagueId) queryParams.set("leagueId", params.leagueId);
      if (params?.status) queryParams.set("status", params.status);

      const response = await fetch(`/api/matches?${queryParams.toString()}`);
      const result: ApiResponse<Match[]> = await response.json();

      if (result.success && result.data) {
        setMatches(result.data);
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
      fetchMatches(filter);
    }
  }, [filter.date, filter.leagueId, filter.status]);

  return {
    matches,
    loading,
    error,
    refetch: () => fetchMatches(filter),
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