---
phase: phase-04
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/ui/ThemeScript.tsx
  - src/components/layout/Header.tsx
  - src/app/layout.tsx
autonomous: true
requirements:
  - COMM-02
must_haves:
  truths:
    - "用户可以手动切换明暗主题"
    - "主题状态在页面刷新后保持不变"
    - "页面加载时无主题闪烁问题"
  artifacts:
    - path: "src/components/ui/ThemeScript.tsx"
      provides: "主题切换脚本，防止 SSR 闪烁"
    - path: "src/components/layout/Header.tsx"
      provides: "主题切换按钮"
    - path: "src/stores/themeStore.ts"
      provides: "主题状态管理"
  key_links:
    - from: "src/app/layout.tsx"
      to: "src/stores/themeStore.ts"
      via: "Zustand store 访问主题状态"
      pattern: "useThemeStore"
    - from: "src/components/ui/ThemeScript.tsx"
      to: "src/app/layout.tsx"
      via: "RootLayout 引入"
---

<objective>
实现手动明暗主题切换功能，包括主题切换按钮、主题状态持久化和防止 SSR 闪烁的 ThemeScript 组件。

Purpose: 提升用户体验，满足不同用户对明暗主题的偏好，确保页面加载时无闪烁问题。

Output: ThemeScript 组件、主题切换按钮优化
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@src/stores/themeStore.ts
@src/components/layout/Header.tsx
@src/app/layout.tsx
@src/app/globals.css
</context>

<tasks>

<task type="auto">
  <name>创建 ThemeScript 组件防止 SSR 闪烁</name>
  <files>src/components/ui/ThemeScript.tsx</files>
  <read_first>src/stores/themeStore.ts, src/app/layout.tsx</read_first>
  <action>
    1. 创建 `src/components/ui/ThemeScript.tsx` 组件
    2. 该组件应在服务器端渲染时根据用户存储的主题偏好设置正确的 CSS 类
    3. 使用 `next/script` 的 `beforeInteractive` 策略确保在页面加载早期执行
    4. 从 localStorage 中读取主题偏好，防止 SSR 闪烁
  </action>
  <acceptance_criteria>
    - 文件 `src/components/ui/ThemeScript.tsx` 存在
    - 组件使用 `next/script` 的 `beforeInteractive` 策略
    - 组件能够读取 localStorage 中的主题偏好
    - 组件能够在服务器端设置正确的根元素类
  </acceptance_criteria>
  <verify>
    <automated>npm run build 无错误</automated>
  </verify>
  <done>ThemeScript 组件创建完成，可防止 SSR 闪烁</done>
</task>

<task type="auto">
  <name>优化根布局中主题应用</name>
  <files>src/app/layout.tsx</files>
  <read_first>src/app/layout.tsx, src/stores/themeStore.ts</read_first>
  <action>
    1. 引入并使用 ThemeScript 组件
    2. 优化主题切换逻辑，确保与 ThemeScript 配合工作
    3. 确保根元素类名设置正确
  </action>
  <acceptance_criteria>
    - RootLayout 中引入了 ThemeScript 组件
    - ThemeScript 组件使用正确的策略
    - 根元素类名根据主题正确设置
  </acceptance_criteria>
  <verify>
    <automated>npm run build 无错误</automated>
  </verify>
  <done>根布局优化完成，主题切换正常工作</done>
</task>

</tasks>

<verification>
1. 运行 `npm run build` 确保无错误
2. 运行开发服务器验证主题切换功能
</verification>

<success_criteria>
- 用户可以手动切换明暗主题
- 主题状态在页面刷新后保持不变
- 页面加载时无主题闪烁问题
</success_criteria>

<output>
After completion, create `.planning/phases/phase-04/phase-04-plan-01-SUMMARY.md`
</output>
