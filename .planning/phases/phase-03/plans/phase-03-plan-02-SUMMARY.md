---
phase: phase-03
plan: 02
subsystem: news
tags: [news, list, filter, frontend]
dependency_graph:
  requires:
    - phase-03-plan-01
  provides:
    - 资讯中心列表页
    - 资讯筛选组件
    - 资讯卡片组件
    - 资讯列表组件
  affects:
    - src/app/news/page.tsx
    - src/components/news/
    - src/hooks/useNews.ts
tech_stack:
  added:
    - NewsFilter 组件
    - NewsCard 组件
    - NewsList 组件
    - NewsPage 页面
  patterns:
    - 客户端组件 + Suspense 边界
    - 下拉菜单交互
    - 骨架屏/空状态/错误状态处理
key_files:
  created:
    - src/components/news/NewsFilter.tsx
    - src/components/news/NewsCard.tsx
    - src/components/news/NewsList.tsx
    - src/app/news/page.tsx
  modified: []
decisions:
  - "使用 useSearchParams 需要 Suspense 边界包装"
  - "下拉菜单通过点击外部关闭"
  - "筛选状态保存在组件本地，使用 useCallback 优化性能"
metrics:
  duration: 15分钟
  completed_date: 2026-03-30
  tasks: 4/4
  files: 4
---

# Phase 03 Plan 02: 资讯中心列表页 Summary

## 概述

完成资讯中心列表页的开发，实现资讯筛选功能和列表展示。

## 任务完成情况

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | 创建 NewsFilter 资讯筛选组件 | a9eaf00 | src/components/news/NewsFilter.tsx |
| 2 | 创建 NewsCard 资讯卡片组件 | d609c39 | src/components/news/NewsCard.tsx |
| 3 | 创建 NewsList 资讯列表组件 | d609c39 | src/components/news/NewsList.tsx |
| 4 | 创建资讯列表页 | d609c39 | src/app/news/page.tsx |

## 关键实现

### NewsFilter 组件
- 资讯类型筛选（全部/比赛/球队/球员）
- 联赛筛选下拉
- 球队筛选下拉
- 点击外部关闭下拉菜单

### NewsCard 组件
- 封面图展示（支持条件渲染）
- 标题和摘要（限制行数）
- 标签展示和点击跳转
- 来源和时间展示

### NewsList 组件
- 骨架屏加载状态
- 错误状态和重试按钮
- 空状态提示
- 响应式网格布局

### NewsPage 页面
- Suspense 边界包装 useSearchParams
- 集成筛选器和列表组件
- 响应 URL 参数变化
- 骨架屏加载状态

## 验证结果

- [x] 用户可以浏览资讯列表（NEWS-01）
- [x] 用户可以按资讯类型筛选（NEWS-02）
- [x] 用户可以按联赛筛选资讯（NEWS-03）
- [x] 用户可以按球队筛选资讯（NEWS-04）
- [x] 用户可以点击资讯卡片进入详情页（COMM-01）
- [x] 用户可以点击关联标签跳转（COMM-01）

## 路由信息

- 资讯列表页: `/news`

## 提交记录

- a9eaf00 feat(phase-03-plan-02): 创建 NewsFilter 资讯筛选组件
- d609c39 feat(phase-03-plan-02): 创建资讯中心列表页及组件

## 偏差记录

### 自动修复的问题

**1. [Rule 3 - Bug] useNews Hook 参数类型不匹配**
- **发现时机**: Task 4 构建验证
- **问题**: `useNews(filter)` 参数应为 `useNews({ filter })`
- **修复**: 修改为正确的参数结构
- **文件**: src/app/news/page.tsx

**2. [Rule 2 - 缺失功能] useSearchParams 需要 Suspense 边界**
- **发现时机**: Task 4 构建验证
- **问题**: Next.js 要求 useSearchParams 在 Suspense 边界内使用
- **修复**: 将页面内容组件包装在 Suspense 中，添加骨架屏
- **文件**: src/app/news/page.tsx

## 已知 Stubs

无

## Self-Check: PASSED

- [x] 所有组件文件已创建
- [x] 所有提交已记录
- [x] 构建成功
- [x] 路由 /news 已注册