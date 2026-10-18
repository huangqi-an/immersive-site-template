<script setup lang="ts">
import "./WorksSection.css";
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 横向滚动区。
 * 三个必须处理的边界：
 * 1. 只在桌面 + 未开启减少动效时 pin；否则横向溢出滚动的降级必须可用
 * 2. 距离用函数计算 + invalidateOnRefresh，窗口 resize 后会重新量
 * 3. end 必须等于滚动距离，否则动画结束时会有一个"空转期"
 */
const section = ref<HTMLElement | null>(null);
const track = ref<HTMLElement | null>(null);
let mm: gsap.MatchMedia | null = null;

const works = [
  { index: "01", title: "星海列车", en: "STARLIT EXPRESS", tag: "Key Visual", year: "2026" },
  { index: "02", title: "灰烬回廊", en: "ASHEN CORRIDOR", tag: "Character", year: "2026" },
  { index: "03", title: "潮汐观测", en: "TIDE OBSERVER", tag: "Worldview", year: "2025" },
  { index: "04", title: "残响计划", en: "ECHO PROJECT", tag: "Concept", year: "2025" },
];

onMounted(() => {
  mm = gsap.matchMedia();

  mm.add(
    "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    () => {
      const el = section.value;
      const tr = track.value;
      if (!el || !tr) return;

      el.classList.add("works--pinned");
      const distance = () => Math.max(tr.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
        el.classList.remove("works--pinned");
      };
    }
  );
});

onUnmounted(() => {
  mm?.revert();
  mm = null;
});
</script>

<template>
  <section ref="section" id="works" class="works">
    <header class="works__head container">
      <p class="eyebrow">Selected Works — 作品</p>
      <h2 class="display works__title">
        WORKS
        <em>滚动横向浏览</em>
      </h2>
    </header>

    <div class="works__viewport">
      <div ref="track" class="works__track">
        <article v-for="item in works" :key="item.index" class="card">
          <div class="card__media">
            <span class="card__index">{{ item.index }}</span>
            <span class="card__tag">{{ item.tag }}</span>
          </div>
          <div class="card__meta">
            <h3 class="card__title">{{ item.title }}</h3>
            <p class="card__en">{{ item.en }}</p>
            <span class="card__year">{{ item.year }}</span>
          </div>
        </article>

        <div class="works__end">
          <p class="eyebrow">More soon</p>
          <p class="works__end-text">下一章<br />正在制作中</p>
        </div>
      </div>
    </div>
  </section>
</template>

