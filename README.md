# 瑞金医院太仓分院大脑仿真项目

## 项目介绍
本项目是瑞金医院太仓分院的大脑仿真系统，旨在通过3D可视化和数据展示，为医疗人员提供直观的大脑结构和功能展示平台。系统集成了多种数据可视化方案，支持3D模型展示、数据图表分析等功能。

## 项目结构
```
ruijin-simulation/
├── src/                    # 源代码目录
│   ├── components/         # 可复用组件
│   ├── pages/             # 页面组件
│   ├── types/             # TypeScript类型定义
│   ├── mock/              # 模拟数据
│   └── styles/            # 样式文件
├── public/                # 静态资源
├── .next/                 # Next.js构建输出
└── node_modules/          # 项目依赖
```

## 技术栈
- **前端框架**: Next.js 15.2.4
- **UI组件库**: 
  - Ant Design 5.24.6
  - Ant Design Pro Components
  - Ant Design Charts
- **3D渲染**: 
  - Three.js
  - React Three Fiber
  - React Three Drei
- **数据可视化**:
  - ECharts
  - Ant Design Charts
- **开发语言**: TypeScript
- **样式解决方案**:
  - Tailwind CSS
  - Emotion
- **工具库**:
  - Lodash
  - Day.js
  - Moment.js

## 开发环境要求
- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

## 安装和运行
1. 安装依赖：
```bash
npm install
# 或
yarn install
```

2. 开发环境运行：
```bash
npm run dev
# 或
yarn dev
```

3. 生产环境构建：
```bash
npm run build
# 或
yarn build
```

4. 启动生产服务：
```bash
npm run start
# 或
yarn start
```

## 主要功能
- 3D大脑模型展示
- 数据可视化图表
- 交互式数据探索
- 响应式界面设计

## 开发规范
- 使用TypeScript进行开发
- 遵循ESLint代码规范
- 组件化开发
- 使用Git进行版本控制

## 注意事项
- 确保Node.js版本兼容性
- 注意3D模型资源的大小和加载优化
- 关注数据可视化的性能优化