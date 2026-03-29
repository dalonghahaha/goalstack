# 阶段1研究：基础架构搭建

**阶段**: 1
**目标**: 建立项目基础架构和技术骨架
**研究日期**: 2026-03-29

## 背景

阶段1需要完成项目初始化、技术栈配置、基础组件库开发，以及骨架屏、空状态、重试机制的实现。

## 技术选型确认

### 核心依赖版本

| 依赖 | 版本 | 用途 |
|------|------|------|
| next | 16.2.1 | 全栈框架 |
| react | 19.2.4 | UI库 |
| tailwindcss | 4.2.2 | 样式框架 |
| typescript | 5.4.2 | 类型安全 |
| prisma | 7.6.0 | ORM |
| @prisma/client | 7.6.0 | 数据库客户端 |
| recharts | 2.12.7 | 数据可视化 |
| zustand | 4.5.2 | 状态管理 |
| framer-motion | 11.11.17 | 动画 |

## 实施计划

### 1. 项目初始化

#### 1.1 创建 Next.js 项目
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

#### 1.2 安装额外依赖
```bash
# 状态管理、可视化、动画
npm install zustand recharts framer-motion

# 数据库
npm install prisma @prisma/client

# 开发依赖
npm install -D @types/node @types/react @types/react-dom
```

### 2. 技术栈配置

#### 2.1 TypeScript 配置
- 已有 create-next-app 默认配置
- 路径别名: `@/*` -> `./src/*`

#### 2.2 Tailwind CSS 配置
- 主色: #126BFF
- 深色模式: class 策略
- 自定义颜色变量

#### 2.3 Prisma 初始化
```bash
npx prisma init
```
- 定义数据模型（比赛、球队、球员、赛事、资讯）
- 生成 Prisma Client

### 3. 目录结构设计

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── globals.css        # 全局样式
│   ├── api/               # API 路由
│   │   └── ...
│   └── [page]/            # 页面目录
├── components/            # 组件
│   ├── ui/                # 基础UI组件
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Skeleton.tsx   # 骨架屏
│   │   ├── EmptyState.tsx # 空状态
│   │   └── ErrorState.tsx # 错误状态
│   └── layout/            # 布局组件
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Container.tsx
├── lib/                   # 工具库
│   ├── prisma.ts          # Prisma 客户端
│   └── utils.ts           # 通用工具
├── stores/                # Zustand stores
│   └── themeStore.ts      # 主题状态
└── types/                 # TypeScript 类型
    └── index.ts
```

### 4. 基础组件设计

#### 4.1 Button 组件
- 变体: primary, secondary, ghost, link
- 尺寸: sm, md, lg
- 状态: default, hover, active, disabled, loading

#### 4.2 Card 组件
- 可选 header, footer
- 支持 hover 效果
- 响应式

#### 4.3 Skeleton 组件
- 用于页面加载状态
- 支持自定义宽度、高度、圆角

#### 4.4 EmptyState 组件
- 图标 + 标题 + 描述 + 按钮
- 可自定义

#### 4.5 ErrorState 组件
- 错误图标 + 标题 + 描述 + 重试按钮

### 5. 状态管理

#### 5.1 Theme Store (Zustand)
- 明暗主题切换
- 持久化到 localStorage
- 提供 hook: `useThemeStore`

### 6. 布局组件

#### 6.1 Header
- Logo
- 导航链接
- 主题切换按钮
- 响应式移动端菜单

#### 6.2 Footer
- 版权信息
- 链接列表

#### 6.3 Container
- 最大宽度控制
- 内边距响应式

## 风险与注意事项

1. **Next.js 16.2.1** - 当前最新稳定版，需确认 npm registry 可用
2. **Tailwind CSS 4.2.2** - v4 版本有配置变化，需查阅文档
3. **Prisma 7.6.0** - 需确认 PostgreSQL 连接配置
4. **数据源** - 阶段1暂不接入真实API，使用模拟数据

## 成功标准验证

- [ ] 项目可正常启动 (npm run dev)
- [ ] 基础 UI 组件可复用
- [ ] 骨架屏在加载时显示
- [ ] 空状态在无数据时显示
- [ ] 错误状态在异常时显示且可重试

## 参考资料

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS v4 文档](https://tailwindcss.com/docs/upgrade-guide)
- [Prisma 文档](https://www.prisma.io/docs)
- [Zustand 文档](https://docs.pmnd.rs/zustand)