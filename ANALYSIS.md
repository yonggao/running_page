# Running Page - 项目分析

## 1. 项目简介

Running Page 是一个**个人跑步数据可视化平台**，帮助跑步爱好者创建属于自己的跑步主页。该项目能够自动同步来自多个运动 App 的跑步数据，并在地图上可视化展示跑步轨迹，同时提供丰富的数据分析功能。

项目最初由 [yihong0618](https://github.com/yihong0618) 开发，采用 GitHub Actions 实现自动化数据同步，支持一键部署到 Vercel 或 GitHub Pages。

## 2. 主要功能

### 数据同步
- **自动化同步**：通过 GitHub Actions 定时同步跑步数据
- **多平台支持**：
  - Garmin / Garmin 中国区
  - Nike Run Club
  - Strava
  - Keep、咕咚、悦跑圈 (Joyrun)
  - COROS、iGPSPORT、Suunto
  - GPX / TCX / FIT 文件导入

### 数据互传
- Nike ↔ Strava 数据互传
- Garmin ↔ Strava 数据互传
- TCX/GPX 文件上传至 Strava/Garmin

### 可视化展示
- **地图轨迹**：使用 Mapbox/MapCN 展示跑步路线
- **数据统计**：年度/月度跑量统计
- **SVG 海报**：生成 GitHub 风格、Grid 风格、Circular 风格的数据海报
- **隐私模式**：支持模糊起点/终点位置保护隐私

### 部署支持
- Vercel（推荐）
- GitHub Pages
- Cloudflare Pages
- Docker 本地部署

## 3. 技术栈

### 前端
| 技术 | 用途 |
|------|------|
| **React** | UI 框架（Hooks 写法） |
| **Vite** | 构建工具 |
| **TypeScript** | 类型安全 |
| **Mapbox GL JS / MapCN** | 地图渲染 |

### 后端/数据处理
| 技术 | 用途 |
|------|------|
| **Python 3.11+** | 数据同步脚本 |
| **SQLite** | 本地数据存储 |
| **SQLAlchemy** | ORM 框架 |

### DevOps/部署
| 技术 | 用途 |
|------|------|
| **GitHub Actions** | CI/CD、数据自动同步 |
| **Vercel** | 前端托管 |
| **Docker** | 容器化部署 |

### 环境要求
- Node.js >= 20
- Python >= 3.11
- pnpm（包管理器）

---

*分析时间：2026-02-27*
*基于 running_page_clone 项目 README 整理*
