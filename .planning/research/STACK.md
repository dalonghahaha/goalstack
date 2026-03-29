# 技术栈选择

**项目:** 箩筐体育 - 足球数据资讯平台
**研究日期:** 2026-03-29

## 推荐技术栈

### 核心框架 - 前端
| 技术 | 版本 | 用途 | 原因 | 置信度 |
|------|------|------|------|--------|
| Next.js | 16.2.1 | 全栈框架 | 1. 服务器端渲染(SSR)和静态生成(SSG)支持，提升SEO和首屏速度<br>2. App Router架构提供更好的组件组织和数据获取<br>3. 与Vercel部署完美配合<br>4. 内置API路由简化后端开发 | HIGH |
| React | 19.2.4 | UI库 | 1. 生态系统成熟，社区活跃<br>2. 支持服务器组件和客户端组件混合使用<br>3. 与Next.js深度集成 | HIGH |
| Tailwind CSS | 4.2.2 | 样式框架 | 1. 工具类优先的CSS，开发效率高<br>2. 响应式设计简单，完美支持PC/移动端<br>3. 与Next.js集成无缝<br>4. JIT编译提供极快的构建速度 | HIGH |
| Recharts | 2.12.7 | 数据可视化 | 1. 基于React的轻量级图表库<br>2. 支持多种图表类型(折线图、柱状图、雷达图)<br>3. 文档完善，社区活跃<br>4. 适合展示足球数据统计 | MEDIUM |
| Zustand | 4.5.2 | 状态管理 | 1. 轻量级，API简单<br>2. 无样板代码，学习成本低<br>3. 适合管理用户主题、筛选条件等状态<br>4. 性能优秀，支持中间件 | MEDIUM |
| Framer Motion | 11.11.17 | 动画库 | 1. 提供流畅的动画和过渡效果<br>2. 支持手势识别和拖动操作<br>3. 与React集成完美<br>4. 适合实现比赛数据更新的动画效果 | MEDIUM |

### 后端 & 数据层
| 技术 | 版本 | 用途 | 原因 | 置信度 |
|------|------|------|------|--------|
| Next.js API Routes | 16.2.1 | 服务器端API | 1. 与Next.js深度集成<br>2. 支持服务器less部署<br>3. 简化API开发流程<br>4. 类型安全，与前端共享类型定义 | HIGH |
| PostgreSQL | 16.2 | 关系型数据库 | 1. 稳定可靠，生态系统完善<br>2. 支持复杂查询，适合数据关联查询<br>3. TimescaleDB扩展支持时间序列数据<br>4. 适合存储比赛、球队、球员等结构化数据 | HIGH |
| Prisma | 7.6.0 | ORM工具 | 1. 类型安全的数据库访问<br>2. 自动生成类型定义<br>3. 可视化数据管理(Studio)<br>4. 支持多种数据库，便于迁移 | HIGH |
| Redis | 7.4.0 | 缓存系统 | 1. 高性能键值存储<br>2. 支持数据过期和发布订阅<br>3. 适合缓存频繁查询的数据(如积分榜、赛程)<br>4. 提升应用响应速度 | MEDIUM |
| Socket.IO | 4.7.5 | 实时通信 | 1. 支持WebSocket和轮询 fallback<br>2. 简单易用的API<br>3. 适合实现比赛实时更新和通知<br>4. 可扩展性强 | MEDIUM |

### 数据源
| 数据源 | 类型 | 覆盖范围 | 价格 | 原因 | 置信度 |
|--------|------|----------|------|------|--------|
| Sportradar API | 付费 | 全球赛事、详细统计 | 中高 | 1. 数据质量高，覆盖范围广<br>2. 提供实时和历史数据<br>3. 支持中文 | MEDIUM |
| Opta Sports API | 付费 | 英超、西甲等顶级联赛 | 高 | 1. 专业数据提供商<br>2. 详细的球员追踪和战术数据<br>3. 适合深度分析 | MEDIUM |
| 球探体育API | 付费 | 全球赛事、中文界面 | 中 | 1. 中文数据支持<br>2. 覆盖国内联赛和国际赛事<br>3. 价格相对合理 | MEDIUM |
| Football-Data.org | 免费/付费 | 欧洲主要联赛 | 免费/低 | 1. 免费版适合开发测试<br>2. 简单易用的API<br>3. 提供基础比赛数据 | LOW |

### 基础设施
| 技术 | 版本 | 用途 | 原因 | 置信度 |
|------|------|------|------|--------|
| Vercel | 最新 | 部署平台 | 1. 与Next.js深度优化<br>2. 自动SSL和CDN<br>3. 预览部署和CI/CD集成<br>4. 全球边缘网络，提升访问速度 | HIGH |
| GitHub Actions | 最新 | CI/CD | 1. 与GitHub无缝集成<br>2. 支持自定义工作流程<br>3. 免费额度适合小团队<br>4. 可与Vercel部署配合 | HIGH |
| Sentry | 最新 | 错误监控 | 1. 实时错误追踪<br>2. 性能监控<br>3. 支持Next.js集成<br>4. 提供详细的错误上下文 | MEDIUM |
| Vercel Analytics | 最新 | 网页分析 | 1. 与Vercel集成完美<br>2. 核心Web Vitals监控<br>3. 简单易用的仪表盘<br>4. 无额外成本 | MEDIUM |

## 替代方案考虑

| 类别 | 推荐 | 替代方案 | 不选择原因 |
|------|------|----------|------------|
| 前端框架 | Next.js | Nuxt.js | Vue生态系统对中文用户友好，但项目要求React |
| 状态管理 | Zustand | Redux | Redux学习成本高，过度设计简单应用 |
| 图表库 | Recharts | D3.js | D3.js学习曲线陡峭，Recharts更适合React项目 |
| 数据库 | PostgreSQL | MongoDB | MongoDB不适合复杂关联查询，足球数据有大量关系型数据 |
| 部署平台 | Vercel | Netlify | Vercel对Next.js支持更好，功能更强大 |

## 安装命令

```bash
# 核心依赖
npm install next@16.2.1 react@19.2.4 react-dom@19.2.4
npm install tailwindcss@4.2.2 postcss@8.4.35 autoprefixer@10.4.18
npm install recharts@2.12.7 zustand@4.5.2 framer-motion@11.11.17

# 后端依赖
npm install prisma@7.6.0 @prisma/client@7.6.0
npm install redis@5.11.0 socket.io@4.7.5 socket.io-client@4.7.5

# 开发依赖
npm install -D typescript@5.4.2 @types/node@20.11.5 @types/react@19.2.4 @types/react-dom@19.2.4
npm install -D @types/redis@4.0.11 @types/socket.io@3.0.1

# Prisma初始化
npx prisma init
npx prisma generate
```

## 不推荐使用的技术

### jQuery
- **原因**: 与现代React应用架构冲突，维护成本高，性能差

### Bootstrap
- **原因**: 与Tailwind CSS的工具类优先理念冲突，定制化困难

### Firebase
- **原因**: 虽然简单易用，但不适合复杂数据查询和高并发场景

### 传统服务器架构
- **原因**: 如Express.js单独部署，需要管理服务器和数据库，运维成本高

## 部署架构

```
┌─────────────────────────────────────────┐
│  用户设备 (PC/移动端)                   │
└─────────────────┬───────────────────────┘
                  │
         ┌────────▼──────────┐
         │  CDN (Vercel Edge)│
         └────────┬──────────┘
                  │
         ┌────────▼──────────┐
         │  Next.js 应用       │
         ├────────────────────┤
         │ - 服务器组件 (SSG)  │
         │ - 客户端组件       │
         │ - API 路由         │
         │ - WebSocket 服务器 │
         └────────┬──────────┘
                  │
        ┌─────────┴──────────┐
        │                     │
  ┌─────▼──────┐      ┌──────▼─────┐
  │ PostgreSQL │      │   Redis    │
  │ (主数据库)  │      │ (缓存/会话)│
  └─────┬──────┘      └──────┬─────┘
        │                     │
  └─────┴─────────────────────┘
         │
  ┌──────▼──────────┐
  │  外部数据源API   │
  │ (Sportradar等)   │
  └──────────────────┘
```

## 配置说明

### Tailwind CSS 配置
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // 支持深色主题切换
  theme: {
    extend: {
      colors: {
        primary: '#126BFF', // 主色
        secondary: '#0F172A', // 辅助色
        success: '#16A34A', // 成功色
        warning: '#F59E0B', // 警示色
        danger: '#DC2626', // 失败色
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

### Prisma 配置
```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Match {
  id         String   @id @default(cuid())
  league     String
  round      String
  homeTeam   String
  awayTeam   String
  homeScore  Int
  awayScore  Int
  matchTime  DateTime
  status     String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("matches")
}

model Team {
  id          String   @id @default(cuid())
  name        String
  logo        String
  country     String
  foundedYear Int
  stadium     String
  coach       String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("teams")
}

model Player {
  id          String   @id @default(cuid())
  name        String
  position    String
  age         Int
  nationality String
  teamId      String
  team        Team     @relation(fields: [teamId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("players")
}
```

## 来源

- Next.js 官方文档: https://nextjs.org/docs
- React 官方文档: https://react.dev/
- Tailwind CSS 官方文档: https://tailwindcss.com/docs
- Recharts 文档: https://recharts.org/
- Sportradar API: https://developer.sportradar.com/
- Prisma 文档: https://www.prisma.io/docs
- Vercel 部署指南: https://vercel.com/docs
