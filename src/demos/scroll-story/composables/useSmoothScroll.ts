import { onMounted, onUnmounted } from "vue";
import {
  createSmoothScroll,
  type SmoothScrollHandle,
} from "../../../shared/smoothScroll";

/**
 * Vue 胶水层：只负责把 shared 里的纯 TS 实现接到组件生命周期上。
 * React 版会有一份同样薄的对偶（useEffect + 清理函数）。
 */
export function useSmoothScroll() {
  let handle: SmoothScrollHandle | null = null;

  onMounted(() => {
    handle = createSmoothScroll();
  });

  onUnmounted(() => {
    handle?.destroy();
    handle = null;
  });
}
