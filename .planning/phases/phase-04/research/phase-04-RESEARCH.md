# Phase 4: 优化与部署 - Research

**Researched:** 2026-03-30
**Domain:** 主题切换、响应式设计、分页/加载更多、部署上线
**Confidence:** MEDIUM

## Summary

阶段 4 的核心目标是完善用户体验优化并完成生产部署。项目已有基础框架：
- 已有主题切换 store 和 CSS 变量定义
- 已使用 Tailwind CSS 4.x 版本
- 已有基本的响应式断点使用
- 使用 Next.js 16.2.1 + React 19.2.4

**主要任务：** 完善主题切换实现、优化响应式体验、添加分页/加载更多、完成 Vercel 部署。

---

## User Constraints (from CONTEXT.md)

### 主题系统
- **切换方式:** 仅手动切换（用户手动选择明/暗，不跟随系统）
- **主题选项:** 仅明暗两种（浅色/深色）

### 响应式策略
- **适配策略:** 响应式布局优先（一套代码适配所有屏幕）
- **断点设置:** 标准断点
  - 移动: < 640px
  - 平板: 640px - 1024px
  - PC: > 1024px

### 分页/加载更多
- **分页组件:** 使用现有 UI 库（如 shadcn/ui）
- **移动端加载:** 混合方案（默认按钮加载，支持开启触底加载）

### 待定事项
- 部署方案：待后续讨论
- 性能优化策略：待后续讨论

---

## Standard Stack

### Core (已有)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.2.1 | 全栈框架 | 项目已使用 |
| React | 19.2.4 | UI 库 | 项目已使用 |
| Tailwind CSS | 4.2.2 | 样式框架 | 项目已使用 |
| Zustand | 4.5.2 | 状态管理 | 项目已使用（主题状态） |

### New Dependencies
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @vercel/analytics | latest | 性能分析 | 部署后监控 |
| next/font | 内置 | 字体优化 | 改善加载性能 |

### Installation
```bash
npm install @vercel/analytics
```

**Version verification:** 2026-03-30
- Tailwind CSS: 4.2.2 (项目已安装)
- Next.js: 16.2.1 (项目已安装)

---

## Architecture Patterns

### 1. 主题切换实现

项目已有基础实现，需完善：

```
src/
├── stores/
│   └── themeStore.ts      # 已存在，需增强
├── app/
│   ├── layout.tsx         # 已存在，需添加 document 监听
│   └── globals.css        # 已存在 CSS 变量
└── components/
    └── layout/
        └── Header.tsx     # 已有切换按钮
```

**当前问题:**
- 在 Next.js SSR 环境中可能导致主题闪烁（flash of incorrect theme）
- 需要在 document 级别添加 meta 标签防止闪烁

**推荐实现方案:**
1. 主题存储使用 Zustand + persist 中间件（已实现）
2. 在 layout.tsx 中添加 script 注入防止闪烁
3. CSS 变量使用 Tailwind 的 `@theme` 指令

```typescript
// src/app/layout.tsx 改进
import { ThemeScript } from "@/components/ThemeScript";

// 在 <head> 中添加
<ThemeScript />
```

```tsx
// src/components/ThemeScript.tsx
"use client";

import { useThemeStore } from "@/stores/themeStore";

export function ThemeScript() {
  const theme = useThemeStore.getState().theme;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var stored = localStorage.getItem('theme-storage');
              var theme = stored ? JSON.parse(stored).state.theme : 'light';
              document.documentElement.classList.add(theme);
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}
```

### 2. 响应式设计策略

**Tailwind CSS 4 响应式断点:**
- 默认断点与 Tailwind 3 一致
- `sm:`, `md:`, `lg:`, `xl:`, `2xl:` 前缀

**项目当前使用:**
```tsx
// Header.tsx - 已有响应式导航
<nav className="hidden md:flex">  // md 及以上显示

// NewsList.tsx - 已有响应式网格
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

**需要完善:**
1. 移动端 hamburger 菜单（Header）
2. 移动端优化的触摸交互
3. 防止水平滚动

### 3. 分页/加载更多方案

**推荐方案:**
- PC 端：传统分页（页码 + 上一页/下一页）
- 移动端：加载更多按钮 + 可选的触底加载

**组件结构:**
```
src/
├── components/
│   └── ui/
│       ├── Pagination.tsx    # PC 端分页
│       └── LoadMore.tsx      # 移动端加载更多
```

**Intersection Observer 触底加载:**
```typescript
// hooks/useIntersectionObserver.ts
"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.root, options.rootMargin]);

  return { targetRef, isIntersecting };
}
```

### 4. 部署架构

**Vercel 部署流程:**
1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 配置构建命令：`npm run build`
4. 配置输出目录：`next output`（默认）
5. 自动部署

**Vercel 配置:**
```json
// vercel.json (可选)
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| 主题切换 | 自定义 CSS 类切换 | Tailwind dark: 前缀 + CSS 变量 | Tailwind 原生支持，性能更好 |
| 响应式断点 | 自定义媒体查询 | Tailwind 响应式工具类 | 统一且可维护 |
| 分页逻辑 | 手写分页计算 | 使用 React Query + TanStack Table | 处理边界情况更完善 |
| 部署流程 | 自建服务器 | Vercel | 与 Next.js 深度集成，免费额度足够 |

---

## Common Pitfalls

### Pitfall 1: 主题闪烁 (Theme Flash)
**What goes wrong:** 页面加载时短暂显示错误的主题颜色
**Why it happens:** SSR 输出与客户端主题状态不一致
**How to avoid:** 在 document 的 `<head>` 中添加内联脚本，在 React hydration 之前读取 localStorage 并应用主题类
**Warning signs:** 用户报告首次访问时主题闪烁

### Pitfall 2: 移动端触摸延迟
**What goes wrong:** 点击按钮响应慢（300ms 延迟）
**Why it happens:** 未禁用触摸设备上的默认缩放行为
**How to avoid:** 在 viewport meta 中添加 `user-scalable=no` 或使用 `touch-action: manipulation`
**Warning signs:** 移动端点击响应不灵敏

### Pitfall 3: 无限滚动导致性能问题
**What goes wrong:** 列表无限增长，DOM 节点过多导致卡顿
**Why it happens:** 没有实现虚拟列表或分页
**How to avoid:**
- 混合方案：加载更多按钮作为主要方式
- 可选触底加载，配合"返回顶部"按钮
- 设置最大加载数量限制

### Pitfall 4: Vercel 部署后图片 404
**What goes wrong:** 本地开发正常，部署后图片无法显示
**Why it happens:** 图片使用相对路径或未配置 remotePatterns
**How to avoid:**
- 使用 `next/image` 组件
- 在 next.config.ts 配置 images.remotePatterns

---

## Code Examples

### 1. 主题切换增强实现

```tsx
// src/components/ThemeScript.tsx
// 防止主题闪烁的内联脚本
"use client";

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getTheme() {
              try {
                var stored = localStorage.getItem('theme-storage');
                if (stored) {
                  var parsed = JSON.parse(stored);
                  return parsed.state?.theme || 'light';
                }
              } catch (e) {}
              return 'light';
            }
            var theme = getTheme();
            document.documentElement.classList.add(theme);
          })();
        `,
      }}
    />
  );
}
```

```tsx
// src/app/layout.tsx
import { ThemeScript } from "@/components/ThemeScript";

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        {/* ... */}
      </body>
    </html>
  );
}
```

### 2. 响应式分页组件

```tsx
// src/components/ui/Pagination.tsx
"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        上一页
      </button>
      <span className="px-3 py-1">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        下一页
      </button>
    </div>
  );
}
```

### 3. 移动端加载更多组件

```tsx
// src/components/ui/LoadMore.tsx
"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface LoadMoreProps {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  enableInfiniteScroll?: boolean;
}

export function LoadMore({
  onLoadMore,
  hasMore,
  loading,
  enableInfiniteScroll = false,
}: LoadMoreProps) {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    rootMargin: "100px",
  });

  // 触底自动加载
  useEffect(() => {
    if (enableInfiniteScroll && isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, enableInfiniteScroll]);

  if (!hasMore) return null;

  return (
    <div ref={targetRef} className="py-4 text-center">
      {loading ? (
        <span>加载中...</span>
      ) : enableInfiniteScroll ? (
        <span>滚动加载更多...</span>
      ) : (
        <button
          onClick={onLoadMore}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          加载更多
        </button>
      )}
    </div>
  );
}
```

### 4. Next.js 图片配置

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CSS 类名切换 | Tailwind dark: 前缀 + CSS 变量 | Tailwind 3+ | 更清晰的响应式主题切换 |
| 手动分页 | TanStack Table + React Query | 2023+ | 更完善的数据管理 |
| 服务器部署 | Vercel/Netlify Edge | 2020+ | 零配置部署，全球 CDN |
| 触摸延迟 | 触摸优化 CSS | 移动端普及 | 更流畅的移动体验 |

**Deprecated/outdated:**
- `prefers-color-scheme` 媒体查询: 不符合"仅手动切换"需求
- 纯前端主题切换: 需要 SSR 支持防止闪烁

---

## Open Questions

1. **部署域名**
   - 待定：使用自定义域名还是 Vercel 默认域名
   - 需要配置 SSL 证书（Vercel 自动处理）

2. **性能监控**
   - 是否需要接入 Sentry 进行错误监控？
   - Vercel Analytics 是否足够？

3. **图片资源**
   - 球队/球员头像的数据源？
   - 是否需要配置图片 CDN？

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | 开发/构建 | 需验证 | - | - |
| npm | 包管理 | 需验证 | - | - |
| Git | 版本控制 | 需验证 | - | - |
| GitHub | 部署触发 | 用户操作 | - | - |
| Vercel | 部署平台 | 用户操作 | - | 本地预览 |

**Missing dependencies with fallback:**
- Vercel CLI: 可选，本地预览部署

**Missing dependencies with no fallback:**
- 无阻塞项

---

## Validation Architecture

Skip: workflow.nyquist_validation is explicitly set to false in .planning/config.json

---

## Sources

### Primary (HIGH confidence)
- Next.js 官方文档 - https://nextjs.org/docs
- Tailwind CSS 4 文档 - https://tailwindcss.com/docs
- Vercel 部署指南 - https://vercel.com/docs

### Secondary (MEDIUM confidence)
- Zustand 官方文档 - 状态管理
- React Intersection Observer - 触底加载

### Tertiary (LOW confidence)
- 社区最佳实践 - 需验证

---

## Metadata

**Confidence breakdown:**
- Standard stack: MEDIUM - 项目已有基础，部分新依赖需安装
- Architecture: HIGH - 方案来自官方文档和项目实际
- Pitfalls: MEDIUM - 基于常见问题，需实际验证

**Research date:** 2026-03-30
**Valid until:** 2026-04-30 (30 days for stable stack)