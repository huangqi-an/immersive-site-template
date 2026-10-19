import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPageSwitch } from "../src/shared/pageSwitch";

function mount(count = 4) {
  document.body.innerHTML = Array.from(
    { length: count },
    (_, i) => `<section data-screen id="s${i}"><span data-stagger></span></section>`
  ).join("");
}

const pressKey = (key: string) =>
  window.dispatchEvent(new KeyboardEvent("keydown", { key }));

describe("createPageSwitch", () => {
  beforeEach(() => {
    mount();
  });

  it("初始只暴露第一屏，其余标记为 aria-hidden", () => {
    createPageSwitch();

    const screens = document.querySelectorAll<HTMLElement>("[data-screen]");
    expect(screens[0].getAttribute("aria-hidden")).toBe("false");
    expect(screens[1].getAttribute("aria-hidden")).toBe("true");
    expect(screens[3].getAttribute("aria-hidden")).toBe("true");
  });

  it("初始第一屏必须不透明，否则加载完成后是白屏", () => {
    createPageSwitch();

    const first = document.querySelector<HTMLElement>("[data-screen]");
    expect(first?.style.opacity).toBe("1");
    expect(first?.style.visibility).toBe("visible");
  });

  it("越界索引不会改变当前屏", () => {
    const sw = createPageSwitch();

    sw.goTo(9);
    expect(sw.current()).toBe(0);

    sw.goTo(-1);
    expect(sw.current()).toBe(0);
  });

  it("next/prev 在首尾停住，不越界", () => {
    const sw = createPageSwitch();

    sw.prev();
    expect(sw.current()).toBe(0);

    sw.goTo(3);
    sw.next();
    expect(sw.current()).toBe(3);
  });

  it("切换时同步 aria-hidden 并触发 onChange", () => {
    const onChange = vi.fn();
    const sw = createPageSwitch({ onChange });

    sw.goTo(2);

    const screens = document.querySelectorAll<HTMLElement>("[data-screen]");
    expect(screens[2].getAttribute("aria-hidden")).toBe("false");
    expect(screens[0].getAttribute("aria-hidden")).toBe("true");
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(2);
    expect(onChange.mock.calls[0][1]).toHaveLength(4);
  });

  it("setLocked 期间键盘输入被忽略", () => {
    const sw = createPageSwitch();

    sw.setLocked(true);
    pressKey("ArrowRight");
    expect(sw.current()).toBe(0);

    sw.setLocked(false);
    pressKey("ArrowRight");
    expect(sw.current()).toBe(1);
  });

  it("destroy 之后键盘不再响应", () => {
    const sw = createPageSwitch();

    sw.destroy();
    pressKey("ArrowRight");
    expect(sw.current()).toBe(0);
  });

  it("没有屏幕元素时不抛错", () => {
    document.body.innerHTML = "";
    const sw = createPageSwitch();

    expect(() => sw.goTo(1)).not.toThrow();
    expect(sw.current()).toBe(0);
  });
});
