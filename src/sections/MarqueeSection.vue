<script setup lang="ts">
/**
 * 无限滚动文字带。
 * 用 CSS animation 而不是 GSAP：这种匀速循环交给合成层更省 CPU，
 * 也方便在 reduced-motion 下用一行媒体查询直接停掉。
 * 两组相同内容 + translateX(-50%) 即可无缝衔接。
 */
const rowOne = [
  "RESONANCE",
  "世界観",
  "ORIGINAL SOUNDTRACK",
  "CHARACTER",
  "PROLOGUE",
];
const rowTwo = ["SCROLL", "叙事", "ILLUSTRATION", "MOTION", "EPISODE 01"];
</script>

<template>
  <section class="marquee" aria-hidden="true">
    <div class="marquee__row">
      <div class="marquee__track">
        <span v-for="n in 2" :key="`a${n}`" class="marquee__chunk">
          <em v-for="w in rowOne" :key="w">{{ w }}</em>
        </span>
      </div>
    </div>

    <div class="marquee__row marquee__row--reverse">
      <div class="marquee__track marquee__track--reverse">
        <span v-for="n in 2" :key="`b${n}`" class="marquee__chunk">
          <em v-for="w in rowTwo" :key="w">{{ w }}</em>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee {
  position: relative;
  padding-block: clamp(56px, 9vw, 120px);
  overflow: hidden;
  border-block: 1px solid var(--line);
  background: linear-gradient(
    180deg,
    transparent,
    rgba(124, 92, 255, 0.06),
    transparent
  );
}

.marquee__row {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
}

.marquee__row--reverse {
  margin-top: clamp(4px, 1vw, 14px);
}

.marquee__track {
  display: flex;
  flex: 0 0 auto;
  animation: marquee-x 42s linear infinite;
  will-change: transform;
}

.marquee__track--reverse {
  animation-direction: reverse;
  animation-duration: 52s;
}

.marquee__chunk {
  display: flex;
  flex: 0 0 auto;
}

.marquee__chunk em {
  font-family: var(--font-display);
  font-style: normal;
  font-size: clamp(38px, 7vw, 96px);
  letter-spacing: 0.14em;
  line-height: 1;
  padding-inline: clamp(14px, 2.4vw, 40px);
  color: transparent;
  -webkit-text-stroke: 1px rgba(238, 241, 255, 0.34);
}

/* 每隔一个词填实，形成节奏 */
.marquee__chunk em:nth-child(odd) {
  color: var(--text);
  -webkit-text-stroke: 0;
}

@keyframes marquee-x {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
}
</style>
