<script setup lang="ts">
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

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 40;
  transition: background var(--dur-fast), backdrop-filter var(--dur-fast),
    border-color var(--dur-fast);
  border-bottom: 1px solid transparent;
}

.nav--scrolled {
  background: rgba(5, 6, 12, 0.72);
  backdrop-filter: blur(18px) saturate(140%);
  border-bottom-color: var(--line);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  height: 68px;
}

.nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 18px;
  letter-spacing: 0.28em;
}

.nav__mark {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent-2);
  box-shadow: 0 0 12px var(--accent-2);
}

.nav__links {
  display: flex;
  gap: 30px;
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--text-dim);
}

.nav__links a {
  position: relative;
  transition: color var(--dur-fast);
}

.nav__links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 100%;
  height: 1px;
  background: var(--accent-2);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-fast) var(--ease-out);
}

.nav__links a:hover {
  color: var(--text);
}

.nav__links a:hover::after {
  transform: scaleX(1);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav__lang {
  display: flex;
  border: 1px solid var(--line);
  border-radius: 999px;
  overflow: hidden;
}

.nav__lang button {
  appearance: none;
  background: transparent;
  border: 0;
  color: var(--text-faint);
  font: inherit;
  font-size: 11px;
  padding: 5px 9px;
  cursor: pointer;
  transition: color var(--dur-fast), background var(--dur-fast);
}

.nav__lang button.is-active {
  color: var(--bg);
  background: var(--text);
}

.nav__cta {
  font-size: 12px;
  letter-spacing: 0.18em;
  padding: 9px 20px;
  border-radius: 999px;
  border: 1px solid rgba(124, 92, 255, 0.6);
  background: rgba(124, 92, 255, 0.14);
  transition: background var(--dur-fast), border-color var(--dur-fast);
}

.nav__cta:hover {
  background: rgba(124, 92, 255, 0.28);
  border-color: var(--accent);
}

@media (max-width: 820px) {
  .nav__links {
    display: none;
  }
}

@media (max-width: 560px) {
  .nav__lang {
    display: none;
  }
}
</style>
