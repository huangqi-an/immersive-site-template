import "../../styles/base.css";

// 每个 section 一个 CSS 文件，改哪个引哪个
import "./SiteNav.css";
import "./sections/HeroSection.css";
import "./sections/MarqueeSection.css";
import "./sections/WorksSection.css";
import "./sections/AboutSection.css";
import "./sections/NewsSection.css";
import "./sections/FooterSection.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createSmoothScroll } from "../../shared/smoothScroll";
import { createReveal } from "../../shared/reveal";
import { createWorksGallery } from "../../shared/worksGallery";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const cleanups: Array<{ destroy(): void }> = [];

/* ---------- 平滑滚动（必须最先初始化） ---------- */
cleanups.push(createSmoothScroll());

/* ---------- 入场揭示：全页扫描 [data-reveal] ---------- */
cleanups.push(createReveal(document.body));

/* ---------- 横向画廊：靠 data-pin-gallery 声明式挂载 ---------- */
const gallery = document.querySelector<HTMLElement>("[data-pin-gallery]");
if (gallery) cleanups.push(createWorksGallery(gallery));

/* ---------- 导航：只切换毛玻璃背景 ---------- */
const nav = document.querySelector<HTMLElement>(".nav");
if (nav) {
  const sync = () => nav.classList.toggle("nav--scrolled", window.scrollY > 32);
  sync();
  window.addEventListener("scroll", sync, { passive: true });
  cleanups.push({
    destroy: () => window.removeEventListener("scroll", sync),
  });
}

/* ---------- 首屏入场：选择器限定在 #hero 内 ---------- */
if (!reducedMotion) {
  const heroCtx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1.1 },
    });

    tl.from("#hero .hero__bg", { opacity: 0, duration: 1.6 }, 0)
      .from("#hero .hero__title-main", { yPercent: 22, opacity: 0 }, 0.1)
      .from("#hero .hero__title-sub", { y: 24, opacity: 0 }, 0.45)
      .from("#hero .eyebrow", { y: 14, opacity: 0, duration: 0.8 }, 0.5)
      .from("#hero .hero__lede", { y: 20, opacity: 0 }, 0.6)
      .from("#hero .hero__actions .btn", { y: 18, opacity: 0, stagger: 0.1 }, 0.72)
      .from("#hero .hero__scroll", { opacity: 0, duration: 0.8 }, 1.1);
  }, document.body);

  cleanups.push({ destroy: () => heroCtx.revert() });
}

/* ---------- 叙事区光斑视差（只让装饰位移，正文不动） ---------- */
const about = document.querySelector<HTMLElement>("#about");
const orb = about?.querySelector<HTMLElement>(".about__orb");
if (!reducedMotion && about && orb) {
  const ctx = gsap.context(() => {
    gsap.to(orb, {
      yPercent: 26,
      ease: "none",
      scrollTrigger: {
        trigger: about,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, about);

  cleanups.push({ destroy: () => ctx.revert() });
}

/* ---------- 卸载 ---------- */
window.addEventListener("pagehide", () => {
  cleanups.forEach((item) => item.destroy());
  cleanups.length = 0;
});
