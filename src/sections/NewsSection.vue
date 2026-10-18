<script setup lang="ts">
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

<style scoped>
.news {
  border-top: 1px solid var(--line);
}

.news__head {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: clamp(32px, 4vw, 56px);
}

.news__title {
  font-size: clamp(36px, 6vw, 78px);
  display: flex;
  align-items: baseline;
  gap: 22px;
  flex-wrap: wrap;
}

.news__title em {
  font-family: var(--font-body);
  font-style: normal;
  font-size: 12px;
  letter-spacing: 0.34em;
  color: var(--text-faint);
}

.news__list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}

.news__row {
  border-bottom: 1px solid var(--line);
}

.news__link {
  display: grid;
  grid-template-columns: 76px 104px 1fr auto 24px;
  align-items: center;
  gap: 18px;
  padding: clamp(16px, 2.2vw, 26px) 4px;
  transition: background var(--dur-fast), padding-inline var(--dur-fast);
}

.news__link:hover {
  background: rgba(124, 92, 255, 0.08);
  padding-inline: 14px;
}

.news__version {
  font-family: var(--font-display);
  font-size: 20px;
  letter-spacing: 0.06em;
  color: var(--accent-2);
}

.news__date {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--text-faint);
  font-variant-numeric: tabular-nums;
}

.news__text {
  font-size: clamp(14px, 1.4vw, 16px);
  transition: color var(--dur-fast);
}

.news__link:hover .news__text {
  color: #fff;
}

.news__tag {
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--text-dim);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 4px 10px;
  white-space: nowrap;
}

.news__arrow {
  font-size: 14px;
  color: var(--text-faint);
  transition: transform var(--dur-fast), color var(--dur-fast);
}

.news__link:hover .news__arrow {
  transform: translate(3px, -3px);
  color: var(--accent-2);
}

.news__more {
  margin-top: clamp(28px, 4vw, 48px);
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  font-size: 12px;
  letter-spacing: 0.16em;
  border: 1px solid var(--line);
  border-radius: 999px;
  transition: border-color var(--dur-fast), transform var(--dur-fast);
}

.btn:hover {
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

@media (max-width: 760px) {
  .news__link {
    grid-template-columns: 68px 1fr auto;
    grid-template-areas:
      "version text text"
      "date tag arrow";
    row-gap: 8px;
  }

  .news__version {
    grid-area: version;
  }
  .news__text {
    grid-area: text;
  }
  .news__date {
    grid-area: date;
  }
  .news__tag {
    grid-area: tag;
    justify-self: start;
  }
  .news__arrow {
    grid-area: arrow;
    justify-self: end;
  }
}
</style>
