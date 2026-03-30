---
phase: phase-04
plan: 04
type: execute
wave: 3
depends_on: [phase-04-plan-01, phase-04-plan-02, phase-04-plan-03]
files_modified:
  - next.config.ts
  - package.json
  - .env
  - vercel.json
autonomous: true
requirements: []
must_haves:
  truths:
    - "项目已配置正确的部署设置"
    - "环境变量已正确配置"
    - "项目可以成功部署到 Vercel"
  artifacts:
    - path: "next.config.ts"
      provides: "Next.js 配置"
    - path: "package.json"
      provides: "项目依赖和脚本"
    - path: "vercel.json"
      provides: "Vercel 部署配置"
---

<objective>
完成项目部署准备，包括配置 Vercel 部署参数、环境变量设置等。

Purpose: 确保项目可以顺利部署到 Vercel 平台，提供生产环境的访问体验。

Output: Vercel 配置文件、环境变量说明文档
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@next.config.ts
@package.json
@.env
</context>

<tasks>

<task type="auto">
  <name>配置 Next.js 图片域名</name>
  <files>next.config.ts</files>
  <read_first>next.config.ts</read_first>
  <action>
    1. 配置 `next.config.ts` 中的 `images.remotePatterns` 选项
    2. 添加支持的图片域名（如 `images.unsplash.com`, `picsum.photos` 等）
    3. 确保部署时图片可以正确加载
  </action>
  <acceptance_criteria>
    - next.config.ts 中配置了 images.remotePatterns
    - 包含项目中使用的图片域名
    - 配置格式符合 Next.js 要求
  </acceptance_criteria>
  <verify>
    <automated>npm run build 无错误</automated>
  </verify>
  <done>Next.js 图片域名配置完成</done>
</task>

<task type="auto">
  <name>创建 Vercel 部署配置文件</name>
  <files>vercel.json</files>
  <read_first>package.json</read_first>
  <action>
    1. 创建 `vercel.json` 文件
    2. 配置项目设置（构建命令、输出目录等）
    3. 配置路由规则（可选）
    4. 配置环境变量（可选）
  </action>
  <acceptance_criteria>
    - 文件 `vercel.json` 存在
    - 包含基础部署配置
    - 配置格式符合 Vercel 要求
  </acceptance_criteria>
  <verify>
    <automated>npm run build 无错误</automated>
  </verify>
  <done>Vercel 配置文件创建完成</done>
</task>

<task type="auto">
  <name>完善环境变量说明</name>
  <files>.env</files>
  <read_first>.env</read_first>
  <action>
    1. 更新 `.env` 文件，添加环境变量说明
    2. 列出所有需要配置的环境变量
    3. 添加示例值和说明
  </action>
  <acceptance_criteria>
    - .env 文件包含所有需要的环境变量
    - 每个变量有明确的说明
    - 提供示例值
  </acceptance_criteria>
  <verify>
    <automated>文件内容已更新</automated>
  </verify>
  <done>环境变量说明完善完成</done>
</task>

<task type="auto">
  <name>优化 package.json 脚本</name>
  <files>package.json</files>
  <read_first>package.json</read_first>
  <action>
    1. 优化 `package.json` 中的脚本
    2. 添加生产环境构建和部署相关脚本
  </action>
  <acceptance_criteria>
    - package.json 包含 build 脚本
    - 包含 start 脚本用于生产环境启动
  </acceptance_criteria>
  <verify>
    <automated>npm run build 无错误</automated>
  </verify>
  <done>package.json 脚本优化完成</done>
</task>

<task type="auto">
  <name>验证项目可成功构建</name>
  <files>package.json, next.config.ts</files>
  <read_first>package.json</read_first>
  <action>
    1. 运行 `npm run build` 确保项目可成功构建
    2. 检查是否有构建错误
    3. 修复发现的问题
  </action>
  <acceptance_criteria>
    - 项目可以成功构建
    - 无类型错误
    - 无代码质量问题
  </acceptance_criteria>
  <verify>
    <automated>npm run build 成功执行</automated>
  </verify>
  <done>项目构建验证完成</done>
</task>

</tasks>

<verification>
1. 运行 `npm run build` 确保项目可成功构建
2. 检查是否有构建错误
3. 验证所有环境变量都已配置
</verification>

<success_criteria>
- 项目可以成功构建
- 所有环境变量已配置
- Vercel 配置文件已创建
- 项目可以正常部署到 Vercel
</success_criteria>

<output>
After completion, create `.planning/phases/phase-04/phase-04-plan-04-SUMMARY.md`
</output>
