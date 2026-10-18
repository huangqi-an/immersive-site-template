<script setup lang="ts">
import "./SiteNav.css";
import { onMounted, onUnmounted, ref } from "vue";

/**
 * 顶部导航。
 * 只监听滚动位置切换毛玻璃背景，不隐藏/显示——
 * 这类站点的导航是"章节索引"，随滚动消失反而让人迷失。
 */
const scrolled = ref(false);

const onScroll = () => {
  scrolled.value = window.scrollY > 32;
};

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});

const links = [
  { href: "#works", label: "作品" },
  { href: "#about", label: "叙事" },
  { href: "#news", label: "更新" },
];
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__inner container">
      <a class="nav__brand" href="#hero">
        <span class="nav__mark" aria-hidden="true" />
        SERAPH
      </a>

      <nav class="nav__links" aria-label="章节导航">
        <a v-for="link in links" :key="link.href" :href="link.href">
          {{ link.label }}
        </a>
      </nav>

      <div class="nav__actions">
        <div class="nav__lang" role="group" aria-label="语言切换">
          <button type="button" class="is-active">简</button>
          <button type="button">繁</button>
          <button type="button">EN</button>
        </div>
        <a class="nav__cta" href="#download">预约</a>
      </div>
    </div>
  </header>
</template>

