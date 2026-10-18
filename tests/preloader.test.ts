import { describe, expect, it } from "vitest";
import { waitForAssets } from "../src/shared/preloader";

describe("waitForAssets", () => {
  it("进度从 8 开始、以 100 结束且单调不减", async () => {
    const seen: number[] = [];

    await waitForAssets({
      minDuration: 0,
      onProgress: (value) => seen.push(value),
    });

    expect(seen[0]).toBe(8);
    expect(seen.at(-1)).toBe(100);
    expect(seen).toEqual([...seen].sort((a, b) => a - b));
  });

  it("遵守最短展示时长，避免 loading 一闪而过", async () => {
    const started = performance.now();

    await waitForAssets({ minDuration: 80 });

    // 允许几毫秒的计时误差
    expect(performance.now() - started).toBeGreaterThanOrEqual(70);
  });

  it("不传 onProgress 也不会报错", async () => {
    await expect(waitForAssets({ minDuration: 0 })).resolves.toBeUndefined();
  });

  it("字体接口缺失时仍能完成", async () => {
    const original = Object.getOwnPropertyDescriptor(document, "fonts");
    Object.defineProperty(document, "fonts", {
      configurable: true,
      value: undefined,
    });

    await expect(waitForAssets({ minDuration: 0 })).resolves.toBeUndefined();

    if (original) Object.defineProperty(document, "fonts", original);
  });
});
