import { onMounted, onUnmounted } from "vue";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 全站平滑滚动。
 * 关键点：Lenis 的 raf 必须挂到 gsap.ticker 上，
 * 否则 ScrollTrigger 的进度会和实际滚动位置错开一帧。
 * 开启「减少动态效果」时直接跳过，交回浏览器原生滚动。
 */
export function useSmoothScroll() {
  let lenis: Lenis | null = null;
  let tickerFn: ((time: number) => void) | null = null;

  onMounted(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    tickerFn = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
  });

  onUnmounted(() => {
    if (tickerFn) gsap.ticker.remove(tickerFn);
    lenis?.destroy();
    lenis = null;
    tickerFn = null;
  });
}
