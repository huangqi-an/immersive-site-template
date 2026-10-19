import gsap from "gsap";

export type PageSwitchOptions = {
  /** 作用域，默认 document */
  root?: ParentNode;
  /** 切换完成后回调，用来同步导航高亮 */
  onChange?: (index: number, screens: HTMLElement[]) => void;
  /** 滚轮防抖，默认 800ms */
  wheelLockMs?: number;
};

export type PageSwitchHandle = {
  goTo(index: number): void;
  next(): void;
  prev(): void;
  current(): number;
  /** 预加载期间锁住输入，避免用户在 loading 时切屏 */
  setLocked(locked: boolean): void;
  destroy(): void;
};

/**
 * 单屏切页状态机。
 *
 * 约定：
 * - 屏幕是页面上任意个 [data-screen] 元素，按 DOM 顺序编号
 * - 所有屏幕常驻 DOM，只切 visibility；这样退场动画才有东西可animate
 * - 连点可打断：新切换先 kill 上一条时间线，而不是丢弃输入
 */
export function createPageSwitch(
  options: PageSwitchOptions = {}
): PageSwitchHandle {
  const root = options.root ?? document;
  const screens = Array.from(
    root.querySelectorAll<HTMLElement>("[data-screen]")
  );

  let index = 0;
  let locked = false;
  let wheelAt = 0;
  let tl: gsap.core.Timeline | null = null;

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const notify = () => options.onChange?.(index, screens);

  function goTo(next: number) {
    if (next === index) return;
    if (next < 0 || next >= screens.length) return;

    const from = screens[index];
    const to = screens[next];
    if (!to) return;

    tl?.kill();
    tl = null;

    // 减少动效：直接切换，不做转场
    if (reduced) {
      screens.forEach((el, i) => {
        const active = i === next;
        gsap.set(el, {
          visibility: active ? "visible" : "hidden",
          opacity: active ? 1 : 0,
          scale: 1,
          filter: "blur(0px)",
        });
        el.setAttribute("aria-hidden", active ? "false" : "true");
      });
      index = next;
      notify();
      return;
    }

    // 复位所有非目标屏，避免多次快速切换后状态叠加
    screens.forEach((el) => {
      if (el === to) return;
      if (el === from) {
        // 上一屏保留当前不透明度，交给新时间线接着淡出
        gsap.set(el, { visibility: "visible", scale: 1, filter: "blur(0px)" });
      } else {
        gsap.set(el, {
          visibility: "hidden",
          opacity: 0,
          scale: 1,
          filter: "blur(0px)",
        });
      }
    });

    gsap.set(to, { visibility: "visible", zIndex: 2 });
    if (from) gsap.set(from, { zIndex: 1 });

    tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        if (from) gsap.set(from, { visibility: "hidden" });
        tl = null;
      },
    });

    if (from && from !== to) {
      tl.to(
        from,
        {
          opacity: 0,
          scale: 1.03,
          filter: "blur(10px)",
          duration: 0.42,
          ease: "power2.in",
        },
        0
      );
    }

    tl.fromTo(
      to,
      { opacity: 0, scale: 1.04, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.62 },
      0.06
    ).fromTo(
      to.querySelectorAll("[data-stagger]"),
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 },
      0.22
    );

    index = next;
    to.setAttribute("aria-hidden", "false");
    if (from) from.setAttribute("aria-hidden", "true");
    notify();
  }

  const onKey = (e: KeyboardEvent) => {
    if (locked) return;
    if (["ArrowRight", "ArrowDown", " "].includes(e.key)) {
      e.preventDefault();
      goTo(index + 1);
    }
    if (["ArrowLeft", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  const onWheel = (e: WheelEvent) => {
    if (locked) return;
    const now = Date.now();
    if (now - wheelAt < (options.wheelLockMs ?? 800)) return;
    if (Math.abs(e.deltaY) < 12) return;
    wheelAt = now;
    goTo(index + (e.deltaY > 0 ? 1 : -1));
  };

  // 初始态：第一屏可见，其余隐藏。
  // 注意：这里必须是 opacity 1。切屏逻辑只会把它淡出，不会主动把它点亮，
  // 所以若初始为 0，加载完成后会看到一屏空白（入场动画由调用方负责子元素）。
  screens.forEach((el, i) => {
    if (i === 0) {
      gsap.set(el, { visibility: "visible", opacity: 1 });
      el.setAttribute("aria-hidden", "false");
    } else {
      gsap.set(el, { visibility: "hidden", opacity: 0 });
      el.setAttribute("aria-hidden", "true");
    }
  });

  window.addEventListener("keydown", onKey);
  window.addEventListener("wheel", onWheel, { passive: true });

  return {
    goTo,
    next: () => goTo(index + 1),
    prev: () => goTo(index - 1),
    current: () => index,
    setLocked(value: boolean) {
      locked = value;
    },
    destroy() {
      tl?.kill();
      tl = null;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    },
  };
}
