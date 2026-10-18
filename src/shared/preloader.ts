export type PreloaderOptions = {
  minDuration?: number;
  onProgress?: (percent: number) => void;
};

/**
 * 等待首屏关键资源就绪。
 * 目前只等字体（文档里没有图片/视频资源时，字体就是首屏唯一的外部依赖）。
 * 接入真实素材时，把 Promise.all 换成图片/视频首帧的加载任务即可。
 *
 * minDuration 是必要的：资源命中缓存时 loading 会一闪而过，
 * 反而让人觉得"卡了一下"，给一个最短展示时长体验更稳。
 */
export async function waitForAssets(
  options: PreloaderOptions = {}
): Promise<void> {
  const { minDuration = 900, onProgress } = options;
  const started = performance.now();

  onProgress?.(8);

  try {
    await document.fonts.ready;
  } catch {
    // 字体 API 不可用就跳过，不阻塞首屏
  }

  onProgress?.(72);

  const elapsed = performance.now() - started;
  if (elapsed < minDuration) {
    await new Promise((resolve) => setTimeout(resolve, minDuration - elapsed));
  }

  onProgress?.(100);
}
