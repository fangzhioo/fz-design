import type { Ref } from 'vue'

export const useFocus = (
  el: Ref<{
    focus: () => void
  } | null>
): any => {
  return {
    focus: (): void => {
      el.value?.focus?.()
    }
  }
}
