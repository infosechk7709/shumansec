# Vercel 快速部署说明

## Vercel 项目设置

- **Root Directory**：`.`（项目根目录，不要填 `client`）
- **Framework Preset**：Vite
- **Install Command**：`pnpm install --frozen-lockfile`
- **Build Command**：`pnpm vite build`
- **Output Directory**：`dist/public`

项目根目录已经包含 `vercel.json`，通常 Vercel 会自动读取以上设置。

## 重要说明

不要使用下面这个命令：

```bash
pnpm install && cd client && pnpm vite build
```

因为 `vite.config.ts` 在项目根目录，而不是 `client` 目录。进入 `client` 后，Vite 会找不到正确的配置和路径别名。

## 如果只想马上显示页面

可以直接把已经生成的 `dist/public` 文件夹部署为静态网站：

- Vercel Output Directory：`dist/public`
- 不需要执行额外的 `cd client`

当前网站页面不需要启动 Express 服务也能显示；如果以后加入登录、API 或数据库功能，再配置后端服务和环境变量。
