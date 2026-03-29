import { useState, useEffect } from "react";
import { PlayerDetail, PlayerStats, PlayerAbility, ApiResponse } from "@/types";

export function usePlayerDetail(id: string) {
  const [player, setPlayer] = useState<PlayerDetail | null>(null);
  const [stats, setStats] = useState<PlayerStats[]>([]);
  const [ability, setAbility] = useState<PlayerAbility | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPlayer = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/players/${id}`);
        const result = await response.json();

        if (result.success && result.data) {
          setPlayer(result.data.player);
          setStats(result.data.stats || []);
          setAbility(result.data.ability || null);
        } else {
          setError(result.error?.message || "加载失败");
        }
      } catch (err) {
        setError("网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  return { player, stats, ability, loading, error };
}