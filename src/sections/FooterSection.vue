<script setup lang="ts">
import { ref } from "vue";
import { useReveal } from "../composables/useReveal";

/**
 * 尾屏：下载/预约入口 + 站点信息。
 * 平台按钮刻意做成"文字标签"而不是应用商店徽章——
 * 徽章是各家平台的商标素材，模板里带上会带来授权问题。
 */
const root = ref<HTMLElement | null>(null);
useReveal(root);

const platforms = ["Windows", "iOS", "Android", "PlayStation"];
const navGroups = [
  { title: "站点", links: ["作品", "叙事", "更新", "原声带"] },
  { title: "社区", links: ["Discord", "X / Twitter", "YouTube", "bilibili"] },
  { title: "关于", links: ["制作组", "招聘", "联系我们", "隐私政策"] },
];
</script>

<template>
  <footer ref="root" id="download" class="footer">
    <div class="footer__glow" aria-hidden="true" />

    <div class="container">
      <div class="footer__cta">
        <p class="eyebrow" data-reveal>Prologue — 序章</p>
        <h2 class="display footer__title" data-reveal>
          故事<br /><em>从这里开始</em>
        </h2>

        <div class="footer__platforms" data-reveal>
          <a v-for="p in platforms" :key="p" class="platform" href="#download">
            <span>{{ p }}</span>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
      </div>

      <div class="hairline footer__line" />

      <div class="footer__bottom">
        <div class="footer__brand">
          <span class="footer__brand-name">SERAPH</span>
          <p class="footer__brand-desc">
            沉浸式官网模板。代码 MIT，文案与图文均为演示用占位内容。
          </p>
        </div>

        <nav v-for="group in navGroups" :key="group.title" class="footer__group">
          <p class="footer__group-title">{{ group.title }}</p>
          <a v-for="link in group.links" :key="link" href="#download">
            {{ link }}
          </a>
        </nav>
      </div>

      <div class="footer__legal">
        <span>© 2026 SERAPH Template</span>
        <span>Built with Vue 3 · GSAP · Lenis</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  padding-block: clamp(72px, 12vw, 150px) 40px;
  border-top: 1px solid var(--line);
}

.footer__glow {
  position: absolute;
  left: 50%;
  bottom: -30vw;
  width: 80vw;
  height: 60vw;
  transform: translateX(-50%);
  background: radial-gradient(
    ellipse at center,
    rgba(124, 92, 255, 0.22),
    transparent 62%
  );
  pointer-events: none;
}

.footer .container {
  position: relative;
}

.footer__cta {
  display: grid;
  gap: 18px;
  justify-items: start;
}

.footer__title {
  font-size: clamp(44px, 9vw, 132px);
  line-height: 0.94;
}

.footer__title em {
  font-style: normal;
  font-size: 0.26em;
  letter-spacing: 0.42em;
  color: var(--text-dim);
  display: block;
  margin-top: 16px;
}

.footer__platforms {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.platform {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--text-dim);
  transition: color var(--dur-fast), border-color var(--dur-fast),
    background var(--dur-fast);
}

.platform i {
  font-style: normal;
  font-size: 11px;
  opacity: 0.6;
  transition: transform var(--dur-fast);
}

.platform:hover {
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.36);
  background: rgba(255, 255, 255, 0.04);
}

.platform:hover i {
  transform: translate(2px, -2px);
}

.footer__line {
  margin-block: clamp(48px, 7vw, 88px) clamp(32px, 4vw, 56px);
}

.footer__bottom {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, minmax(120px, 0.6fr));
  gap: 32px;
}

.footer__brand-name {
  font-family: var(--font-display);
  font-size: 20px;
  letter-spacing: 0.28em;
}

.footer__brand-desc {
  margin-top: 12px;
  font-size: 12px;
  line-height: 1.8;
  color: var(--text-faint);
  max-width: 34ch;
}

.footer__group {
  display: grid;
  gap: 10px;
  align-content: start;
}

.footer__group-title {
  font-size: 10px;
  letter-spacing: 0.24em;
  color: var(--text-faint);
  margin-bottom: 4px;
  text-transform: uppercase;
}

.footer__group a {
  font-size: 13px;
  color: var(--text-dim);
  transition: color var(--dur-fast);
}

.footer__group a:hover {
  color: var(--text);
}

.footer__legal {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: clamp(40px, 6vw, 72px);
  padding-top: 22px;
  border-top: 1px solid var(--line);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--text-faint);
}

@media (max-width: 820px) {
  .footer__bottom {
    grid-template-columns: 1fr 1fr;
  }

  .footer__brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 520px) {
  .footer__bottom {
    grid-template-columns: 1fr;
  }
}
</style>
