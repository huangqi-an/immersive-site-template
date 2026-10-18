<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { screens } from "./screens";
import { waitForAssets } from "../../shared/preloader";
import "./screens.css";

/**
 * 单屏切页模板。
 * 与 scroll-story 的差别只在「导航模型」：这里是固定视口 + 状态切换，
 * 页面本身不滚动。所以 body 的 overflow 由 screens.css 接管。
 */
const current = ref(0);
const loaded = ref(false);
const progress = ref(0);

let wheelAt = 0;
let tl: gsap.core.Timeline | null = null;

const total = computed(() => screens.length);
const platforms = ["Windows", "iOS", "Android", "PlayStation"];
// 部署在 /<repo>/single-screen/ 下时，回主站必须用 base，不能写死 "/"
const home = import.meta.env.BASE_URL;

function panel(index: number) {
  return document.querySelector<HTMLElement>(`.screen[data-i="${index}"]`);
}

function goTo(next: number) {
  if (next === current.value) return;
  if (next < 0 || next >= screens.length) return;

  const from = panel(current.value);
  const to = panel(next);
  if (!to) return;

  // 允许打断：连点时杀掉上一条时间线，而不是丢弃输入
  tl?.kill();
  tl = null;

  document.querySelectorAll<HTMLElement>(".screen").forEach((el) => {
    if (el === to) return;
    if (el === from) {
      gsap.set(el, { visibility: "visible", scale: 1, filter: "blur(0px)" });
    } else {
      gsap.set(el, {
        visibility: "hidden",
        opacity: 0,
        scale: 1,
        filter: "blur(0px)",
      });
    }
  });

  gsap.set(to, { visibility: "visible", zIndex: 2 });
  if (from) gsap.set(from, { zIndex: 1 });

  tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      if (from) gsap.set(from, { visibility: "hidden" });
      tl = null;
    },
  });

  if (from && from !== to) {
    tl.to(
      from,
      {
        opacity: 0,
        scale: 1.03,
        filter: "blur(10px)",
        duration: 0.42,
        ease: "power2.in",
      },
      0
    );
  }

  tl.fromTo(
    to,
    { opacity: 0, scale: 1.04, filter: "blur(10px)" },
    { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.62 },
    0.06
  ).fromTo(
    to.querySelectorAll("[data-stagger]"),
    { y: 26, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 },
    0.22
  );

  current.value = next;
}

function onKey(e: KeyboardEvent) {
  if (!loaded.value) return;
  if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
    e.preventDefault();
    goTo(current.value + 1);
  }
  if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
    e.preventDefault();
    goTo(current.value - 1);
  }
}

function onWheel(e: WheelEvent) {
  if (!loaded.value) return;
  const now = Date.now();
  if (now - wheelAt < 800 || Math.abs(e.deltaY) < 12) return;
  wheelAt = now;
  goTo(current.value + (e.deltaY > 0 ? 1 : -1));
}

onMounted(async () => {
  window.addEventListener("keydown", onKey);
  window.addEventListener("wheel", onWheel, { passive: true });

  gsap.set(`.screen[data-i="0"]`, { visibility: "visible", opacity: 1 });

  await waitForAssets({
    minDuration: 1200,
    onProgress: (value) => {
      gsap.to(progress, { value, duration: 0.45, ease: "power2.out" });
    },
  });

  gsap.to(".preloader", {
    opacity: 0,
    duration: 0.6,
    onComplete: () => {
      gsap.set(".preloader", { display: "none" });
      loaded.value = true;
    },
  });
  gsap.fromTo(
    `.screen[data-i="0"] [data-stagger]`,
    { y: 26, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, delay: 0.2 }
  );
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  window.removeEventListener("wheel", onWheel);
  tl?.kill();
});
</script>

<template>
  <div class="app">
    <div class="preloader">
      <div class="preloader__inner">
        <p class="preloader__brand">SERAPH</p>
        <p class="preloader__hint">正在载入世界</p>
        <div class="preloader__bar">
          <i :style="{ width: progress + '%' }" />
        </div>
        <p class="preloader__num">{{ Math.round(progress) }}</p>
      </div>
    </div>

    <header class="topbar">
      <a class="topbar__brand" :href="home" @click.prevent="goTo(0)">SERAPH</a>
      <div class="topbar__right">
        <span class="topbar__lang">简 / 繁 / EN</span>
        <a class="topbar__enter" :href="home">进入官网</a>
      </div>
    </header>

    <main class="stage">
      <section
        v-for="(s, i) in screens"
        :key="s.id"
        class="screen"
        :data-i="i"
        :style="{ '--accent': s.accent, '--accent-2': s.accent2 }"
        :aria-hidden="i === current ? 'false' : 'true'"
      >
        <div class="screen__bg" aria-hidden="true">
          <span class="screen__orb screen__orb--a" />
          <span class="screen__orb screen__orb--b" />
          <span class="screen__grid" />
          <span class="screen__figure" />
        </div>

        <div class="screen__content">
          <p class="screen__eyebrow" data-stagger>
            {{ s.eyebrow }} — {{ s.index }}
          </p>
          <h1 class="screen__title" data-stagger>{{ s.title }}</h1>
          <p class="screen__en" data-stagger>{{ s.en }}</p>
          <p class="screen__desc" data-stagger>{{ s.desc }}</p>

          <div class="screen__tags" data-stagger>
            <span v-for="t in s.tags" :key="t">{{ t }}</span>
          </div>

          <a
            v-if="i === 0"
            class="screen__cta"
            href="#"
            data-stagger
            @click.prevent="goTo(1)"
          >
            开始探索
            <em>→</em>
          </a>

          <div
            v-if="i === screens.length - 1"
            class="screen__platforms"
            data-stagger
          >
            <a v-for="p in platforms" :key="p" href="#">{{ p }}</a>
          </div>
        </div>

        <div class="screen__side" aria-hidden="true">
          <span class="screen__side-text">{{ s.en }}</span>
          <span class="screen__side-line" />
        </div>
      </section>
    </main>

    <footer class="navbar">
      <div class="navbar__dots">
        <button
          v-for="(s, i) in screens"
          :key="s.id"
          type="button"
          class="navbar__dot"
          :class="{ 'is-active': i === current }"
          :aria-label="s.title"
          @click="goTo(i)"
        >
          <span>{{ s.index }}</span>
        </button>
      </div>

      <div class="navbar__arrows">
        <button
          type="button"
          :disabled="current === 0"
          aria-label="上一屏"
          @click="goTo(current - 1)"
        >
          ←
        </button>
        <button
          type="button"
          :disabled="current === total - 1"
          aria-label="下一屏"
          @click="goTo(current + 1)"
        >
          →
        </button>
      </div>
    </footer>

    <div class="portrait-tip">
      <div class="portrait-tip__box">
        <div class="portrait-tip__icon" />
        <p class="portrait-tip__title">请横屏观看</p>
        <p class="portrait-tip__desc">本页为横屏体验设计</p>
      </div>
    </div>
  </div>
</template>
