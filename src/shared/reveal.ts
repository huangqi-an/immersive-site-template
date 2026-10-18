import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type RevealOptions = {
  y?: number;
  duration?: number;
};

export type RevealHandle = { destroy(): void };

/**
 * 区域内所有 [data-reveal] 元素进入视口时淡入上浮。
 * 纯 TS，不依赖框架；传入任意 HTMLElement 即可。
 *
 * 约定：只在「信息型」内容上用 reveal，
 * 已经在做 pin/scrub 的区域不要再叠，否则两种位移会打架。
 */
export function createReveal(
  root: Element,
  options: RevealOptions = {}
): RevealHandle {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { destroy() {} };
  }

  // 必须用 root.querySelectorAll，不能用 gsap.utils.toArray：
  // 后者不受作用域限制，会把别的区域的 [data-reveal] 一起选进来。
  const targets = Array.from(
    root.querySelectorAll<HTMLElement>("[data-reveal]")
  );

  const tweens = targets.map((item) =>
    gsap.from(item, {
      y: options.y ?? 34,
      opacity: 0,
      duration: options.duration ?? 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 84%",
        once: true,
      },
    })
  );

  return {
    destroy() {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    },
  };
}
