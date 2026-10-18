<div align="center">

# Immersive Site Template

**沉浸式官网模板** · 为游戏、番剧与世界观企划准备的叙事型落地页

演示品牌：SERAPH

Vue 3 · Vite · TypeScript · GSAP ScrollTrigger · Lenis

[在线预览](https://huangqi-an.github.io/immersive-site-template/) · [源码](https://github.com/huangqi-an/immersive-site-template)

</div>

![首屏预览](docs/preview.png)

---

## 这是什么

一套可组合的叙事型落地页骨架：滚动驱动的章节切换、横向作品画廊、版本更新列表、下载入口，
以及一套集中管理的设计令牌。改 `tokens.css` 换视觉，改 section 顺序换结构。

## 这不是什么

- **不是通用组件库**。它不提供按钮、表单这类基础组件，只解决「官网型页面」的叙事结构。
- **不包含任何美术素材**。所有图都是 CSS 合成的占位背景，需要你替换成自己的 KV、立绘或视频。
- **不是某款游戏的复刻**。演示文案为原创占位内容，与任何商业作品无关。

## 特性

| | |
|---|---|
| **滚动叙事** | GSAP ScrollTrigger + Lenis，`raf` 挂在 `gsap.ticker` 上，进度不抖帧 |
| **横向画廊** | 桌面端 pin + scrub，移动端自动退化为原生横向滚动 + scroll-snap |
| **可降级** | `prefers-reduced-motion` 下不初始化平滑滚动，动画全部跳过而非缩短 |
| **主题令牌** | 颜色、字体、间距、缓动集中在 `src/styles/tokens.css` |
| **无素材依赖** | 首屏光晕/网格/噪点由 CSS 合成，替换成视频只需加一层 |

## 快速开始

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # vue-tsc 类型检查 + 生产构建
```

## 部署

推送到 `main` 会触发 `.github/workflows/deploy.yml`：构建 → 上传产物 → 发布到 GitHub Pages。
`base` 由仓库名自动推导，改仓库名不用动配置。

**首次使用需要手动做一步**：仓库 `Settings → Pages → Source` 选 **GitHub Actions**。
`GITHUB_TOKEN` 无权通过 API 创建 Pages 站点（会报 `Resource not accessible by integration`），
所以这一步没法自动化，只能点一次。

## 目录结构

```
src/
├── components/SiteNav.vue       顶部导航（滚动切换毛玻璃）
├── composables/
│   ├── useSmoothScroll.ts       Lenis + GSAP ticker 同步
│   ├── useReveal.ts             [data-reveal] 进入视口淡入
│   └── usePrefersReducedMotion.ts
├── sections/
│   ├── HeroSection.vue          首屏 + 入场 timeline
│   ├── MarqueeSection.vue       无限滚动文字带（CSS 动画）
│   ├── WorksSection.vue         横向滚动画廊（pin）
│   ├── AboutSection.vue         视差段落 + sticky 左侧标题
│   ├── NewsSection.vue          版本更新列表
│   └── FooterSection.vue        下载/预约入口
└── styles/
    ├── tokens.css               设计令牌
    └── base.css                 reset + 版式工具
```

## 定制

**换主题**：只改 `tokens.css` 里的变量。`--accent` / `--accent-2` 决定整站色相。

**加一个章节**：在 `src/sections/` 新建组件，内容元素加 `data-reveal` 即可获得入场动画，
然后在 `App.vue` 里按顺序挂上。要参与 pin/scrub 的章节参考 `WorksSection.vue` 的
`gsap.matchMedia` 写法。

**替换首屏为视频**：在 `HeroSection.vue` 的 `.hero__bg` 内加

```html
<video class="hero__video" autoplay muted loop playsinline poster="/kv.jpg">
  <source src="/kv.webm" type="video/webm" />
</video>
```

并补一条 `.hero__video { position: absolute; inset: 0; object-fit: cover; }`。

## 性能与降级

- 首屏 JS 预算 **< 150KB (gzip)**，当前构建约 79KB
- 移动端与 `prefers-reduced-motion` 下不启用 pin 与平滑滚动
- 所有动画作用在 `transform` / `opacity` 上，不触发重排

## 浏览器支持

Chrome / Edge / Safari 最新两个版本，Firefox 最新版。
`overflow: clip` 与 `backdrop-filter` 用于吸顶与导航毛玻璃，Safari 16+ 起完整支持。

## Roadmap

- [ ] Vitest 覆盖 composables
- [ ] Playwright 视觉回归（防止改动画改崩版式）
- [ ] 主题预设（暗色 / 亮色 / 高对比）
- [ ] 多语言路由示例（繁 / 简 / EN）
- [ ] `npm create` 脚手架

## 许可证

代码 [MIT](./LICENSE)。`docs/preview.png` 为本项目截图，可自由使用。
仓库内**不含**任何第三方美术素材、字体或商标；接入真实素材前请自行确认授权。
