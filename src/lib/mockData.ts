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
  { id: "1", name: "Marcus Rashford", nameZh: "拉什福德", avatar: "", position: "前锋", number: 10, team: mockTeams[0], nationality: "英格兰", birthDate: "1997-10-31" },
  { id: "2", name: "Bruno Fernandes", nameZh: "B费", avatar: "", position: "中场", number: 8, team: mockTeams[0], nationality: "葡萄牙", birthDate: "1994-09-08" },
  { id: "3", name: "Mohamed Salah", nameZh: "萨拉赫", avatar: "", position: "前锋", number: 11, team: mockTeams[1], nationality: "埃及", birthDate: "1992-06-15" },
  { id: "4", name: "Erling Haaland", nameZh: "哈兰德", avatar: "", position: "前锋", number: 9, team: mockTeams[4], nationality: "挪威", birthDate: "2000-07-21" },
  { id: "5", name: "Kylian Mbappe", nameZh: "姆巴佩", avatar: "", position: "前锋", number: 7, team: mockTeams[0], nationality: "法国", birthDate: "1998-12-20" },
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

// 辅助函数
export const getNewsById = (id: string): News | undefined => mockNews.find(n => n.id === id);
export const getMatchById = (id: string): Match | undefined => mockMatches.find(m => m.id === id);
export const getTeamById = (id: string): Team | undefined => mockTeams.find(t => t.id === id);
export const getTeamDetailById = (id: string): TeamDetail | undefined => mockTeamDetails.find(t => t.id === id);
export const getPlayerById = (id: string): Player | undefined => mockPlayers.find(p => p.id === id);
export const getPlayerDetailById = (id: string): PlayerDetail | undefined => mockPlayerDetails.find(p => p.id === id);
export const getCompetitionById = (id: string): Competition | undefined => mockCompetitions.find(c => c.id === id);
export const getLeagueById = (id: string): League | undefined => mockLeagues.find(l => l.id === id);