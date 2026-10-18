import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// GitHub Pages 项目站点部署在 /<repo>/ 下，本地开发是 /。
// 用环境变量注入，CI 里由 workflow 根据仓库名自动填。
const base = process.env.VITE_BASE || "/";

export default defineConfig({
  base,
  plugins: [vue()],
});
