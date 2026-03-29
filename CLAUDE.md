# 项目配置

## 语言设置

- 所有反馈和交流使用**中文（简体）**
- 代码注释使用中文（如果需要注释）
- 文件描述使用中文

## 项目概述

- 项目名称：goalstack
- 项目类型：待定
- 文档目录：`docs/`

<!-- GSD:project-start source:PROJECT.md -->
## Project

**箩筐体育**

箩筐体育 1.0 是一个面向足球爱好者，提供"高频查比赛 + 高效率看数据 + 结构化看资讯"的足球数据与资讯平台。以"比赛"为主入口，以"赛事/球队/球员"为数据沉淀对象，以"资讯"为内容补充，满足用户从赛前、赛中、赛后到日常关注的完整信息获取需求。

**Core Value:** 以"比赛"为核心入口，建立"可查、可信、可看懂"的足球数据平台，让用户能在 3 次点击内抵达核心详情页，实现比赛、赛事、球队、球员、资讯五大信息对象的闭环。

### Constraints

- **终端范围**：PC 端、移动端 H5 / App 首版
- **技术要求**：需要数据源支持比赛、赛事、球队、球员、资讯数据
- **性能目标**：用户能在 3 次点击内抵达核心详情页
- **体验要求**：骨架屏、空状态、异常状态、重试机制
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

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
# 核心依赖
# 后端依赖
# 开发依赖
# Prisma初始化
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
## 配置说明
### Tailwind CSS 配置
### Prisma 配置
## 来源
- Next.js 官方文档: https://nextjs.org/docs
- React 官方文档: https://react.dev/
- Tailwind CSS 官方文档: https://tailwindcss.com/docs
- Recharts 文档: https://recharts.org/
- Sportradar API: https://developer.sportradar.com/
- Prisma 文档: https://www.prisma.io/docs
- Vercel 部署指南: https://vercel.com/docs
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
