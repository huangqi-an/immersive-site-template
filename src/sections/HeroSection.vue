<script setup lang="ts">
// 首屏 Hero：背景用纯 CSS 光晕 + 网格 + 噪点合成，
// 不依赖任何美术素材，替换成视频/立绘时只需塞进 .hero__media 层。
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero__bg" aria-hidden="true">
      <div class="hero__glow hero__glow--violet" />
      <div class="hero__glow hero__glow--cyan" />
      <div class="hero__grid" />
      <div class="hero__noise" />
    </div>

    <div class="container hero__inner">
      <p class="eyebrow">Prologue — 序章</p>

      <h1 class="display hero__title">
        <span class="hero__title-main">SERAPH</span>
        <em class="hero__title-sub">星之回响</em>
      </h1>

      <p class="lede hero__lede">
        沉浸式官网模板。为游戏、番剧与世界观企划准备的叙事型落地页，
        内置滚动动效、视频首屏与主题系统。
      </p>

      <div class="hero__actions">
        <a class="btn btn--primary" href="#works">
          <span>开始探索</span>
        </a>
        <a class="btn" href="#about">查看文档</a>
      </div>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>Scroll</span>
      <i />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-items: center;
  overflow: hidden;
  padding-block: 120px 80px;
}

/* ---------- 背景层 ---------- */
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.hero__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.75;
}

.hero__glow--violet {
  width: 52vw;
  height: 52vw;
  left: -12vw;
  top: -14vw;
  background: radial-gradient(circle, var(--accent) 0%, transparent 68%);
}

.hero__glow--cyan {
  width: 42vw;
  height: 42vw;
  right: -10vw;
  bottom: -18vw;
  background: radial-gradient(circle, var(--accent-2) 0%, transparent 70%);
  opacity: 0.42;
}

.hero__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 96px 96px;
  mask-image: radial-gradient(circle at 50% 42%, #000 0%, transparent 72%);
  opacity: 0.28;
}

.hero__noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
  opacity: 0.16;
  mix-blend-mode: overlay;
}

/* ---------- 内容 ---------- */
.hero__inner {
  position: relative;
  z-index: 1;
}

.hero__title {
  margin-block: 24px 14px;
  display: flex;
  flex-direction: column;
}

.hero__title-main {
  font-size: clamp(64px, 15vw, 208px);
  letter-spacing: 0.14em;
  margin-left: -0.06em;
  background: linear-gradient(180deg, #fff 12%, rgba(238, 241, 255, 0.5) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__title-sub {
  font-style: normal;
  font-size: clamp(20px, 3.4vw, 44px);
  letter-spacing: 0.5em;
  color: var(--text-dim);
  margin-top: 8px;
}

.hero__lede {
  margin-top: 8px;
}

.hero__actions {
  display: flex;
  gap: 14px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 26px;
  font-size: 13px;
  letter-spacing: 0.16em;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--text);
  transition: border-color var(--dur-fast), background var(--dur-fast),
    transform var(--dur-fast);
}

.btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.btn--primary {
  background: var(--accent);
  border-color: transparent;
  box-shadow: 0 8px 40px rgba(124, 92, 255, 0.45);
}

.btn--primary:hover {
  background: #8b6fff;
}

/* ---------- 滚动提示 ---------- */
.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  display: grid;
  justify-items: center;
  gap: 10px;
  font-size: 10px;
  letter-spacing: 0.4em;
  color: var(--text-faint);
  z-index: 1;
}

.hero__scroll i {
  width: 1px;
  height: 42px;
  background: linear-gradient(180deg, var(--line), transparent);
}
</style>
