import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

// GitHub Pages 项目站点部署在 /<repo>/ 下，本地开发是 /。
// 用环境变量注入，CI 里由 workflow 根据仓库名自动填。
const base = process.env.VITE_BASE || "/";

// 两个模板各自一个 HTML 入口：
//   /            滚动叙事（scroll-story）
//   /single-screen/  单屏切页（single-screen）
const entry = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  base,
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        main: entry("./index.html"),
        singleScreen: entry("./single-screen/index.html"),
      },
    },
  },
});
