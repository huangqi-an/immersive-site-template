import "../../styles/tokens.css";
import "./screens.css";

import gsap from "gsap";
import { createPageSwitch } from "../../shared/pageSwitch";
import { waitForAssets } from "../../shared/preloader";

const dots = Array.from(document.querySelectorAll<HTMLElement>("[data-dot]"));
const prevBtn = document.querySelector<HTMLButtonElement>("[data-prev]");
const nextBtn = document.querySelector<HTMLButtonElement>("[data-next-screen]");
const total = dots.length;

const switchPage = createPageSwitch({
  onChange: (index) => {
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === total - 1;
  },
});

// 初始按钮状态
if (prevBtn) prevBtn.disabled = true;
if (nextBtn) nextBtn.disabled = total <= 1;

/* ---------- 导航绑定 ---------- */
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => switchPage.goTo(i));
});
prevBtn?.addEventListener("click", () => switchPage.prev());
nextBtn?.addEventListener("click", () => switchPage.next());

// 页面里带 data-next 的任意元素（比如首屏的「开始探索」）都能触发下一屏
document.querySelectorAll<HTMLElement>("[data-next]").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    switchPage.next();
  });
});

/* ---------- 预加载 ---------- */
const preloader = document.querySelector<HTMLElement>(".preloader");
const bar = document.querySelector<HTMLElement>(".preloader__bar i");
const num = document.querySelector<HTMLElement>(".preloader__num");
const shown = { value: 0 };

const renderProgress = () => {
  if (bar) bar.style.width = `${shown.value}%`;
  if (num) num.textContent = String(Math.round(shown.value));
};

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

(async () => {
  switchPage.setLocked(true);

  await waitForAssets({
    minDuration: reducedMotion ? 0 : 1200,
    onProgress: (value) => {
      if (reducedMotion) {
        shown.value = value;
        renderProgress();
        return;
      }
      gsap.to(shown, {
        value,
        duration: 0.45,
        ease: "power2.out",
        onUpdate: renderProgress,
      });
    },
  });

  if (preloader) {
    if (reducedMotion) {
      preloader.style.display = "none";
    } else {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          preloader.style.display = "none";
        },
      });
    }
  }

  if (reducedMotion) {
    gsap.set("#screen-0 [data-stagger]", { opacity: 1, y: 0 });
  } else {
    gsap.fromTo(
      "#screen-0 [data-stagger]",
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, delay: 0.2 }
    );
  }

  switchPage.setLocked(false);
})();
