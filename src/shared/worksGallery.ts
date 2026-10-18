import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type GalleryHandle = { destroy(): void };

/**
 * 横向滚动画廊：桌面端把 section 钉住，滚动驱动轨道左移。
 *
 * 三个必须处理的边界：
 * 1. 只在桌面 + 未开启减少动效时 pin，其余情况保留原生横向滚动（可访问性）
 * 2. 距离用函数计算 + invalidateOnRefresh，窗口 resize 后重新量
 * 3. end 必须等于滚动距离，否则动画结束时会有一段“空转期”
 *
 * 挂载方式：给 section 加 data-pin-gallery，轨道用 .works__track（或显式传入）。
 */
export function createWorksGallery(
  section: HTMLElement,
  track?: HTMLElement | null
): GalleryHandle {
  const rail = track ?? section.querySelector<HTMLElement>(".works__track");
  if (!rail) return { destroy() {} };

  const mm = gsap.matchMedia();

  mm.add(
    "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    () => {
      section.classList.add("works--pinned");

      const distance = () => Math.max(rail.scrollWidth - window.innerWidth, 0);

      const tween = gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
        section.classList.remove("works--pinned");
      };
    }
  );

  return {
    destroy() {
      mm.revert();
    },
  };
}
