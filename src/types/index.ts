// 比赛相关
export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  startTime: Date;
  league: League;
  venue?: string;
  round?: string;
}

export type MatchStatus = "scheduled" | "live" | "finished" | "postponed" | "cancelled";

// 球队相关
export interface Team {
  id: string;
  name: string;
  nameZh: string;
  logo?: string;
  league?: League;
}

// 联赛相关
export interface League {
  id: string;
  name: string;
  nameZh: string;
  logo?: string;
  country?: string;
}

// 球员相关
export interface Player {
  id: string;
  name: string;
  nameZh: string;
  avatar?: string;
  position?: string;
  number?: number;
  team?: Team;
  nationality?: string;
  birthDate?: string;
}

// 资讯相关
export interface News {
  id: string;
  title: string;
  summary?: string;
  content: string;
  coverImage?: string;
  publishedAt: Date;
  source?: string;
  tags?: string[];
  relatedMatches?: Match[];
  relatedTeams?: Team[];
  relatedPlayers?: Player[];
}

// ===== 资讯相关类型 =====

export interface NewsFilter {
  type?: "all" | "match" | "competition" | "team" | "player";
  leagueId?: string;
  teamId?: string;
  keyword?: string;
  page?: number;
  pageSize?: number;
}

export interface NewsCategory {
  id: string;
  name: string;
  nameZh: string;
}

// 扩展 News 类型
export interface NewsDetail extends News {
  category: NewsCategory;
  author?: string;
  viewCount?: number;
  likeCount?: number;
  shareCount?: number;
}

// ===== 扩展已有类型 =====

// 比赛统计（扩展）
export interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
  offsides: { home: number; away: number };
  passes: { home: number; away: number };
  passAccuracy: { home: number; away: number };
}

// ===== 赛事相关类型 =====

export interface Competition {
  id: string;
  name: string;
  nameZh: string;
  logo?: string;
  country?: string;
  season?: string;
  currentRound?: number;
  totalRounds?: number;
}

export interface Standing {
  rank: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  recentForm?: ("W" | "D" | "L")[];
}

export interface TopScorer {
  rank: number;
  player: Player;
  goals: number;
  assists?: number;
  penaltyGoals?: number;
}

// ===== 球队相关类型 =====

export interface TeamDetail extends Team {
  founded?: number;
  venue?: string;
  capacity?: number;
  coach?: string;
  description?: string;
  honors?: TeamHonor[];
}

export interface TeamHonor {
  competition: string;
  year: string;
  count: number;
}

export interface TeamStats {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
  winRate: number;
}

// ===== 球员相关类型 =====

export interface PlayerDetail extends Player {
  height?: number;
  weight?: number;
  birthDate?: string;
  birthPlace?: string;
  career?: PlayerCareer[];
  honors?: PlayerHonor[];
}

export interface PlayerCareer {
  season: string;
  team: Team;
  appearances: number;
  goals: number;
  assists: number;
}

export interface PlayerHonor {
  competition: string;
  year: string;
  title: string;
}

export interface PlayerStats {
  season: string;
  appearances: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
}

export interface PlayerAbility {
  overall: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

// ===== 比赛事件类型 =====

export type MatchEventType = "goal" | "own_goal" | "penalty" | "missed_penalty" | "yellow_card" | "red_card" | "substitution" | "var" | "kickoff" | "fulltime";

export interface MatchEvent {
  id: string;
  type: MatchEventType;
  minute: number;
  player?: Player;
  assistPlayer?: Player;
  team: Team;
  detail?: string;
}

// ===== 阵容类型 =====

export interface LineupPlayer {
  player: Player;
  position: string;
  number: number;
  isCaptain?: boolean;
}

export interface Lineup {
  formation: string;
  players: LineupPlayer[];
  substitutes: LineupPlayer[];
  coach?: string;
}

// ===== 筛选类型 =====

export interface MatchFilter {
  date?: string;
  leagueId?: string;
  status?: MatchStatus;
}

export interface CompetitionFilter {
  season?: string;
  round?: number;
}

export interface TeamFilter {
  leagueId?: string;
}

export interface PlayerFilter {
  teamId?: string;
  position?: string;
}

// 分页
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// API 响应
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}