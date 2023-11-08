import { computed, inject, onMounted, ref, unref, watch } from 'vue'
import { FZ_POPPER_INJECT_KEY } from '../../../../constants'
import { buildPopperOptions, unwrapMeasurableEl } from '../utils/utils'

import type { PopperContentProps } from '../components/content'
import { isUndefined } from '../../../../utils'
import { usePopper } from '../../../../hooks/use-popper'

type PartialOptions = any

const DEFAULT_ARROW_OFFSET = 0

export const usePopperContent = (props: PopperContentProps): any => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { popperInstanceRef, contentRef, triggerRef, role } = inject(
    FZ_POPPER_INJECT_KEY,
    undefined
  )!

  const arrowRef = ref<HTMLElement>()
  const arrowOffset = ref<number>()

  const eventListenerModifier = computed(() => {
    return {
      name: 'eventListeners',
      enabled: !!props.visible
    }
  })

  const arrowModifier = computed(() => {
    const arrowEl = unref(arrowRef)
    const offset = unref(arrowOffset) ?? DEFAULT_ARROW_OFFSET
    // Seems like the `phase` and `fn` is required by Modifier type
    // But on its documentation they didn't specify that.
    // Refer to https://popper.js.org/docs/v2/modifiers/arrow/
    return {
      name: 'arrow',
      enabled: !isUndefined(arrowEl),
      options: {
        element: arrowEl,
        padding: offset
      }
    } as any
  })

  const options = computed<PartialOptions>(() => {
    return {
      onFirstUpdate: (): void => {
        update()
      },
      ...buildPopperOptions(props, [unref(arrowModifier), unref(eventListenerModifier)])
    }
  })

  const computedReference = computed(
    () => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef)
  )

  const { attributes, state, styles, update, forceUpdate, instanceRef } = usePopper(
    computedReference,
    contentRef,
    options
  )

  watch(instanceRef, instance => (popperInstanceRef.value = instance))

  onMounted(() => {
    console.log(instanceRef, 'use-content');
    
    watch(
      () => unref(computedReference)?.getBoundingClientRect(),
      () => {
        update()
      }
    )
  })

  return {
    attributes,
    arrowRef,
    contentRef,
    instanceRef,
    state,
    styles,
    role,

    forceUpdate,
    update
  }
}

export type UsePopperContentReturn = ReturnType<typeof usePopperContent>
