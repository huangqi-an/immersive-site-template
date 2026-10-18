<script setup lang="ts">
import "./NewsSection.css";
import { ref } from "vue";
import { useReveal } from "../composables/useReveal";

/**
 * 版本更新公告。
 * 这是「游戏/番剧官网」相对通用创意站模板的核心差异：
 * 通用模板不会内置版本号、活动期、平台标签这类结构。
 */
const root = ref<HTMLElement | null>(null);
useReveal(root);

const news = [
  {
    version: "v2.4",
    date: "2026.10.12",
    title: "「灰烬回廊」版本上线，新增可探索区域与角色章节",
    tag: "更新",
  },
  {
    version: "v2.3",
    date: "2026.09.20",
    title: "原声带第二辑公开，收录 18 首场景配乐",
    tag: "音乐",
  },
  {
    version: "v2.2",
    date: "2026.08.30",
    title: "夏日活动「潮汐观测」开启，限时剧情与外观同步开放",
    tag: "活动",
  },
  {
    version: "v2.1",
    date: "2026.08.02",
    title: "画面与手感优化：重构渲染管线，移动端帧率提升",
    tag: "优化",
  },
];
</script>

<template>
  <section ref="root" id="news" class="news section">
    <div class="container">
      <header class="news__head">
        <p class="eyebrow" data-reveal>Update — 更新</p>
        <h2 class="display news__title" data-reveal>
          LATEST
          <em>版本与活动</em>
        </h2>
      </header>

      <ul class="news__list">
        <li v-for="item in news" :key="item.version" class="news__row" data-reveal>
          <a class="news__link" href="#news">
            <span class="news__version">{{ item.version }}</span>
            <span class="news__date">{{ item.date }}</span>
            <span class="news__text">{{ item.title }}</span>
            <span class="news__tag">{{ item.tag }}</span>
            <span class="news__arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>

      <div class="news__more" data-reveal>
        <a class="btn" href="#news">查看全部公告</a>
      </div>
    </div>
  </section>
</template>

