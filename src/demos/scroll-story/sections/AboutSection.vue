<script setup lang="ts">
import "./AboutSection.css";
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

