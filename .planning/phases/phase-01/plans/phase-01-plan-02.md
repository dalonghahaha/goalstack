---
phase: phase-01
plan: 02
type: execute
wave: 2
depends_on:
  - phase-01-plan-01
files_modified:
  - src/components/ui/Button.tsx
  - src/components/ui/Card.tsx
  - src/components/ui/Skeleton.tsx
  - src/components/ui/EmptyState.tsx
  - src/components/ui/ErrorState.tsx
  - src/components/layout/Header.tsx
  - src/components/layout/Footer.tsx
  - src/components/layout/Container.tsx
autonomous: true
requirements:
  - COMM-04
  - COMM-05
  - COMM-06

must_haves:
  truths:
    - 按钮组件支持多种变体、尺寸和状态
    - 卡片组件支持 header、footer 和 hover 效果
    - 骨架屏组件用于加载状态显示
    - 空状态组件用于无数据展示
    - 错误状态组件包含重试按钮
  artifacts:
    - path: "src/components/ui/Button.tsx"
      provides: "按钮组件"
    - path: "src/components/ui/Card.tsx"
      provides: "卡片组件"
    - path: "src/components/ui/Skeleton.tsx"
      provides: "骨架屏组件（COMM-04）"
    - path: "src/components/ui/EmptyState.tsx"
      provides: "空状态组件（COMM-05）"
    - path: "src/components/ui/ErrorState.tsx"
      provides: "错误状态组件（COMM-06）"
    - path: "src/components/layout/Header.tsx"
      provides: "头部布局组件"
    - path: "src/components/layout/Footer.tsx"
      provides: "底部布局组件"
    - path: "src/components/layout/Container.tsx"
      provides: "容器布局组件"
  key_links:
    - from: "src/components/ui/Button.tsx"
      to: "src/app/globals.css"
      via: "Tailwind 类名"
    - from: "src/components/layout/Header.tsx"
      to: "src/components/ui/Button.tsx"
      via: "导入使用"
---

<objective>
创建可复用的基础 UI 组件库，包括按钮、卡片、骨架屏、空状态、错误状态和布局组件。
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-01/research/RESEARCH.md
@.planning/phases/phase-01/plans/phase-01-plan-01.md
</context>

<tasks>

<task type="auto" tdd="true">
  <name>Task 1: 创建基础 UI 组件</name>
  <files>src/components/ui/Button.tsx, src/components/ui/Card.tsx</files>
  <behavior>
    - Button 组件支持变体: primary, secondary, ghost, link
    - Button 组件支持尺寸: sm, md, lg
    - Button 组件支持状态: default, hover, active, disabled, loading
    - Card 组件支持 header 和 footer 插槽
    - Card 组件支持 hover 效果
  </behavior>
  <action>
创建 src/components/ui/Button.tsx:

```tsx
"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:text-gray-100",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
      link: "text-primary-500 underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
```

创建 src/lib/utils.ts（如果不存在）:
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

安装依赖：
```bash
npm install clsx tailwind-merge
```

创建 src/components/ui/Card.tsx:

```tsx
import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900",
          hover && "transition-shadow hover:shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-gray-500 dark:text-gray-400", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
```
  </action>
  <verify>
    <automated>TypeScript 编译检查通过，组件可正常导入</automated>
  </verify>
  <done>Button 和 Card 组件创建完成，支持多种变体和尺寸</done>
</task>

<task type="auto">
  <name>Task 2: 创建骨架屏、空状态、错误状态组件</name>
  <files>src/components/ui/Skeleton.tsx, src/components/ui/EmptyState.tsx, src/components/ui/ErrorState.tsx</files>
  <action>
创建 src/components/ui/Skeleton.tsx（骨架屏 - COMM-04）:

```tsx
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
}

export function Skeleton({ className, width, height, borderRadius }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-800",
        className
      )}
      style={{
        width: width ?? "100%",
        height: height ?? "1rem",
        borderRadius: borderRadius ?? "0.375rem",
      }}
    />
  );
}

// 常用骨架屏组合
export function MatchCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton width={40} height={40} borderRadius="50%" />
          <Skeleton width={60} height={20} />
        </div>
        <Skeleton width={50} height={24} />
        <div className="flex items-center gap-3">
          <Skeleton width={60} height={20} />
          <Skeleton width={40} height={40} borderRadius="50%" />
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <Skeleton width={80} height={16} />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <MatchCardSkeleton key={i} />
      ))}
    </div>
  );
}
```

创建 src/components/ui/EmptyState.tsx（空状态 - COMM-05）:

```tsx
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      {icon && <div className="mb-4 text-gray-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  );
}
```

创建 src/components/ui/ErrorState.tsx（错误状态 - COMM-06）:

```tsx
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  icon,
  title = "加载失败",
  description = "抱歉，发生了错误，请稍后重试。",
  onRetry,
  className
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      {icon && <div className="mb-4 text-red-500">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4" variant="secondary">
          重新加载
        </Button>
      )}
    </div>
  );
}
```
  </action>
  <verify>
    <automated>TypeScript 编译检查通过，组件可正常导入</automated>
  </verify>
  <done>骨架屏、空状态、错误状态组件创建完成，满足 COMM-04、COMM-05、COMM-06 要求</done>
</task>

<task type="auto">
  <name>Task 3: 创建布局组件</name>
  <files>src/components/layout/Header.tsx, src/components/layout/Footer.tsx, src/components/layout/Container.tsx</files>
  <action>
创建 src/components/layout/Container.tsx:

```tsx
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
}

export function Container({ children, className, size = "lg" }: ContainerProps) {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)}>
      {children}
    </div>
  );
}
```

创建 src/components/layout/Header.tsx:

```tsx
"use client";

import Link from "next/link";
import { Container } from "./Container";
import { Button } from "../ui/Button";
import { useThemeStore } from "@/stores/themeStore";

export function Header() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary-500">箩筐体育</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300">
              比赛
            </Link>
            <Link href="/news" className="text-sm font-medium text-gray-700 hover:text-primary-500 dark:text-gray-300">
              资讯
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="切换主题"
            >
              {theme === "dark" ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
```

创建 src/components/layout/Footer.tsx:

```tsx
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <Container>
        <div className="py-6">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2026 箩筐体育. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
```
  </action>
  <verify>
    <automated>TypeScript 编译检查通过，布局组件可正常渲染</automated>
  </verify>
  <done>布局组件创建完成，包括 Header、Footer、Container</done>
</task>

<task type="auto">
  <name>Task 4: 创建主题状态管理</name>
  <files>src/stores/themeStore.ts</files>
  <action>
创建 src/stores/themeStore.ts:

```tsx
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
);
```

更新 src/app/layout.tsx 添加主题切换逻辑：

```tsx
"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-950">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```
  </action>
  <verify>
    <automated>主题切换功能正常工作，localStorage 正确保存</automated>
  </verify>
  <done>主题状态管理创建完成，支持明暗主题切换和持久化</done>
</task>

</tasks>

<verification>
- [ ] Button 组件支持所有变体和尺寸
- [ ] Card 组件支持 header、footer、hover
- [ ] Skeleton 组件在加载时显示（COMM-04）
- [ ] EmptyState 组件在无数据时显示（COMM-05）
- [ ] ErrorState 组件包含重试按钮（COMM-06）
- [ ] Header、Footer、Container 布局组件正常工作
- [ ] 主题切换功能正常
</verification>

<success_criteria>
1. 基础组件库（按钮、卡片、布局等）可复用
2. 页面加载时显示骨架屏（COMM-04）
3. 无数据时显示空状态提示（COMM-05）
4. 接口异常时显示重试按钮（COMM-06）
</success_criteria>

<output>
After completion, create `.planning/phases/phase-01/plans/phase-01-plan-02-SUMMARY.md`
</output>