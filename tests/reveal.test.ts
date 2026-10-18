import { beforeEach, describe, expect, it, vi } from "vitest";

const { fromMock, tweens } = vi.hoisted(() => {
  const tweens: Array<{ scrollTrigger: { kill: () => void } | null; kill: () => void }> = [];
  const fromMock = vi.fn(() => {
    const tween = { scrollTrigger: { kill: vi.fn() }, kill: vi.fn() };
    tweens.push(tween);
    return tween;
  });
  return { fromMock, tweens };
});

vi.mock("gsap", () => ({
  default: { registerPlugin: vi.fn(), from: fromMock },
}));

vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));

import { createReveal } from "../src/shared/reveal";

function mockReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

describe("createReveal", () => {
  beforeEach(() => {
    fromMock.mockClear();
    tweens.length = 0;
    document.body.innerHTML = "";
  });

  it("为每个 [data-reveal] 元素创建一条动画", () => {
    mockReducedMotion(false);
    document.body.innerHTML = `<div data-reveal></div><div data-reveal></div><div></div>`;
    const root = document.body;

    createReveal(root);

    expect(fromMock).toHaveBeenCalledTimes(2);
  });

  it("开启减少动效时完全不创建动画", () => {
    mockReducedMotion(true);
    document.body.innerHTML = `<div data-reveal></div>`;

    const handle = createReveal(document.body);

    expect(fromMock).not.toHaveBeenCalled();
    expect(() => handle.destroy()).not.toThrow();
  });

  it("没有目标元素时安全返回", () => {
    mockReducedMotion(false);
    document.body.innerHTML = `<div></div>`;

    const handle = createReveal(document.body);

    expect(fromMock).not.toHaveBeenCalled();
    handle.destroy();
  });

  it("destroy 会同时回收 tween 与其 ScrollTrigger", () => {
    mockReducedMotion(false);
    document.body.innerHTML = `<div data-reveal></div>`;

    const handle = createReveal(document.body);
    handle.destroy();

    expect(tweens[0].kill).toHaveBeenCalled();
    expect(tweens[0].scrollTrigger?.kill).toHaveBeenCalled();
  });
});
