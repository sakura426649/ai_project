# 企业智能协同平台 (Enterprise Intelligent Collaboration Platform)

面向企业私有化部署的 AI 数据中台 + 协同办公平台。

**GitHub:** https://github.com/sakura426649/ai_project

## 开发进度

| 阶段 | 日期 | 状态 |
|------|------|:----:|
| Day 1 — 后端框架搭建 | 2026-07-10 | DONE |
| Day 2 — 功能对接与前端 | 待定 | PENDING |
| Day 3 — 集成联调 | 待定 | PENDING |

Day 1 成果：24 张数据库表、60+ API 端点、55 个 JS 文件、WebSocket 通信桩。

## 技术栈

**前端**: Vue 3 + Element Plus + Vue Router + Pinia + Axios
**后端**: Node.js + Express + better-sqlite3 + Socket.IO
**认证**: JWT (Access Token 15min + Refresh Token 7d)

## 项目结构

```
├── backend/             # Node.js + Express 后端
│   └── src/
│       ├── config/          # 环境变量配置
│       ├── db/              # SQLite 数据库 + 建表初始化
│       ├── models/          # 数据访问层 (16 个模型)
│       ├── services/        # 业务逻辑层 (9 个服务)
│       ├── controllers/     # 请求处理层 (9 个控制器)
│       ├── routes/          # 路由定义 (10 个路由模块)
│       ├── middleware/       # JWT 认证 + 错误处理 + 限流
│       ├── validators/      # express-validator 参数校验
│       ├── utils/           # JWT 工具 + 统一响应格式
│       └── socket/          # Socket.IO WebSocket 服务
├── frontend/            # Vue 3 前端
│   └── src/
│       ├── api/             # Axios 封装 + API 模块
│       ├── router/          # 路由 + 守卫
│       ├── stores/          # Pinia 状态管理
│       ├── views/           # 页面组件
│       ├── components/      # 公共组件
│       └── styles/          # 全局样式
├── Day1完成报告.md       # Day 1 开发完成报告
└── README.md
```

## 快速启动

```bash
# 后端
cd backend && npm install && npm run dev

# 前端
cd frontend && npm install && npm run dev
```

## 模块与分工

| ID | 模块 | 负责人 | 优先级 | Day 1 |
|----|------|--------|:------:|:-----:|
| F-00 | 注册登录与认证 | huangjinxiang | P0 | DONE |
| F-01 | 用户与组织管理 | zhengyongchun | P0 | DONE |
| F-02 | 模型管理 | zhengyongchun | P0 | DONE |
| F-03 | 智能问数 NL2SQL | yanhanyu | P0 | DONE |
| F-04 | 数据采集与清洗 | heziwen | P1 | DONE |
| F-05 | 技能管理 | baorunfeng | P0 | DONE |
| F-06 | 数字员工管理 | baorunfeng | P0 | DONE |
| F-07 | 即时通讯 IM | zonghailang | P0 | DONE |
| F-08 | 合规管理 | heziwen | P0 | DONE |

## Git 分支策略

```
feature/*  →  dev  →  release/*  →  main
```

| 分支 | 模块 |
|------|------|
| feature/f00-auth | F-00 认证 |
| feature/f01-f02-user-model | F-01 用户组织 + F-02 模型管理 |
| feature/f03-nl2sql | F-03 智能问数 |
| feature/f05-f06-skill-employee | F-05 技能 + F-06 数字员工 |
| feature/f07-im | F-07 即时通讯 |
| feature/f08-f04-compliance-data | F-08 合规 + F-04 数据采集 |
