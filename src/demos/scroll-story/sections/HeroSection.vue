<script setup lang="ts">
import "./HeroSection.css";
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";

/**
 * 首屏是「入场动画」，不跟滚动绑定：
 * 用一条 timeline 在挂载后立刻播放，避免用户还没滚动就看到静态排版。
 */
let ctx: gsap.Context | null = null;

onMounted(() => {
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (reduced) return;

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.1 },
    });

    tl.from(".hero__bg", { opacity: 0, duration: 1.6 }, 0)
      .from(".hero__title-main", { yPercent: 22, opacity: 0 }, 0.1)
      .from(".hero__title-sub", { y: 24, opacity: 0 }, 0.45)
      .from(".eyebrow", { y: 14, opacity: 0, duration: 0.8 }, 0.5)
      .from(".hero__lede", { y: 20, opacity: 0 }, 0.6)
      .from(".hero__actions .btn", { y: 18, opacity: 0, stagger: 0.1 }, 0.72)
      .from(".hero__scroll", { opacity: 0, duration: 0.8 }, 1.1);
  });
});

onUnmounted(() => {
  ctx?.revert();
});
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

