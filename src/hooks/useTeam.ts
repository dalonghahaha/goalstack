import { useState, useEffect } from "react";
import { TeamDetail, TeamStats, Player, Match, ApiResponse } from "@/types";

export function useTeamDetail(id: string) {
  const [team, setTeam] = useState<TeamDetail | null>(null);
  const [stats, setStats] = useState<TeamStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTeam = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/teams/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setTeam(result.data.team);
          setStats(result.data.stats || null);
        } else {
          setError(result.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  return { team, stats, loading, error };
}

// 获取球队阵容
export function useTeamSquad(id: string) {
  const [squad, setSquad] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSquad = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/teams/${id}/squad`);
        const result: ApiResponse<Player[]> = await response.json();

        if (result.success && result.data) {
          setSquad(result.data);
        } else {
          setError(result.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchSquad();
  }, [id]);

  return { squad, loading, error };
}

// 获取球队赛程
export function useTeamMatches(id: string, type: "upcoming" | "past" = "upcoming") {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchMatches = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/teams/${id}/matches?type=${type}`);
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
  }, [id, type]);

  return { matches, loading, error };
}