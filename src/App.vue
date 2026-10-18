<script setup lang="ts">
import HeroSection from "./sections/HeroSection.vue";
import MarqueeSection from "./sections/MarqueeSection.vue";
import WorksSection from "./sections/WorksSection.vue";
import { useSmoothScroll } from "./composables/useSmoothScroll";

useSmoothScroll();
</script>

<template>
  <main class="page">
    <HeroSection />
    <MarqueeSection />
    <WorksSection />
  </main>
</template>
