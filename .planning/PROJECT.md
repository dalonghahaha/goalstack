# 箩筐体育

## What This Is

箩筐体育 1.0 是一个面向足球爱好者，提供"高频查比赛 + 高效率看数据 + 结构化看资讯"的足球数据与资讯平台。以"比赛"为主入口，以"赛事/球队/球员"为数据沉淀对象，以"资讯"为内容补充，满足用户从赛前、赛中、赛后到日常关注的完整信息获取需求。

## Core Value

以"比赛"为核心入口，建立"可查、可信、可看懂"的足球数据平台，让用户能在 3 次点击内抵达核心详情页，实现比赛、赛事、球队、球员、资讯五大信息对象的闭环。

## Requirements

### Validated

（尚未交付 — 验证后添加）

### Active

- [ ] 首页（比赛中心页）- 比赛列表、筛选、热门资讯
- [ ] 比赛详情页 - 比分、数据、事件、阵容、资讯
- [ ] 赛事详情页 - 积分榜、赛程、榜单、球队列表
- [ ] 球队详情页 - 球队资料、阵容、赛程、数据、荣誉
- [ ] 球员详情页 - 球员资料、赛季数据、荣誉、能力维度
- [ ] 资讯列表页 - 资讯筛选、分页
- [ ] 资讯详情页 - 正文阅读、相关推荐、关联跳转
- [ ] 页面间双向跳转能力 - 五大对象全链路互通
- [ ] 明暗主题切换
- [ ] PC/移动端响应式适配

### Out of Scope

- 用户登录注册 — 关注收藏功能前置，1.0 暂不做
- 评论互动 — 社区风控成本高，1.0 暂不做
- 图文直播 — 需要实时数据能力与运营能力，P2
- 视频集锦 — 内容版权与审核成本较高，P2
- 社区帖子 — 需配套审核系统，P2
- 即时推送（开赛提醒）— 建立用户触达机制，P1
- 赔率、博彩相关模块 — 与当前定位冲突，合规风险高

## Context

- **目标市场**：以中文用户为主，资讯表达、本土联赛展示、中文搜索体验需优先优化
- **产品策略**：1.0 版本采取 **数据优先、资讯辅助** 的策略，而非纯资讯社区路线
- **MVP 目标**：建立"可查、可信、可看懂"的基础能力，验证用户价值与留存
- **设计规范**：专业、冷静、可信的视觉基调，主色 #126BFF

## Constraints

- **终端范围**：PC 端、移动端 H5 / App 首版
- **技术要求**：需要数据源支持比赛、赛事、球队、球员、资讯数据
- **性能目标**：用户能在 3 次点击内抵达核心详情页
- **体验要求**：骨架屏、空状态、异常状态、重试机制

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| 数据优先、资讯辅助 | 与泛体育信息平台差异化，避免与纯资讯社区竞争 | — Pending |
| 首版不做用户系统 | 优先保证数据可信度、页面可用性和日活留存 | — Pending |
| 粗粒度阶段划分 | Coarse 粒度，3-5 个阶段，每阶段 1-3 个计划 | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-29 after initialization*