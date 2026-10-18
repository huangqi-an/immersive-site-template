<div align="center">

# Immersive Site Template

**沉浸式官网模板** · 面向游戏、番剧与世界观企划的两种页面形态

演示品牌：SERAPH

Vue 3 · Vite · TypeScript · GSAP · Lenis

[滚动叙事版](https://huangqi-an.github.io/immersive-site-template/) ·
[单屏切页版](https://huangqi-an.github.io/immersive-site-template/single-screen/) ·
[源码](https://github.com/huangqi-an/immersive-site-template)

</div>

![首屏预览](docs/preview.png)

---

## 两种页面形态

| | 滚动叙事 `scroll-story` | 单屏切页 `single-screen` |
|---|---|---|
| 交互模型 | 文档流滚动，章节随滚动推进 | 固定视口，点击/滚轮/方向键切屏 |
| 适合 | 有大量文案与设定的长篇官网 | 以 KV、立绘、PV 为主的首屏型官网 |
| 动画主力 | ScrollTrigger（pin / scrub / reveal） | GSAP timeline（进出场编排） |
| 页面滚动 | 有 | **没有**，`body` 锁死，切换靠状态 |
| 入口 | `/` | `/single-screen/` |

两者共用同一套设计令牌与行为层，差异只在「导航模型」。

## 这是什么

一套可组合的官网骨架。改 `tokens.css` 换视觉，改 section 顺序换结构，
不需要重写动画逻辑——`src/shared/` 里的滚动、揭示、预加载都不依赖 Vue。

## 这不是什么

- **不是通用组件库**。不提供按钮、表单这类基础组件，只解决「官网型页面」的叙事结构。
- **不包含任何美术素材**。所有图都是 CSS 合成的占位背景，需要你替换成自己的 KV、立绘或视频。
- **不是某款游戏的复刻**。演示文案为原创占位内容，与任何商业作品无关。

## 特性

| | |
|---|---|
| **滚动叙事** | GSAP ScrollTrigger + Lenis，`raf` 挂在 `gsap.ticker` 上，进度不抖帧 |
| **横向画廊** | 桌面端 pin + scrub，移动端自动退化为原生横向滚动 + scroll-snap |
| **单屏切页** | 所有屏常驻 DOM，靠 `visibility` 切换；连点可打断上一条时间线，不丢输入 |
| **预加载** | 等待字体/关键资源 + 最短展示时长，避免 loading 一闪而过 |
| **可降级** | `prefers-reduced-motion` 下不初始化平滑滚动，动画全部跳过而非缩短 |
| **垂直适配** | 单屏版内置竖屏提示，横屏体验不被挤压 |
| **主题令牌** | 颜色、字体、间距、缓动集中在 `src/styles/tokens.css` |

## 快速开始

```bash
npm install
npm run dev      # / 和 /single-screen/ 同时可用
npm run build    # vue-tsc 类型检查 + 双入口构建
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
├── shared/                      框架无关的行为层（纯 TS，React 版可直接复用）
│   ├── smoothScroll.ts          Lenis + GSAP ticker 同步，返回 destroy()
│   ├── reveal.ts                [data-reveal] 进入视口淡入
│   └── preloader.ts             资源就绪 + 最短展示时长
├── styles/
│   ├── tokens.css               设计令牌
│   └── base.css                 reset + 版式工具（滚动版用）
└── demos/
    ├── scroll-story/
    │   ├── App.vue              章节编排
    │   ├── SiteNav.vue          顶部导航
    │   ├── sections/            6 个章节（各自带同名 .css）
    │   └── composables/         Vue 胶水：onMounted → shared → onUnmounted
    └── single-screen/
        ├── App.vue              切屏状态机 + GSAP 转场
        ├── screens.ts           屏幕数据
        └── screens.css          页面级样式（接管 body overflow）
```

## 定制

**换主题**：只改 `tokens.css` 里的变量。`--accent` / `--accent-2` 决定整站色相。

**加一个章节**：在 `demos/scroll-story/sections/` 新建组件与同名 `.css`，
内容元素加 `data-reveal` 即可获得入场动画，然后在 `App.vue` 里按顺序挂上。
要参与 pin/scrub 的章节参考 `WorksSection.vue` 的 `gsap.matchMedia` 写法。

**加一屏**：往 `demos/single-screen/screens.ts` 里追加一个对象，
`accent` 决定该屏的色相，其余由 `App.vue` 的转场统一处理。

**替换首屏为视频**：在 `HeroSection.vue` 的 `.hero__bg` 内加

```html
<video class="hero__video" autoplay muted loop playsinline poster="/kv.jpg">
  <source src="/kv.webm" type="video/webm" />
</video>
```

并补一条 `.hero__video { position: absolute; inset: 0; object-fit: cover; }`。

## 性能与降级

| 入口 | JS (gzip) | 说明 |
|---|---|---|
| scroll-story | ~80KB | 27.7KB 业务 + 52KB 共享 GSAP |
| single-screen | ~55KB | 3KB 业务 + 52KB 共享 GSAP |

- GSAP 由 Vite 自动拆成共享 chunk，两个入口只加载一次
- 移动端与 `prefers-reduced-motion` 下不启用 pin 与平滑滚动
- 所有动画作用在 `transform` / `opacity` 上，不触发重排

## 浏览器支持

Chrome / Edge / Safari 最新两个版本，Firefox 最新版。
`overflow: clip` 与 `backdrop-filter` 用于吸顶与导航毛玻璃，Safari 16+ 起完整支持。

## Roadmap

- [ ] Vitest 覆盖 shared 层（reveal 降级分支、preloader 最短时长）
- [ ] Playwright 视觉回归（防止改动画改崩版式）
- [ ] React 版模板（复用 `src/shared/`，只重写组件层）
- [ ] 主题预设（暗色 / 亮色 / 高对比）
- [ ] 多语言路由示例（繁 / 简 / EN）

## 许可证

代码 [MIT](./LICENSE)。`docs/preview.png` 为本项目截图，可自由使用。
仓库内**不含**任何第三方美术素材、字体或商标；接入真实素材前请自行确认授权。
