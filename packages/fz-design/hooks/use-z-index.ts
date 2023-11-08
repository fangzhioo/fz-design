import { computed, getCurrentInstance, inject, ref, unref } from 'vue'

import type { Ref } from 'vue'
import { isNumber } from '../utils'
import { FZ_Z_INDEX_INJECTION_KEY } from '../constants'

const zIndex = ref(0)
export const defaultInitialZIndex = 2000

export const useZIndex = (zIndexOverrides?: Ref<number>): any => {
  const zIndexInjection =
    zIndexOverrides ||
    (getCurrentInstance() ? inject(FZ_Z_INDEX_INJECTION_KEY, undefined) : undefined)
  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection)
    return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex
  })
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value)

  const nextZIndex = (): number => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  }
}

export type UseZIndexReturn = ReturnType<typeof useZIndex>
