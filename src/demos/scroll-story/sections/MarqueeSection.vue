<script setup lang="ts">
import "./MarqueeSection.css";
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

