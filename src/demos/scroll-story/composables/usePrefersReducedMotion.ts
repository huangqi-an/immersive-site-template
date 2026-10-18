import { onMounted, onUnmounted, ref } from "vue";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * 监听系统的「减少动态效果」偏好。
 * 所有动效组件都应该读这个值做降级，而不是只判断一次。
 */
export function usePrefersReducedMotion() {
  const reduced = ref(false);
  let mql: MediaQueryList | null = null;

  const update = () => {
    reduced.value = mql?.matches ?? false;
  };

  onMounted(() => {
    mql = window.matchMedia(QUERY);
    update();
    mql.addEventListener("change", update);
  });

  onUnmounted(() => {
    mql?.removeEventListener("change", update);
  });

  return reduced;
}
