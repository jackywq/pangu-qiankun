# 微前端架构系统 - qiankun 实现

这是一个基于 qiankun 的微前端架构演示项目，展示了如何使用 qiankun 框架构建一个包含主应用和多个子应用的微前端系统。

## 技术栈

### 主应用
- React 18
- TypeScript
- Vite
- Ant Design
- qiankun
- React Router

### 子应用
1. **sub-react**
   - React 18
   - TypeScript
   - Webpack

2. **sub-vue**
   - Vue 3
   - TypeScript
   - Vite

### 构建工具
- pnpm (包管理器)
- Workspace (多应用管理)
- concurrently (并发运行命令)

## 项目结构

```
micro-enterprise-demo/
├── apps/
│   ├── main-app/          # 主应用 (React + Vite)
│   │   ├── src/
│   │   ├── index.html
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── sub-react/         # React 子应用 (Webpack)
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── config-overrides.js
│   └── sub-vue/           # Vue 子应用 (Vite)
│       ├── src/
│       ├── index.html
│       ├── package.json
│       └── vite.config.ts
├── node_modules/
├── package.json           # 根项目配置
└── pnpm-workspace.yaml    # Workspace 配置
```

## 快速开始

### 环境要求
- Node.js >= 16.x
- pnpm >= 7.x

### 安装依赖

```bash
# 安装所有应用的依赖
pnpm install:all
```

### 启动开发服务器

```bash
# 同时启动所有应用
pnpm start
```

启动后，应用将在以下端口运行：
- 主应用：http://localhost:8888
- React 子应用：http://localhost:10000
- Vue 子应用：http://localhost:20000

## 开发指南

### 主应用开发

主应用负责管理和协调所有子应用，包括注册、加载和卸载。

```bash
# 进入主应用目录
cd apps/main-app

# 单独启动主应用
pnpm start
```

主应用的核心配置在 `src/main.tsx` 中，包含子应用的注册和 qiankun 的启动配置。

### React 子应用开发

```bash
# 进入 React 子应用目录
cd apps/sub-react

# 单独启动 React 子应用
pnpm start
```

React 子应用使用 Webpack 构建，需要注意配置 `public-path.js` 来处理资源路径问题。

### Vue 子应用开发

```bash
# 进入 Vue 子应用目录
cd apps/sub-vue

# 单独启动 Vue 子应用
pnpm start
```

Vue 子应用使用 Vite 构建，需要在 `vite.config.ts` 中配置 `base` 路径。

## 构建和部署

### 构建所有应用

```bash
# 构建所有应用
pnpm build
```

### 单独构建应用

```bash
# 构建主应用
cd apps/main-app
pnpm build

# 构建 React 子应用
cd apps/sub-react
pnpm build

# 构建 Vue 子应用
cd apps/sub-vue
pnpm build
```

### 部署注意事项

1. **主应用部署**：
   - 将 `apps/main-app/dist` 目录部署到服务器
   - 确保服务器支持 SPA 路由（配置 fallback 到 index.html）

2. **子应用部署**：
   - 将各子应用的 `dist` 目录部署到服务器
   - 确保子应用的静态资源路径正确（可通过 `public-path.js` 或 Vite 配置调整）

3. **跨域配置**：
   - 如果主应用和子应用部署在不同域名下，需要配置 CORS

4. **子应用注册**：
   - 在生产环境中，需要将 `main.tsx` 中的子应用 `entry` 配置为实际的部署地址

## qiankun 核心配置

### 主应用配置

在 `main-app/src/main.tsx` 中：

```typescript
import { registerMicroApps, start } from 'qiankun';

// 注册子应用
registerMicroApps([
  {
    name: 'sub-react',
    entry: '//localhost:10000',
    container: '#subapp-viewport',
    activeRule: '/react',
  },
  {
    name: 'sub-vue',
    entry: '//localhost:20000',
    container: '#subapp-viewport',
    activeRule: '/vue',
  },
]);

// 启动 qiankun
start({
  sandbox: { experimentalStyleIsolation: true } // 样式隔离
});
```

### 子应用配置

#### React 子应用

- `src/public-path.js`：动态设置 publicPath
- `config-overrides.js`：配置 Webpack 以支持微前端

#### Vue 子应用

- `vite.config.ts`：配置 base 路径和构建选项

## 注意事项

1. **样式隔离**：
   - 默认情况下，qiankun 会开启 CSS Modules 隔离
   - 可以通过 `start` 方法的 `sandbox` 配置启用实验性的样式隔离

2. **路由配置**：
   - 主应用和子应用的路由需要协调，避免冲突
   - 子应用的路由应该是相对路径（基于 activeRule）

3. **资源加载**：
   - 子应用需要正确配置资源路径，确保在主应用中能正确加载
   - React 子应用通过 `public-path.js` 处理，Vue 子应用通过 Vite 配置处理

4. **通信机制**：
   - 可以使用 qiankun 提供的 `initGlobalState` 进行主应用和子应用之间的通信

## License

MIT
