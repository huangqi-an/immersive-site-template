import { onMounted, onUnmounted, type Ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  duration?: number;
};

/**
 * 区域内所有 [data-reveal] 元素进入视口时淡入上浮。
 * 约定：只在这种"信息型"内容上用 reveal，
 * 已经在做 pin/scrub 的区域不要再叠，否则两种位移会打架。
 */
export function useReveal(
  root: Ref<HTMLElement | null>,
  options: RevealOptions = {}
) {
  let ctx: gsap.Context | null = null;

  onMounted(() => {
    const el = root.value;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((item) => {
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
        });
      });
    }, el);
  });

  onUnmounted(() => {
    ctx?.revert();
    ctx = null;
  });
}
