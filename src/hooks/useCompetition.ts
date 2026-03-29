import { useState, useEffect } from "react";
import { Competition, Standing, TopScorer, Match, ApiResponse } from "@/types";

interface UseCompetitionOptions {
  id: string;
}

export function useCompetition({ id }: UseCompetitionOptions) {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCompetition = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/competitions/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setCompetition(result.data.competition);
          setStandings(result.data.standings || []);
          setTopScorers(result.data.topScorers || []);
        } else {
          setError(result.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchCompetition();
  }, [id]);

  return { competition, standings, topScorers, loading, error };
}

// 获取赛事赛程
export function useCompetitionMatches(id: string, round?: number) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const query = round ? `?round=${round}` : "";
        const response = await fetch(`/api/competitions/${id}/matches${query}`);
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

    fetchMatches();
  }, [id, round]);

  return { matches, loading, error };
}