import { onMounted, onUnmounted, type Ref } from "vue";
import {
  createReveal,
  type RevealHandle,
  type RevealOptions,
} from "../../../shared/reveal";

/**
 * Vue 胶水层，实现见 shared/reveal.ts（纯 TS，无框架依赖）。
 */
export function useReveal(
  root: Ref<HTMLElement | null>,
  options: RevealOptions = {}
) {
  let handle: RevealHandle | null = null;

  onMounted(() => {
    if (root.value) handle = createReveal(root.value, options);
  });

  onUnmounted(() => {
    handle?.destroy();
    handle = null;
  });
}
