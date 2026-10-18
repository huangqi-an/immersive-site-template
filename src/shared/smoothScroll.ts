import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type SmoothScrollHandle = { destroy(): void };

/**
 * 平滑滚动 —— 纯 TS，不依赖任何框架，React 版可以直接复用。
 *
 * 关键点：Lenis 的 raf 必须挂到 gsap.ticker 上，
 * 否则 ScrollTrigger 的进度会和实际滚动位置错开一帧。
 * 开启「减少动态效果」时直接跳过，交回浏览器原生滚动。
 */
export function createSmoothScroll(): SmoothScrollHandle {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { destroy() {} };
  }

  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return {
    destroy() {
      gsap.ticker.remove(tick);
      lenis.destroy();
    },
  };
}
