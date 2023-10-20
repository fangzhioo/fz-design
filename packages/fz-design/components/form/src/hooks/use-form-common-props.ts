import type { ComputedRef } from 'vue'
import { computed, inject, ref, unref } from 'vue'
import { useGlobalSize, useProp } from '../../../../hooks'
import { FZ_FORM_INJECT_KEY, FZ_FORM_ITEM_INJECT_KEY } from '../../../../constants'

import type { ComponentSize, MaybeRef } from '../../../../types'

export const useFormSize = (
  fallback?: MaybeRef<ComponentSize | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
): ComputedRef<ComponentSize> => {
  const emptyRef = ref(undefined)

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size')
  const globalConfig = ignore.global ? emptyRef : useGlobalSize()
  const form = ignore.form ? { size: undefined } : inject(FZ_FORM_INJECT_KEY, undefined)
  const formItem = ignore.formItem
    ? { size: undefined }
    : inject(FZ_FORM_ITEM_INJECT_KEY, undefined)

  return computed(
    (): ComponentSize =>
      (size.value ||
      unref(fallback) ||
      formItem?.size ||
      form?.size ||
      globalConfig.value ||
      '') as ComponentSize
  )
}

export const useFormDisabled = (fallback?: MaybeRef<boolean | undefined>): ComputedRef<boolean> => {
  const disabled = useProp<boolean>('disabled')
  const form = inject<any>(FZ_FORM_INJECT_KEY, undefined)
  return computed(() => disabled.value || unref(fallback) || form?.disabled || false)
}

// These exports are used for preventing breaking changes
export const useSize = useFormSize
export const useDisabled = useFormDisabled
