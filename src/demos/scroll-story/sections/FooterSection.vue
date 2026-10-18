<script setup lang="ts">
import "./FooterSection.css";
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

