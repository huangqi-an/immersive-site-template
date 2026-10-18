<script setup lang="ts">
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

<style scoped>
.works {
  position: relative;
  padding-block: var(--section-y) 0;
  overflow: hidden;
}

.works__head {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: clamp(32px, 5vw, 64px);
}

.works__title {
  font-size: clamp(40px, 7vw, 92px);
  display: flex;
  align-items: baseline;
  gap: 24px;
  flex-wrap: wrap;
}

.works__title em {
  font-family: var(--font-body);
  font-style: normal;
  font-size: 12px;
  letter-spacing: 0.34em;
  color: var(--text-faint);
}

/* 未启用 pin 时（移动端 / reduced-motion）退化为原生横向滚动 */
.works__viewport {
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.works__viewport::-webkit-scrollbar {
  display: none;
}

/* pin 生效时由 GSAP 接管位移，关掉原生滚动避免双份控制 */
.works--pinned .works__viewport {
  overflow: hidden;
}

.works--pinned {
  height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: 0;
}

.works__track {
  display: flex;
  gap: clamp(16px, 2.4vw, 36px);
  padding-inline: var(--gutter);
  width: max-content;
  will-change: transform;
}

.card {
  flex: 0 0 auto;
  width: clamp(260px, 34vw, 460px);
  scroll-snap-align: center;
}

.card__media {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--line);
  background: linear-gradient(150deg, #191436 0%, #0b0d1c 55%, #101a2e 100%);
  display: grid;
  place-items: end start;
  padding: 22px;
  transition: transform var(--dur-base) var(--ease-out);
}

.card__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 72% 18%,
    rgba(124, 92, 255, 0.5),
    transparent 58%
  );
  mix-blend-mode: screen;
  opacity: 0.9;
}

/* 每张卡换一个色相，避免占位图看起来完全一样 */
.card:nth-child(2) .card__media::after {
  background: radial-gradient(
    circle at 30% 78%,
    rgba(69, 224, 255, 0.42),
    transparent 60%
  );
}

.card:nth-child(3) .card__media::after {
  background: radial-gradient(
    circle at 50% 30%,
    rgba(255, 120, 180, 0.34),
    transparent 62%
  );
}

.card:nth-child(4) .card__media::after {
  background: radial-gradient(
    circle at 80% 70%,
    rgba(255, 190, 90, 0.3),
    transparent 60%
  );
}

.card:hover .card__media {
  transform: translateY(-6px);
}

.card__index {
  font-family: var(--font-display);
  font-size: clamp(48px, 6vw, 84px);
  line-height: 1;
  color: rgba(255, 255, 255, 0.16);
  position: relative;
  z-index: 1;
}

.card__tag {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-dim);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 5px 10px;
  z-index: 1;
}

.card__meta {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}

.card__title {
  font-size: 17px;
  font-weight: 500;
  letter-spacing: 0.06em;
}

.card__en {
  font-size: 11px;
  letter-spacing: 0.22em;
  color: var(--text-faint);
}

.card__year {
  position: absolute;
  right: 0;
  top: 16px;
  font-size: 11px;
  color: var(--text-faint);
}

.works__end {
  flex: 0 0 auto;
  width: clamp(200px, 22vw, 300px);
  align-self: center;
  padding-right: var(--gutter);
  display: grid;
  gap: 12px;
}

.works__end-text {
  font-family: var(--font-display);
  font-size: clamp(22px, 2.6vw, 34px);
  line-height: 1.4;
  color: var(--text-dim);
}

@media (max-width: 899px) {
  .works {
    padding-block: var(--section-y);
  }
}
</style>
