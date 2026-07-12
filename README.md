# 企业智能协同平台 (Enterprise Intelligent Collaboration Platform)

面向企业私有化部署的 AI 数据中台 + 协同办公平台。

**GitHub:** https://github.com/sakura426649/ai_project

## 开发进度

| 阶段 | 日期 | 状态 |
|------|------|:----:|
| Day 1 — Model 层搭建 | 2026-07-10 | DONE |
| Day 2 — Service + Controller | 2026-07-11 | DONE |
| Day 3 — 前端 Vue 3 全栈联调 | 2026-07-12 | DONE |

Day 1 成果：13 张数据库表、10 个 Model 文件、Auth 模块全栈实现。
Day 2 成果：10 个 Service 文件、10 个 Controller 文件、9 个 Route 文件、55 个 API 端点。
Day 3 成果：Vue 3 前端 12 个视图页面 + 11 个 API 封装 + Dashboard 统计 API，全栈联调完成。

## 技术栈

**前端**: Vue 3 + Element Plus + Vue Router + Pinia + Axios
**后端**: Node.js + Express + better-sqlite3
**认证**: JWT (Access Token)

## 项目结构

```
├── backend/             # Node.js + Express 后端
│   └── src/
│       ├── config/          # 环境变量配置
│       ├── db/              # SQLite 数据库 + 建表初始化 (13张表)
│       ├── models/          # 数据访问层 (10 个模型)
│       ├── services/        # 业务逻辑层
│       ├── controllers/     # 请求处理层
│       ├── routes/          # 路由定义
│       ├── middleware/       # JWT 认证 + 错误处理 + 限流
│       ├── validators/      # express-validator 参数校验
│       └── utils/           # JWT 工具 + 统一响应格式
├── frontend/            # Vue 3 前端（12 个视图 + 11 个 API 封装）
│   └── src/
│       ├── api/              # Axios API 封装层
│       ├── router/           # Vue Router（12 条路由 + 守卫）
│       ├── stores/           # Pinia 状态管理
│       ├── styles/           # 全局样式
│       └── views/            # 12 个业务视图组件
├── Day1完成报告.md       # Day 1 开发完成报告
├── Day2完成报告.md       # Day 2 开发完成报告
├── Day3完成报告.md       # Day 3 开发完成报告
└── README.md
```

## 快速启动

```bash
cd backend && npm install && npm run dev
```

## 模块与分工

| ID | 模块 | 负责人 | Day 1 | Day 2 | Day 3 |
|----|------|--------|:-----:|:-----:|:-----:|
| F-00 | 注册登录与认证 | huangjinxiang | DONE | DONE | DONE |
| F-01 | 组织管理（部门+员工） | zhengyongchun | DONE | DONE | DONE |
| F-02 | API配置 + 技能管理 | yanhanyu | DONE | DONE | DONE |
| F-03 | 数字员工 + 智能问数 | baorunfeng | DONE | DONE | DONE |
| F-04 | 即时通讯 + 对话 | zonghailang | DONE | DONE | DONE |
| F-05 | 群组 + 管理后台 | heziwen | DONE | DONE | DONE |

## Git 分支策略

```
feature/*  →  dev  →  release/*  →  main
```

| 分支 | 模块 |
|------|------|
| feature/f00-auth | F-00 认证 |
| feature/f01-org | F-01 组织管理 |
| feature/f02-apiconfig-skill | F-02 API配置 + 技能 |
| feature/f03-agent-nl2sql | F-03 数字员工 + NL2SQL |
| feature/f04-im-chat | F-04 IM + 对话 |
| feature/f05-group-admin | F-05 群组 + 管理后台 |
