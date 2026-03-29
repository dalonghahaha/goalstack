---
phase: phase-02
plan: 01
subsystem: data-layer
tags: [next.js, typescript, api-routes, react-hooks, mock-data]

# Dependency graph
requires:
  - phase: phase-01
    provides: 基础组件库、类型定义、模拟数据框架
provides:
  - 扩展的类型定义（Competition, Standing, TopScorer, TeamDetail, PlayerDetail, MatchEvent, Lineup等）
  - 完整的模拟数据（比赛、赛事、球队、球员、资讯）
  - 自定义 Hooks（useMatches, useCompetition, useTeam, usePlayer）
  - API 路由（matches, competitions, teams, players 及动态路由）
affects: [phase-02-plan-02, phase-02-plan-03, phase-02-plan-04, phase-02-plan-05, phase-02-plan-06]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "API 路由模式：使用 Next.js App Router 的 API Routes"
    - "自定义 Hooks：封装数据获取逻辑"
    - "统一 API 响应格式：ApiResponse<T> 包装器"

key-files:
  created:
    - src/types/index.ts
    - src/lib/mockData.ts
    - src/hooks/useMatches.ts
    - src/hooks/useCompetition.ts
    - src/hooks/useTeam.ts
    - src/hooks/usePlayer.ts
    - src/app/api/matches/route.ts
    - src/app/api/matches/[id]/route.ts
    - src/app/api/competitions/route.ts
    - src/app/api/competitions/[id]/route.ts
    - src/app/api/competitions/[id]/matches/route.ts
    - src/app/api/teams/route.ts
    - src/app/api/teams/[id]/route.ts
    - src/app/api/players/route.ts
    - src/app/api/players/[id]/route.ts
  modified: []

key-decisions:
  - "使用统一的 ApiResponse<T> 响应格式封装所有 API 返回值"
  - "Player.birthDate 使用 string 类型而非 Date，避免类型扩展冲突"
  - "使用 URLSearchParams 构建查询字符串，支持多种筛选条件"

patterns-established:
  - "API 路由：GET 方法处理筛选参数，返回统一格式响应"
  - "自定义 Hooks：使用 useState 管理状态，useEffect 处理副作用"
  - "模拟数据：通过辅助函数（getXxxById）提供按 ID 查询能力"

requirements-completed: [HOME-01, HOME-02, HOME-03, HOME-04, MATCH-01, MATCH-02, MATCH-03, COMP-01, COMP-03, COMP-04, COMP-05, TEAM-01, TEAM-04, TEAM-05, PLAYER-01, PLAYER-02, PLAYER-03, PLAYER-05, COMM-01]

# Metrics
duration: 33 min
completed: 2026-03-29
---

# Phase 2 Plan 1: 数据层基础设施 Summary

**扩展类型定义、完整的模拟数据、自定义 Hooks 和 API 路由，为后续详情页开发提供数据支持**

## Performance

- **Duration:** 33 min
- **Started:** 2026-03-29T15:51:28Z
- **Completed:** 2026-03-29T16:24:36Z
- **Tasks:** 4
- **Files modified:** 15

## Accomplishments
- 扩展了类型定义，添加 Competition, Standing, TopScorer, TeamDetail, PlayerDetail, MatchEvent, Lineup 等类型
- 扩展了模拟数据，包含完整的比赛、赛事、球队、球员、资讯数据
- 创建了自定义 Hooks（useMatches, useMatchDetail, useCompetition, useCompetitionMatches, useTeamDetail, useTeamSquad, useTeamMatches, usePlayerDetail）
- 创建了 API 路由，支持比赛、赛事、球队、球员的 CRUD 操作和筛选

## Task Commits

Each task was committed atomically:

1. **Task 1: 扩展类型定义** - `dea0169` (feat)
2. **Task 2: 扩展模拟数据** - `dea0169` (feat)
3. **Task 3: 创建自定义 Hooks** - `dea0169` (feat)
4. **Task 4: 创建 API 路由** - `dea0169` (feat)

**Plan metadata:** `dea0169` (docs: complete plan)

## Files Created/Modified
- `src/types/index.ts` - 扩展类型定义
- `src/lib/mockData.ts` - 完整的模拟数据
- `src/hooks/useMatches.ts` - 比赛数据获取 Hook
- `src/hooks/useCompetition.ts` - 赛事数据获取 Hook
- `src/hooks/useTeam.ts` - 球队数据获取 Hook
- `src/hooks/usePlayer.ts` - 球员数据获取 Hook
- `src/app/api/matches/route.ts` - 比赛列表 API
- `src/app/api/matches/[id]/route.ts` - 比赛详情 API
- `src/app/api/competitions/route.ts` - 赛事列表 API
- `src/app/api/competitions/[id]/route.ts` - 赛事详情 API
- `src/app/api/competitions/[id]/matches/route.ts` - 赛事赛程 API
- `src/app/api/teams/route.ts` - 球队列表 API
- `src/app/api/teams/[id]/route.ts` - 球队详情 API
- `src/app/api/players/route.ts` - 球员列表 API
- `src/app/api/players/[id]/route.ts` - 球员详情 API

## Decisions Made
- 使用统一的 ApiResponse<T> 响应格式封装所有 API 返回值
- Player.birthDate 使用 string 类型而非 Date，避免类型扩展冲突
- 使用 URLSearchParams 构建查询字符串，支持多种筛选条件

## Deviations from Plan

None - plan executed exactly as written.

### Auto-fixed Issues

**1. [Rule 1 - Bug] 修复 Player.birthDate 类型冲突**
- **Found during:** Task 1 (TypeScript 类型检查)
- **Issue:** PlayerDetail 继承 Player 时，birthDate 类型不兼容（Date vs string）
- **Fix:** 将 Player.birthDate 类型从 Date 改为 string
- **Files modified:** src/types/index.ts, src/lib/mockData.ts
- **Verification:** TypeScript 类型检查通过
- **Committed in:** dea0169 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** 修复类型错误是正确性要求，无范围蔓延。

## Issues Encountered
- 无

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- 数据层基础设施完成，可支持后续详情页开发
- 所有 API 路由和自定义 Hooks 已就绪

---
*Phase: phase-02-plan-01*
*Completed: 2026-03-29*