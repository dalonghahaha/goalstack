---
phase: phase-01
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - tsconfig.json
  - next.config.ts
  - tailwind.config.ts
  - postcss.config.mjs
  - src/app/layout.tsx
  - src/app/page.tsx
  - src/app/globals.css
  - prisma/schema.prisma
autonomous: true
requirements:
  - COMM-04
  - COMM-05
  - COMM-06

must_haves:
  truths:
    - Next.js 项目可以正常启动
    - TypeScript 类型检查通过
    - Tailwind CSS 样式正常编译
    - Prisma 可以连接数据库
  artifacts:
    - path: "package.json"
      provides: "项目依赖配置"
    - path: "tsconfig.json"
      provides: "TypeScript 配置"
    - path: "tailwind.config.ts"
      provides: "Tailwind CSS 配置"
    - path: "prisma/schema.prisma"
      provides: "数据模型定义"
    - path: "src/app/layout.tsx"
      provides: "根布局"
    - path: "src/app/globals.css"
      provides: "全局样式"
  key_links:
    - from: "src/app/layout.tsx"
      to: "globals.css"
      via: "import"
    - from: "src/app/page.tsx"
      to: "layout.tsx"
      via: "Next.js page hierarchy"
---

<objective>
创建 Next.js 项目并完成技术栈配置，为后续开发提供基础。
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/phases/phase-01/research/RESEARCH.md

## 技术选型确认

| 依赖 | 版本 | 用途 |
|------|------|------|
| next | 16.2.1 | 全栈框架 |
| react | 19.2.4 | UI库 |
| tailwindcss | 4.2.2 | 样式框架 |
| typescript | 5.4.2 | 类型安全 |
| prisma | 7.6.0 | ORM |
| zustand | 4.5.2 | 状态管理 |
| recharts | 2.12.7 | 数据可视化 |
| framer-motion | 11.11.17 | 动画 |
</context>

<tasks>

<task type="auto">
  <name>Task 1: 初始化 Next.js 项目</name>
  <files>package.json, tsconfig.json, next.config.ts, postcss.config.mjs, src/app/layout.tsx, src/app/page.tsx, src/app/globals.css</files>
  <action>
使用 create-next-app 创建项目（如果项目根目录已存在 package.json，则跳过此步骤）：

```bash
cd /Users/dengjialong/git/github/goalstack
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git --yes
```

安装额外依赖：
```bash
npm install zustand@4.5.2 recharts@2.12.7 framer-motion@11.11.17
npm install prisma@7.6.0 @prisma/client@7.6.0
npm install -D @types/node
```

验证安装：
```bash
npm install
npm run build
```
  </action>
  <verify>
    <automated>npm run build 成功完成，无错误</automated>
  </verify>
  <done>Next.js 项目创建成功，依赖安装完成，build 通过</done>
</task>

<task type="auto">
  <name>Task 2: 配置 Tailwind CSS</name>
  <files>tailwind.config.ts, src/app/globals.css</files>
  <action>
配置 Tailwind CSS 主色和深色模式：

1. 更新 tailwind.config.ts:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#126BFF",
          50: "#E6F0FF",
          100: "#CCE0FF",
          200: "#99C2FF",
          300: "#66A3FF",
          400: "#3385FF",
          500: "#126BFF",
          600: "#0F56CC",
          700: "#0B4099",
          800: "#082B66",
          900: "#041633",
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

2. 更新 src/app/globals.css 添加 Tailwind 指令和自定义样式：
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
```

3. 更新 src/app/layout.tsx 添加 lang="zh-CN" 和基础结构
  </action>
  <verify>
    <automated>npm run build 成功，Tailwind 类名可正常编译</automated>
  </verify>
  <done>Tailwind CSS 配置完成，主色 #126BFF 生效，深色模式可用</done>
</task>

<task type="auto">
  <name>Task 3: 初始化 Prisma</name>
  <files>prisma/schema.prisma, .env</files>
  <action>
1. 初始化 Prisma：
```bash
cd /Users/dengjialong/git/github/goalstack
npx prisma init
```

2. 更新 prisma/schema.prisma 定义基础数据模型（用于验证连接）：
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 基础模型 - 阶段1只需要验证连接
model HealthCheck {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
}
```

3. 更新 .env 文件（使用占位符，PostgreSQL 连接需要用户自行配置）：
```env
DATABASE_URL="postgresql://user:password@localhost:5432/goalstack?schema=public"
```

4. 生成 Prisma Client：
```bash
npx prisma generate
```

注意：如果没有 PostgreSQL 数据库，可以使用 SQLite 作为开发替代：
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```
  </action>
  <verify>
    <automated>npx prisma generate 成功，Prisma Client 生成完成</automated>
  </verify>
  <done>Prisma 配置完成，客户端生成成功</done>
</task>

<task type="auto">
  <name>Task 4: 配置路径别名</name>
  <files>tsconfig.json</files>
  <action>
验证 tsconfig.json 中路径别名配置正确：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

确保 src/lib/prisma.ts 创建以便后续使用：
```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```
  </action>
  <verify>
    <automated>TypeScript 编译检查通过，@/ 路径别名可用</automated>
  </verify>
  <done>路径别名配置正确，@/ 可指向 src/ 目录</done>
</task>

</tasks>

<verification>
- [ ] npm run dev 可以启动开发服务器
- [ ] npm run build 可以成功构建
- [ ] npx prisma generate 成功生成客户端
- [ ] 访问 http://localhost:3000 显示首页
</verification>

<success_criteria>
1. 项目已初始化，技术栈配置完成
2. Next.js 可以正常启动
3. TypeScript 类型检查通过
4. Tailwind CSS 样式正常编译
5. Prisma 客户端生成成功
</success_criteria>

<output>
After completion, create `.planning/phases/phase-01/plans/phase-01-plan-01-SUMMARY.md`
</output>