---
phase: phase-02
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/types/index.ts
  - src/lib/mockData.ts
  - src/hooks/useMatches.ts
  - src/hooks/useCompetition.ts
  - src/hooks/useTeam.ts
  - src/hooks/usePlayer.ts
  - src/app/api/matches/route.ts
  - src/app/api/competitions/route.ts
  - src/app/api/teams/route.ts
  - src/app/api/players/route.ts
autonomous: true
requirements:
  - HOME-01
  - HOME-02
  - HOME-03
  - HOME-04
  - MATCH-01
  - MATCH-02
  - MATCH-03
  - COMP-01
  - COMP-03
  - COMP-04
  - COMP-05
  - TEAM-01
  - TEAM-04
  - TEAM-05
  - PLAYER-01
  - PLAYER-02
  - PLAYER-03
  - PLAYER-05
  - COMM-01

must_haves:
  truths:
    - 比赛 API 可以返回筛选后的比赛列表
    - 赛事 API 可以返回赛事信息和积分榜/赛程
    - 球队 API 可以返回球队信息和阵容/赛程
    - 球员 API 可以返回球员信息和数据
    - Hooks 可以被各详情页复用
  artifacts:
    - path: "src/types/index.ts"
      provides: "扩展类型定义（Match, Team, League, Player, MatchStats, Competition, Standing, Lineup等）"
    - path: "src/lib/mockData.ts"
      provides: "完整的模拟数据（比赛、赛事、球队、球员）"
    - path: "src/hooks/useMatches.ts"
      provides: "比赛数据获取 Hook"
    - path: "src/hooks/useCompetition.ts"
      provides: "赛事数据获取 Hook"
    - path: "src/hooks/useTeam.ts"
      provides: "球队数据获取 Hook"
    - path: "src/hooks/usePlayer.ts"
      provides: "球员数据获取 Hook"
    - path: "src/app/api/matches/route.ts"
      provides: "比赛列表 API（支持日期、联赛、状态筛选）"
    - path: "src/app/api/competitions/route.ts"
      provides: "赛事 API（积分榜、赛程、榜单）"
    - path: "src/app/api/teams/route.ts"
      provides: "球队 API（阵容、赛程、数据）"
    - path: "src/app/api/players/route.ts"
      provides: "球员 API（数据、能力）"
  key_links:
    - from: "src/hooks/useMatches.ts"
      to: "src/app/api/matches/route.ts"
      via: "fetch 调用"
    - from: "src/app/page.tsx"
      to: "src/hooks/useMatches.ts"
      via: "导入使用"
---

<objective>
创建数据层基础设施，包括扩展类型定义、完整的模拟数据、自定义 Hooks 和 API 路由。为后续详情页开发提供数据支持。
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-01/plans/phase-01-plan-01.md
@.planning/phases/phase-01/plans/phase-01-plan-02.md
@.planning/phases/phase-01/plans/phase-01-plan-03.md
@.planning/phases/phase-02/research/RESEARCH.md

## 阶段1已有的类型（来自 phase-01-plan-03）

```typescript
// src/types/index.ts 已有类型
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

export interface Team {
  id: string;
  name: string;
  nameZh: string;
  logo?: string;
  league?: League;
}

export interface League {
  id: string;
  name: string;
  nameZh: string;
  logo?: string;
  country?: string;
}

export interface Player {
  id: string;
  name: string;
  nameZh: string;
  avatar?: string;
  position?: string;
  number?: number;
  team?: Team;
  nationality?: string;
  birthDate?: Date;
}

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

export interface MatchStats {
  possession: { home: number; away: number };
  shots: { home: number; away: number };
  shotsOnTarget: { home: number; away: number };
  corners: { home: number; away: number };
  fouls: { home: number; away: number };
  yellowCards: { home: number; away: number };
  redCards: { home: number; away: number };
}
```

## 技术要点

- 使用 Next.js App Router 的 API Routes
- 数据获取使用 React Hooks 模式
- 使用 mock 数据进行开发和验证
- API 支持查询参数筛选
</context>

<tasks>

<task type="auto">
  <name>Task 1: 扩展类型定义</name>
  <files>src/types/index.ts</files>
  <action>
扩展 src/types/index.ts 添加更多类型定义：

```typescript
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
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>类型定义扩展完成，包含 Competition, Standing, TopScorer, TeamDetail, PlayerDetail, MatchEvent, Lineup 等类型</done>
</task>

<task type="auto">
  <name>Task 2: 扩展模拟数据</name>
  <files>src/lib/mockData.ts</files>
  <action>
扩展 src/lib/mockData.ts 添加完整的模拟数据：

```typescript
import {
  Match, League, Team, Player, News, MatchStats, Competition,
  Standing, TopScorer, TeamDetail, TeamHonor, TeamStats,
  PlayerDetail, PlayerCareer, PlayerHonor, PlayerStats, PlayerAbility,
  MatchEvent, Lineup, LineupPlayer
} from "@/types";

// 扩展联赛数据
export const mockLeagues: League[] = [
  { id: "1", name: "Premier League", nameZh: "英超", logo: "", country: "英格兰" },
  { id: "2", name: "La Liga", nameZh: "西甲", logo: "", country: "西班牙" },
  { id: "3", name: "Serie A", nameZh: "意甲", logo: "", country: "意大利" },
  { id: "4", name: "Bundesliga", nameZh: "德甲", logo: "", country: "德国" },
  { id: "5", name: "Ligue 1", nameZh: "法甲", logo: "", country: "法国" },
  { id: "6", name: "Chinese Super League", nameZh: "中超", logo: "", country: "中国" },
];

// 扩展球队数据
export const mockTeams: Team[] = [
  { id: "1", name: "Manchester United", nameZh: "曼联", logo: "", league: mockLeagues[0] },
  { id: "2", name: "Liverpool", nameZh: "利物浦", logo: "", league: mockLeagues[0] },
  { id: "3", name: "Arsenal", nameZh: "阿森纳", logo: "", league: mockLeagues[0] },
  { id: "4", name: "Chelsea", nameZh: "切尔西", logo: "", league: mockLeagues[0] },
  { id: "5", name: "Manchester City", nameZh: "曼城", logo: "", league: mockLeagues[0] },
  { id: "6", name: "Tottenham Hotspur", nameZh: "热刺", logo: "", league: mockLeagues[0] },
  { id: "7", name: "Real Madrid", nameZh: "皇马", logo: "", league: mockLeagues[1] },
  { id: "8", name: "Barcelona", nameZh: "巴萨", logo: "", league: mockLeagues[1] },
];

// 扩展球员数据
export const mockPlayers: Player[] = [
  { id: "1", name: "Marcus Rashford", nameZh: "拉什福德", avatar: "", position: "前锋", number: 10, team: mockTeams[0], nationality: "英格兰", birthDate: new Date("1997-10-31") },
  { id: "2", name: "Bruno Fernandes", nameZh: "B费", avatar: "", position: "中场", number: 8, team: mockTeams[0], nationality: "葡萄牙", birthDate: new Date("1994-09-08") },
  { id: "3", name: "Mohamed Salah", nameZh: "萨拉赫", avatar: "", position: "前锋", number: 11, team: mockTeams[1], nationality: "埃及", birthDate: new Date("1992-06-15") },
  { id: "4", name: "Erling Haaland", nameZh: "哈兰德", avatar: "", position: "前锋", number: 9, team: mockTeams[4], nationality: "挪威", birthDate: new Date("2000-07-21") },
  { id: "5", name: "Kylian Mbappe", nameZh: "姆巴佩", avatar: "", position: "前锋", number: 7, team: mockTeams[0], nationality: "法国", birthDate: new Date("1998-12-20") },
];

// 赛事数据
export const mockCompetitions: Competition[] = [
  { id: "1", name: "Premier League", nameZh: "英超", logo: "", country: "英格兰", season: "2025/26", currentRound: 30, totalRounds: 38 },
];

// 积分榜数据
export const mockStandings: Standing[] = [
  { rank: 1, team: mockTeams[4], played: 30, won: 22, drawn: 5, lost: 3, goalsFor: 65, goalsAgainst: 20, goalDiff: 45, points: 71, recentForm: ["W", "W", "W", "D", "W"] },
  { rank: 2, team: mockTeams[0], played: 30, won: 18, drawn: 8, lost: 4, goalsFor: 52, goalsAgainst: 28, goalDiff: 24, points: 62, recentForm: ["W", "W", "D", "W", "L"] },
  { rank: 3, team: mockTeams[1], played: 30, won: 17, drawn: 9, lost: 4, goalsFor: 58, goalsAgainst: 30, goalDiff: 28, points: 60, recentForm: ["W", "D", "W", "W", "W"] },
  { rank: 4, team: mockTeams[2], played: 30, won: 16, drawn: 10, lost: 4, goalsFor: 50, goalsAgainst: 25, goalDiff: 25, points: 58, recentForm: ["D", "W", "W", "D", "W"] },
  { rank: 5, team: mockTeams[3], played: 30, won: 15, drawn: 8, lost: 7, goalsFor: 45, goalsAgainst: 35, goalDiff: 10, points: 53, recentForm: ["L", "W", "W", "L", "W"] },
  { rank: 6, team: mockTeams[5], played: 30, won: 14, drawn: 5, lost: 11, goalsFor: 48, goalsAgainst: 42, goalDiff: 6, points: 47, recentForm: ["W", "L", "W", "L", "L"] },
];

// 射手榜数据
export const mockTopScorers: TopScorer[] = [
  { rank: 1, player: mockPlayers[3], goals: 28, assists: 5, penaltyGoals: 5 },
  { rank: 2, player: mockPlayers[2], goals: 22, assists: 12, penaltyGoals: 3 },
  { rank: 3, player: mockPlayers[0], goals: 18, assists: 8, penaltyGoals: 2 },
  { rank: 4, player: mockPlayers[4], goals: 16, assists: 10, penaltyGoals: 4 },
  { rank: 5, player: mockPlayers[1], goals: 12, assists: 15, penaltyGoals: 0 },
];

// 球队详情数据
export const mockTeamDetails: TeamDetail[] = [
  {
    ...mockTeams[0],
    founded: 1878,
    venue: "老特拉福德",
    capacity: 74879,
    coach: "鲁本·阿莫林",
    description: "曼彻斯特联足球俱乐部（Manchester United F.C.），成立于1878年，是英格兰足球俱乐部。",
    honors: [
      { competition: "英超联赛", year: "20次", count: 20 },
      { competition: "足总杯", year: "12次", count: 12 },
      { competition: "欧冠", year: "3次", count: 3 },
    ],
  },
  {
    ...mockTeams[1],
    founded: 1892,
    venue: "安菲尔德",
    capacity: 54074,
    coach: "阿尔内·斯洛特",
    description: "利物浦足球俱乐部（Liverpool F.C.），成立于1892年，是英格兰足球俱乐部。",
    honors: [
      { competition: "英超联赛", year: "19次", count: 19 },
      { competition: "足总杯", year: "8次", count: 8 },
      { competition: "欧冠", year: "6次", count: 6 },
    ],
  },
];

// 球队统计
export const mockTeamStats: TeamStats = {
  played: 30,
  won: 18,
  drawn: 8,
  lost: 4,
  goalsFor: 52,
  goalsAgainst: 28,
  cleanSheets: 12,
  winRate: 60,
};

// 球员详情数据
export const mockPlayerDetails: PlayerDetail[] = [
  {
    ...mockPlayers[0],
    height: 185,
    weight: 70,
    birthDate: "1997-10-31",
    birthPlace: "曼彻斯特, 英格兰",
    career: [
      { season: "2025/26", team: mockTeams[0], appearances: 28, goals: 15, assists: 8 },
      { season: "2024/25", team: mockTeams[0], appearances: 32, goals: 18, assists: 10 },
    ],
    honors: [
      { competition: "英超", year: "2023", title: "最佳球员" },
    ],
  },
  {
    ...mockPlayers[3],
    height: 194,
    weight: 88,
    birthDate: "2000-07-21",
    birthPlace: "布拉格, 挪威",
    career: [
      { season: "2025/26", team: mockTeams[4], appearances: 30, goals: 28, assists: 5 },
      { season: "2024/25", team: mockTeams[4], appearances: 35, goals: 36, assists: 8 },
    ],
    honors: [
      { competition: "英超", year: "2024", title: "金靴奖" },
    ],
  },
];

// 球员能力数据
export const mockPlayerAbilities: PlayerAbility[] = [
  { overall: 85, pace: 87, shooting: 89, passing: 78, dribbling: 85, defending: 45, physical: 80 },
  { overall: 91, pace: 82, shooting: 93, passing: 80, dribbling: 87, defending: 42, physical: 88 },
];

// 比赛统计
export const mockMatchStats: MatchStats = {
  possession: { home: 58, away: 42 },
  shots: { home: 15, away: 8 },
  shotsOnTarget: { home: 6, away: 3 },
  corners: { home: 7, away: 4 },
  fouls: { home: 10, away: 14 },
  yellowCards: { home: 1, away: 3 },
  redCards: { home: 0, away: 0 },
  offsides: { home: 2, away: 3 },
  passes: { home: 520, away: 380 },
  passAccuracy: { home: 88, away: 82 },
};

// 比赛事件
export const mockMatchEvents: MatchEvent[] = [
  { id: "1", type: "goal", minute: 23, player: mockPlayers[0], team: mockTeams[0], detail: "禁区外远射破门" },
  { id: "2", type: "yellow_card", minute: 35, player: mockPlayers[1], team: mockTeams[0], detail: "战术犯规" },
  { id: "3", type: "goal", minute: 67, player: mockPlayers[2], team: mockTeams[1], detail: "接传中头球破门" },
  { id: "4", type: "substitution", minute: 70, player: mockPlayers[1], team: mockTeams[0], detail: "被替换下场" },
];

// 阵容数据
export const mockLineups: { home: Lineup; away: Lineup } = {
  home: {
    formation: "4-2-3-1",
    coach: "鲁本·阿莫林",
    players: [
      { player: { id: "10", name: "Andre Onana", nameZh: "奥纳纳", position: "门将", number: 24 }, position: "门将", number: 24 },
      { player: { id: "11", name: "Diogo Dalot", nameZh: "达洛特", position: "后卫", number: 20 }, position: "右后卫", number: 20 },
      { player: { id: "12", name: "Lisandro Martinez", nameZh: "利桑德罗", position: "后卫", number: 6 }, position: "中后卫", number: 6 },
      { player: { id: "13", name: "Raphael Varane", nameZh: "瓦拉内", position: "后卫", number: 19 }, position: "中后卫", number: 19 },
      { player: { id: "14", name: "Luke Shaw", nameZh: "卢克肖", position: "后卫", number: 23 }, position: "左后卫", number: 23 },
      { player: { id: "15", name: "Casemiro", nameZh: "卡塞米罗", position: "中场", number: 18 }, position: "后腰", number: 18 },
      { player: { id: "16", name: "Kobbie Mainoo", nameZh: "梅努", position: "中场", number: 37 }, position: "后腰", number: 37 },
      { player: mockPlayers[1], position: "前腰", number: 8 },
      { player: { id: "17", name: "Alejandro Garnacho", nameZh: "加纳乔", position: "前锋", number: 17 }, position: "右边锋", number: 17 },
      { player: mockPlayers[0], position: "前锋", number: 10 },
      { player: { id: "18", name: "Rasmus Hojlund", nameZh: "霍伊伦", position: "前锋", number: 11 }, position: "中锋", number: 11 },
    ],
    substitutes: [
      { player: { id: "19", name: "Marcus Rashford", nameZh: "拉什福德", position: "前锋", number: 10 }, position: "前锋", number: 10 },
    ],
  },
  away: {
    formation: "4-3-3",
    coach: "阿尔内·斯洛特",
    players: [
      { player: { id: "20", name: "Alisson", nameZh: "阿利松", position: "门将", number: 1 }, position: "门将", number: 1 },
      { player: { id: "21", name: "Trent Alexander-Arnold", nameZh: "阿诺德", position: "后卫", number: 66 }, position: "右后卫", number: 66 },
      { player: { id: "22", name: "Virgil van Dijk", nameZh: "范戴克", position: "后卫", number: 4 }, position: "中后卫", number: 4 },
      { player: { id: "23", name: "Ibrahima Konate", nameZh: "科内特", position: "后卫", number: 5 }, position: "中后卫", number: 5 },
      { player: { id: "24", name: "Andrew Robertson", nameZh: "罗伯逊", position: "后卫", number: 26 }, position: "左后卫", number: 26 },
      { player: { id: "25", name: "Alexis Mac Allister", nameZh: "麦卡利斯特", position: "中场", number: 10 }, position: "中场", number: 10 },
      { player: { id: "26", name: "Dominik Szoboszlai", nameZh: "索博斯洛伊", position: "中场", number: 8 }, position: "中场", number: 8 },
      { player: { id: "27", name: "Curtis Jones", nameZh: "琼斯", position: "中场", number: 17 }, position: "中场", number: 17 },
      { player: mockPlayers[2], position: "右边锋", number: 11 },
      { player: { id: "28", name: "Darwin Nunez", nameZh: "努涅斯", position: "前锋", number: 9 }, position: "中锋", number: 9 },
      { player: { id: "29", name: "Luis Diaz", nameZh: "迪亚斯", position: "前锋", number: 7 }, position: "左边锋", number: 7 },
    ],
    substitutes: [],
  },
};

// 扩展比赛数据
export const mockMatches: Match[] = [
  {
    id: "1",
    homeTeam: mockTeams[0],
    awayTeam: mockTeams[1],
    homeScore: 2,
    awayScore: 1,
    status: "finished",
    startTime: new Date("2026-03-28T20:00:00"),
    league: mockLeagues[0],
    venue: "老特拉福德",
    round: "第30轮",
  },
  {
    id: "2",
    homeTeam: mockTeams[2],
    awayTeam: mockTeams[3],
    homeScore: 0,
    awayScore: 0,
    status: "live",
    startTime: new Date("2026-03-29T22:00:00"),
    league: mockLeagues[0],
    venue: "酋长球场",
    round: "第30轮",
  },
  {
    id: "3",
    homeTeam: mockTeams[4],
    awayTeam: mockTeams[0],
    homeScore: 0,
    awayScore: 0,
    status: "scheduled",
    startTime: new Date("2026-03-30T00:30:00"),
    league: mockLeagues[0],
    venue: "伊蒂哈德",
    round: "第30轮",
  },
  {
    id: "4",
    homeTeam: mockTeams[5],
    awayTeam: mockTeams[1],
    homeScore: 1,
    awayScore: 3,
    status: "finished",
    startTime: new Date("2026-03-27T20:00:00"),
    league: mockLeagues[0],
    venue: "热刺球场",
    round: "第30轮",
  },
  {
    id: "5",
    homeTeam: mockTeams[0],
    awayTeam: mockTeams[3],
    homeScore: 0,
    awayScore: 0,
    status: "scheduled",
    startTime: new Date("2026-03-31T20:00:00"),
    league: mockLeagues[0],
    venue: "老特拉福德",
    round: "第31轮",
  },
];

// 资讯数据
export const mockNews: News[] = [
  {
    id: "1",
    title: "曼联逆转取胜，继续保持争冠希望",
    summary: "在今天凌晨结束的一场英超焦点战中，曼联主场2-1逆转击败利物浦。",
    content: "比赛详细内容...",
    publishedAt: new Date("2026-03-28T23:00:00"),
    source: "箩筐体育",
    tags: ["英超", "曼联", "利物浦"],
    relatedMatches: [mockMatches[0]],
    relatedTeams: [mockTeams[0], mockTeams[1]],
  },
  {
    id: "2",
    title: "阿森纳战平切尔西，积分榜形势微妙",
    summary: "阿森纳主场0-0战平切尔西，双方各取一分。",
    content: "比赛详细内容...",
    publishedAt: new Date("2026-03-29T01:00:00"),
    source: "箩筐体育",
    tags: ["英超", "阿森纳", "切尔西"],
    relatedMatches: [mockMatches[1]],
    relatedTeams: [mockTeams[2], mockTeams[3]],
  },
  {
    id: "3",
    title: "哈兰德大四喜，曼城领跑积分榜",
    summary: "曼城客场5-0大胜，哈兰德上演大四喜。",
    content: "比赛详细内容...",
    publishedAt: new Date("2026-03-27T23:00:00"),
    source: "箩筐体育",
    tags: ["英超", "曼城", "哈兰德"],
    relatedTeams: [mockTeams[4]],
    relatedPlayers: [mockPlayers[3]],
  },
];

// 扩展资讯以包含更多关联
export const getNewsById = (id: string): News | undefined => mockNews.find(n => n.id === id);
export const getMatchById = (id: string): Match | undefined => mockMatches.find(m => m.id === id);
export const getTeamById = (id: string): Team | undefined => mockTeams.find(t => t.id === id);
export const getTeamDetailById = (id: string): TeamDetail | undefined => mockTeamDetails.find(t => t.id === id);
export const getPlayerById = (id: string): Player | undefined => mockPlayers.find(p => p.id === id);
export const getPlayerDetailById = (id: string): PlayerDetail | undefined => mockPlayerDetails.find(p => p.id === id);
export const getCompetitionById = (id: string): Competition | undefined => mockCompetitions.find(c => c.id === id);
export const getLeagueById = (id: string): League | undefined => mockLeagues.find(l => l.id === id);
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过</automated>
  </verify>
  <done>模拟数据扩展完成，包含完整的比赛、赛事、球队、球员、资讯数据</done>
</task>

<task type="auto">
  <name>Task 3: 创建自定义 Hooks</name>
  <files>src/hooks/useMatches.ts, src/hooks/useCompetition.ts, src/hooks/useTeam.ts, src/hooks/usePlayer.ts</files>
  <action>
创建 src/hooks/useMatches.ts:

```typescript
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
```

创建 src/hooks/useCompetition.ts:

```typescript
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
```

创建 src/hooks/useTeam.ts:

```typescript
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
```

创建 src/hooks/usePlayer.ts:

```typescript
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
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过，Hooks 可以正常导入</automated>
  </verify>
  <done>自定义 Hooks 创建完成，包含 useMatches, useMatchDetail, useCompetition, useTeam, usePlayer</done>
</task>

<task type="auto">
  <name>Task 4: 创建 API 路由</name>
  <files>src/app/api/matches/route.ts, src/app/api/matches/[id]/route.ts, src/app/api/competitions/route.ts, src/app/api/competitions/[id]/route.ts, src/app/api/competitions/[id]/matches/route.ts, src/app/api/teams/route.ts, src/app/api/teams/[id]/route.ts, src/app/api/players/route.ts, src/app/api/players/[id]/route.ts</files>
  <action>
创建 src/app/api/matches/route.ts（比赛列表 API）:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { mockMatches } from "@/lib/mockData";
import { Match, ApiResponse } from "@/types";

// GET /api/matches - 获取比赛列表（支持筛选）
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date");
  const leagueId = searchParams.get("leagueId");
  const status = searchParams.get("status");

  let filteredMatches = [...mockMatches];

  // 日期筛选
  if (date) {
    const targetDate = new Date(date);
    filteredMatches = filteredMatches.filter((match) => {
      const matchDate = new Date(match.startTime);
      return matchDate.toDateString() === targetDate.toDateString();
    });
  }

  // 联赛筛选
  if (leagueId) {
    filteredMatches = filteredMatches.filter((match) => match.league.id === leagueId);
  }

  // 状态筛选
  if (status) {
    filteredMatches = filteredMatches.filter((match) => match.status === status);
  }

  const response: ApiResponse<Match[]> = {
    success: true,
    data: filteredMatches,
  };

  return NextResponse.json(response);
}
```

创建 src/app/api/matches/[id]/route.ts（比赛详情 API）:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getMatchById, mockMatchStats, mockMatchEvents, mockLineups } from "@/lib/mockData";
import { ApiResponse } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/matches/[id] - 获取比赛详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const match = getMatchById(id);

  if (!match) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "比赛不存在",
      },
    };
    return NextResponse.json(response, { status: 404 });
  }

  // 附加额外数据
  const matchDetail = {
    ...match,
    stats: mockMatchStats,
    events: mockMatchEvents,
    lineups: mockLineups,
  };

  const response: ApiResponse<typeof matchDetail> = {
    success: true,
    data: matchDetail,
  };

  return NextResponse.json(response);
}
```

创建 src/app/api/competitions/route.ts（赛事列表 API）:

```typescript
import { NextResponse } from "next/server";
import { mockCompetitions } from "@/lib/mockData";
import { Competition, ApiResponse } from "@/types";

// GET /api/competitions - 获取赛事列表
export async function GET() {
  const response: ApiResponse<Competition[]> = {
    success: true,
    data: mockCompetitions,
  };

  return NextResponse.json(response);
}
```

创建 src/app/api/competitions/[id]/route.ts（赛事详情 API）:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getCompetitionById, mockStandings, mockTopScorers } from "@/lib/mockData";
import { ApiResponse } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/competitions/[id] - 获取赛事详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const competition = getCompetitionById(id);

  if (!competition) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "赛事不存在",
      },
    };
    return NextResponse.json(response, { status: 404 });
  }

  const response: ApiResponse<{
    competition: typeof competition;
    standings: typeof mockStandings;
    topScorers: typeof mockTopScorers;
  }> = {
    success: true,
    data: {
      competition,
      standings: mockStandings,
      topScorers: mockTopScorers,
    },
  };

  return NextResponse.json(response);
}
```

创建 src/app/api/competitions/[id]/matches/route.ts（赛事赛程 API）:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { mockMatches } from "@/lib/mockData";
import { Match, ApiResponse } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/competitions/[id]/matches - 获取赛事赛程
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const round = searchParams.get("round");

  let filteredMatches = mockMatches.filter((match) => match.league.id === id);

  if (round) {
    filteredMatches = filteredMatches.filter((match) => match.round === `第${round}轮`);
  }

  const response: ApiResponse<Match[]> = {
    success: true,
    data: filteredMatches,
  };

  return NextResponse.json(response);
}
```

创建 src/app/api/teams/route.ts（球队列表 API）:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { mockTeams } from "@/lib/mockData";
import { Team, ApiResponse } from "@/types";

// GET /api/teams - 获取球队列表
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const leagueId = searchParams.get("leagueId");

  let filteredTeams = [...mockTeams];

  if (leagueId) {
    filteredTeams = filteredTeams.filter((team) => team.league?.id === leagueId);
  }

  const response: ApiResponse<Team[]> = {
    success: true,
    data: filteredTeams,
  };

  return NextResponse.json(response);
}
```

创建 src/app/api/teams/[id]/route.ts（球队详情 API）:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getTeamDetailById, mockTeamStats, mockPlayers } from "@/lib/mockData";
import { ApiResponse } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/teams/[id] - 获取球队详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const team = getTeamDetailById(id);

  if (!team) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "球队不存在",
      },
    };
    return NextResponse.json(response, { status: 404 });
  }

  // 获取球队球员（阵容）
  const squad = mockPlayers.filter((p) => p.team?.id === id);

  const response: ApiResponse<{
    team: typeof team;
    stats: typeof mockTeamStats;
    squad: typeof squad;
  }> = {
    success: true,
    data: {
      team,
      stats: mockTeamStats,
      squad,
    },
  };

  return NextResponse.json(response);
}
```

创建 src/app/api/players/route.ts（球员列表 API）:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { mockPlayers } from "@/lib/mockData";
import { Player, ApiResponse } from "@/types";

// GET /api/players - 获取球员列表
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");
  const position = searchParams.get("position");

  let filteredPlayers = [...mockPlayers];

  if (teamId) {
    filteredPlayers = filteredPlayers.filter((player) => player.team?.id === teamId);
  }

  if (position) {
    filteredPlayers = filteredPlayers.filter((player) => player.position === position);
  }

  const response: ApiResponse<Player[]> = {
    success: true,
    data: filteredPlayers,
  };

  return NextResponse.json(response);
}
```

创建 src/app/api/players/[id]/route.ts（球员详情 API）:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getPlayerDetailById, mockPlayerAbilities, mockPlayers } from "@/lib/mockData";
import { ApiResponse, PlayerStats } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/players/[id] - 获取球员详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const player = getPlayerDetailById(id);

  if (!player) {
    const response: ApiResponse<null> = {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "球员不存在",
      },
    };
    return NextResponse.json(response, { status: 404 });
  }

  // 模拟球员能力数据
  const ability = mockPlayerAbilities.find((_, index) => {
    const playerIndex = parseInt(id) - 1;
    return mockPlayerAbilities[playerIndex] || mockPlayerAbilities[0];
  });

  // 模拟赛季统计数据（从 career 转换）
  const stats: PlayerStats[] = (player.career || []).map((c) => ({
    season: c.season,
    appearances: c.appearances,
    goals: c.goals,
    assists: c.assists,
    yellowCards: Math.floor(Math.random() * 3),
    redCards: 0,
    minutesPlayed: c.appearances * 90,
  }));

  const response: ApiResponse<{
    player: typeof player;
    stats: typeof stats;
    ability: typeof ability;
  }> = {
    success: true,
    data: {
      player,
      stats,
      ability: ability || mockPlayerAbilities[0],
    },
  };

  return NextResponse.json(response);
}
```
  </action>
  <verify>
    <automated>TypeScript 类型检查通过，API 路由可以正常响应</automated>
  </verify>
  <done>API 路由创建完成，支持比赛、赛事、球队、球员的 CRUD 操作和筛选</done>
</task>

</tasks>

<verification>
- [ ] TypeScript 类型检查通过
- [ ] API 路由可以正常响应（/api/matches, /api/competitions, /api/teams, /api/players）
- [ ] 自定义 Hooks 可以正常导入和使用
- [ ] 模拟数据完整，支持所有筛选场景
</verification>

<success_criteria>
1. 数据层基础设施完善，支持阶段2所有详情页开发
2. API 路由提供完整的 CRUD 操作
3. 自定义 Hooks 可以被各详情页复用
4. 类型定义覆盖所有数据模型
</success_criteria>

<output>
After completion, create `.planning/phases/phase-02/plans/phase-02-plan-01-SUMMARY.md`
</output>