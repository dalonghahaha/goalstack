# 阶段3研究：资讯生态完善

**阶段**: 3
**目标**: 实现资讯浏览和关联跳转功能
**研究日期**: 2026-03-30

## 背景

阶段3需要实现资讯中心功能，包括资讯列表、筛选、详情页和关联跳转。这是继比赛、赛事、球队、球员详情页之后的最后一部分核心功能。

## Requirements 分析

### 资讯中心 (NEWS-01 ~ NEWS-07)

- **NEWS-01**: 用户可以浏览资讯列表
- **NEWS-02**: 用户可以按资讯类型筛选（全部/比赛/赛事/球队/球员）
- **NEWS-03**: 用户可以按联赛筛选资讯
- **NEWS-04**: 用户可以按球队筛选资讯
- **NEWS-05**: 用户可以进入资讯详情页阅读正文
- **NEWS-06**: 用户可以点击资讯中的关联标签跳转到对应对象页
- **NEWS-07**: 用户可以浏览相关推荐资讯

### 通用功能 (COMM-01)

- 双向跳转（比赛↔赛事↔球队↔球员↔资讯）

## 现有基础

### 已有的 News 类型定义 (src/types/index.ts)

```typescript
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
```

### 已有的 mockData (src/lib/mockData.ts)

已有 `mockNews` 数组，包含 3 条测试资讯数据，具有关联的比赛、球队、球员。

### 资讯筛选类型

需要新增：
```typescript
export interface NewsFilter {
  type?: "all" | "match" | "competition" | "team" | "player";
  leagueId?: string;
  teamId?: string;
  keyword?: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  nameZh: string;
}
```

## 实施计划

### 阶段拆分策略

**Plan A: 资讯数据层**
- 扩展 News 类型定义
- 扩展 mockData 添加更多资讯
- 创建 useNews Hook
- 创建 /api/news 路由

**Plan B: 资讯列表页**
- 创建资讯筛选组件
- 创建资讯卡片组件
- 创建资讯列表页面 /news
- 集成到首页或独立页面

**Plan C: 资讯详情页**
- 创建资讯详情页面 /news/[id]
- 实现关联标签跳转功能
- 实现相关推荐功能

### 路由设计

```
/news              - 资讯中心列表页
/news/[id]         - 资讯详情页
```

### 技术要点

1. **动态路由**: 使用 Next.js App Router 的 `[id]` 目录结构
2. **数据获取**: 使用 React Hooks 或 Server Components
3. **富文本**: 需要考虑资讯正文渲染（Markdown 或 HTML）
4. **跳转**: 使用 Next.js Link 实现关联标签跳转
5. **分页**: 使用现有的 PaginationParams 类型

### 依赖关系

- Plan A (数据层) → 无依赖
- Plan B (列表页) → 依赖 Plan A
- Plan C (详情页) → 依赖 Plan A

## 成功标准验证

- [ ] 用户可以浏览资讯列表
- [ ] 用户可以按类型/联赛/球队筛选
- [ ] 用户可以进入资讯详情页
- [ ] 用户可以点击关联标签跳转
- [ ] 用户可以查看相关推荐资讯