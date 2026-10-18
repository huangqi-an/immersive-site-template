<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "../composables/useReveal";

gsap.registerPlugin(ScrollTrigger);

/**
 * 视差段落。
 * 只让装饰光斑做位移（幅度小），正文用 reveal 淡入——
 * 正文跟着滚动飘是对可读性的伤害，这类站点十有八九会犯。
 */
const root = ref<HTMLElement | null>(null);
const orb = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

useReveal(root);

const paragraphs = [
  {
    year: "2026",
    title: "世界观先行",
    body: "先写设定集，再写页面。角色、阵营、时间线定下来之后，版式才有据可依，而不是把素材往模板里塞。",
  },
  {
    year: "2025",
    title: "动效服务于叙事",
    body: "滚动是唯一的输入设备。每一段动效都对应一个信息层级：揭示、强调、转场，不做无意义的漂浮。",
  },
];

onMounted(() => {
  const el = root.value;
  if (!el || !orb.value) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  ctx = gsap.context(() => {
    gsap.to(orb.value, {
      yPercent: 26,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, el);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section ref="root" id="about" class="about section">
    <div ref="orb" class="about__orb" aria-hidden="true" />

    <div class="container about__grid">
      <div class="about__aside">
        <p class="eyebrow" data-reveal>About — 关于</p>
        <h2 class="display about__title" data-reveal>
          叙事<br /><em>NARRATIVE</em>
        </h2>
        <p class="lede about__intro" data-reveal>
          一个模板不该只是几张好看的截图。它需要一套能承载世界观的结构：
          章节、角色、时间线、公告，各归其位。
        </p>
      </div>

      <div class="about__body">
        <article
          v-for="p in paragraphs"
          :key="p.year"
          class="about__item"
          data-reveal
        >
          <span class="about__year">{{ p.year }}</span>
          <h3 class="about__item-title">{{ p.title }}</h3>
          <p class="about__text">{{ p.body }}</p>
        </article>

        <ul class="about__stats" data-reveal>
          <li>
            <strong>06</strong>
            <span>可组合章节</span>
          </li>
          <li>
            <strong>75<em>KB</em></strong>
            <span>首屏 JS（gzip）</span>
          </li>
          <li>
            <strong>AA</strong>
            <span>对比度目标</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  position: relative;
  overflow: hidden;
}

.about__orb {
  position: absolute;
  width: 46vw;
  height: 46vw;
  right: -16vw;
  top: -6vw;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(69, 224, 255, 0.22) 0%,
    transparent 66%
  );
  filter: blur(40px);
  pointer-events: none;
}

.about__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(240px, 0.85fr) 1.15fr;
  gap: clamp(32px, 7vw, 120px);
  align-items: start;
}

.about__aside {
  position: sticky;
  top: 120px;
  display: grid;
  gap: 18px;
}

.about__title {
  font-size: clamp(38px, 5.2vw, 72px);
  line-height: 0.98;
}

.about__title em {
  font-family: var(--font-body);
  font-style: normal;
  font-size: 11px;
  letter-spacing: 0.42em;
  color: var(--text-faint);
  display: block;
  margin-top: 14px;
}

.about__intro {
  max-width: 34ch;
}

.about__body {
  display: grid;
  gap: clamp(28px, 4vw, 56px);
}

.about__item {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: 6px 18px;
  padding-bottom: clamp(24px, 3vw, 40px);
  border-bottom: 1px solid var(--line);
}

.about__year {
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--accent-2);
  padding-top: 8px;
}

.about__item-title {
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 500;
  letter-spacing: 0.04em;
}

.about__text {
  grid-column: 2;
  color: var(--text-dim);
  font-size: 15px;
  max-width: 52ch;
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.about__stats li {
  display: grid;
  gap: 6px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.about__stats strong {
  font-family: var(--font-display);
  font-size: clamp(28px, 3.4vw, 46px);
  font-weight: 300;
  line-height: 1;
}

.about__stats strong em {
  font-style: normal;
  font-size: 0.42em;
  letter-spacing: 0.1em;
  margin-left: 3px;
  color: var(--text-dim);
}

.about__stats span {
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--text-faint);
}

@media (max-width: 899px) {
  .about__grid {
    grid-template-columns: 1fr;
  }

  .about__aside {
    position: static;
  }

  .about__stats {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
