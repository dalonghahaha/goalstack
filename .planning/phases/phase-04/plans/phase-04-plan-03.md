---
phase: phase-04
plan: 03
type: execute
wave: 2
depends_on: []
files_modified:
  - src/hooks/useIntersectionObserver.ts
  - src/components/ui/Pagination.tsx
  - src/components/ui/LoadMore.tsx
  - src/components/news/NewsList.tsx
  - src/components/match/MatchList.tsx
  - src/hooks/useNews.ts
  - src/hooks/useMatches.ts
autonomous: true
requirements:
  - COMM-07
must_haves:
  truths:
    - "PC 端支持分页功能"
    - "移动端支持加载更多功能"
    - "支持手动点击加载和可选触底加载"
  artifacts:
    - path: "src/hooks/useIntersectionObserver.ts"
      provides: "交叉观察器钩子，用于触底加载"
    - path: "src/components/ui/Pagination.tsx"
      provides: "PC 端分页组件"
    - path: "src/components/ui/LoadMore.tsx"
      provides: "移动端加载更多组件"
  key_links:
    - from: "src/components/ui/LoadMore.tsx"
      to: "src/hooks/useIntersectionObserver.ts"
      via: "使用交叉观察器实现触底加载"
      pattern: "useIntersectionObserver"
---

<objective>
实现分页和加载更多功能，PC 端使用分页组件，移动端使用加载更多按钮，支持可选触底加载。

Purpose: 提升用户体验，让用户能够高效地浏览大量数据，避免一次性加载过多数据导致的性能问题。

Output: useIntersectionObserver 钩子、Pagination 组件、LoadMore 组件、列表组件优化
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@src/components/ui/Button.tsx
@src/components/news/NewsList.tsx
@src/components/match/MatchList.tsx
@src/hooks/useNews.ts
@src/hooks/useMatches.ts
</context>

<tasks>

<task type="auto">
  <name>创建 useIntersectionObserver 钩子</name>
  <files>src/hooks/useIntersectionObserver.ts</files>
  <read_first>src/hooks/useNews.ts</read_first>
  <action>
    1. 创建 `src/hooks/useIntersectionObserver.ts` 钩子
    2. 实现 IntersectionObserver 封装，用于检测元素是否进入视口
    3. 支持 rootMargin 和 threshold 配置
    4. 提供 ref 用于绑定观察的元素
  </action>
  <acceptance_criteria>
    - 文件 `src/hooks/useIntersectionObserver.ts` 存在
    - 钩子返回 ref 用于绑定观察元素
    - 钩子返回 isIntersecting 状态
    - 支持 rootMargin 和 threshold 配置
  </acceptance_criteria>
  <verify>
    <automated>npm run build 无错误</automated>
  </verify>
  <done>useIntersectionObserver 钩子创建完成</done>
</task>

<task type="auto">
  <name>创建 Pagination 分页组件</name>
  <files>src/components/ui/Pagination.tsx</files>
  <read_first>src/components/ui/Button.tsx</read_first>
  <action>
    1. 创建 `src/components/ui/Pagination.tsx` 组件
    2. 实现页码显示，包含首页、上一页、页码按钮、下一页、末页
    3. 支持当前页高亮显示
    4. 支持响应式布局（移动端简化显示）
    5. 支持禁用状态
  </action>
  <acceptance_criteria>
    - 文件 `src/components/ui/Pagination.tsx` 存在
    - 组件接收 currentPage、totalPages、onPageChange 属性
    - 点击页码可以切换页面
    - 上一页/下一页按钮在边界情况下禁用
    - 支持暗色主题
  </acceptance_criteria>
  <verify>
    <automated>npm run build 无错误</automated>
  </verify>
  <done>Pagination 组件创建完成，PC 端分页功能可用</done>
</task>

<task type="auto">
  <name>创建 LoadMore 加载更多组件</name>
  <files>src/components/ui/LoadMore.tsx</files>
  <read_first>src/components/ui/Button.tsx, src/hooks/useIntersectionObserver.ts</read_first>
  <action>
    1. 创建 `src/components/ui/LoadMore.tsx` 组件
    2. 实现加载更多按钮
    3. 支持自动触底加载（可选，通过 props 启用）
    4. 显示加载状态
    5. 显示没有更多数据的状态
  </action>
  <acceptance_criteria>
    - 文件 `src/components/ui/LoadMore.tsx` 存在
    - 组件接收 onClick、loading、hasMore、autoLoad 属性
    - 点击按钮触发加载更多
    - 支持自动触底加载（通过 useIntersectionObserver）
    - 显示加载中状态和没有更多数据的状态
  </acceptance_criteria>
  <verify>
    <automated>npm run build 无错误</automated>
  </verify>
  <done>LoadMore 组件创建完成，移动端加载更多功能可用</done>
</task>

<task type="auto">
  <name>优化数据 Hook 支持分页</name>
  <files>src/hooks/useNews.ts, src/hooks/useMatches.ts</files>
  <read_first>src/hooks/useNews.ts, src/hooks/useMatches.ts</read_first>
  <action>
    1. 优化 `useNews.ts`，添加分页支持
       - 添加 currentPage、pageSize、total 状态
       - 添加 loadMore 方法，支持追加数据
       - 添加 fetchPage 方法，支持替换数据
    2. 优化 `useMatches.ts`，添加分页支持
       - 添加 currentPage、pageSize、total 状态
       - 添加 loadMore 方法
       - 添加 fetchPage 方法
  </action>
  <acceptance_criteria>
    - useNews 返回 currentPage、pageSize、total 信息
    - useNews 返回 loadMore 和 fetchPage 方法
    - useMatches 返回 currentPage、pageSize、total 信息
    - useMatches 返回 loadMore 和 fetchPage 方法
  </acceptance_criteria>
  <verify>
    <automated>npm run build 无错误</automated>
  </verify>
  <done>数据 Hook 分页支持优化完成</done>
</task>

<task type="auto">
  <name>集成分页功能到列表组件</name>
  <files>src/components/news/NewsList.tsx, src/components/match/MatchList.tsx</files>
  <read_first>src/components/news/NewsList.tsx, src/components/match/MatchList.tsx</read_first>
  <action>
    1. 优化 `NewsList.tsx`
       - 添加分页相关 props（currentPage、totalPages、onPageChange、loadMore、hasMore、loadingMore）
       - 在 PC 端显示 Pagination 组件
       - 在移动端显示 LoadMore 组件
    2. 优化 `MatchList.tsx`
       - 添加分页相关 props
       - 在 PC 端显示 Pagination 组件
       - 在移动端显示 LoadMore 组件
  </action>
  <acceptance_criteria>
    - NewsList 组件接收分页相关 props
    - NewsList 在 PC 端（>= 1024px）显示 Pagination
    - NewsList 在移动端（< 1024px）显示 LoadMore
    - MatchList 组件接收分页相关 props
    - MatchList 在 PC 端显示 Pagination
    - MatchList 在移动端显示 LoadMore
  </acceptance_criteria>
  <verify>
    <automated>npm run build 无错误</automated>
  </verify>
  <done>列表组件分页功能集成完成</done>
</task>

</tasks>

<verification>
1. 运行 `npm run build` 确保无错误
2. 验证 PC 端分页功能
3. 验证移动端加载更多功能
4. 验证触底加载功能（可选）
</verification>

<success_criteria>
- PC 端支持分页功能
- 移动端支持加载更多功能
- 支持手动点击加载和可选触底加载
</success_criteria>

<output>
After completion, create `.planning/phases/phase-04/phase-04-plan-03-SUMMARY.md`
</output>
