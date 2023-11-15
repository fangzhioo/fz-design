import { computed, onBeforeUnmount, ref, shallowRef, unref, watch } from 'vue'
import { createPopper, placements } from '@fz-design/fz-popperjs'

import type { Ref } from 'vue'
import type {
  Instance,
  Modifier,
  Obj,
  Options,
  State,
  VirtualElement,
  Placement
} from '@fz-design/fz-popperjs'
import { fromPairs } from '../utils'

export type PopperInstance = Instance;
export type PopperModifier<N, T extends Obj> = Modifier<N, T>;
export type PopperOptions = Options;
export type PopperState = State;
export type PopperVirtualElement = VirtualElement;
export type PopperPlacement = Placement;

type ElementType = HTMLElement | undefined
type ReferenceElement = ElementType | PopperVirtualElement
export type PartialOptions = Partial<PopperOptions>

export const usePopper = (
  referenceElementRef: Ref<ReferenceElement>,
  popperElementRef: Ref<ElementType>,
  opts: Ref<PartialOptions> | PartialOptions = {} as PartialOptions
): any => {
  const stateUpdater = {
    name: 'updateState',
    enabled: true,
    phase: 'write',
    fn: ({ state }) => {
      const derivedState = deriveState(state)

      Object.assign(states.value, derivedState)
    },
    requires: ['computeStyles']
  } as PopperModifier<'updateState', any>

  const options = computed<PopperOptions>(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts)

    return {
      onFirstUpdate,
      placement: placement || 'bottom',
      strategy: strategy || 'absolute',
      modifiers: [
        ...(modifiers || []),
        stateUpdater,
        { name: 'applyStyles', enabled: false }
      ]
    }
  })

  const instanceRef = shallowRef<PopperInstance | undefined>()
  const states = ref<Pick<PopperState, 'styles' | 'attributes'>>({
    styles: {
      popper: {
        position: unref(options).strategy,
        left: '0',
        top: '0'
      },
      arrow: {
        position: 'absolute'
      }
    },
    attributes: {}
  })

  const destroy = (): void => {
    if (!instanceRef.value) return

    instanceRef.value.destroy()
    instanceRef.value = undefined
  }

  watch(
    options,
    newOptions => {
      const instance = unref(instanceRef)
      if (instance) {
        instance.setOptions(newOptions)
      }
    },
    {
      deep: true
    }
  )

  watch([referenceElementRef, popperElementRef], ([referenceElement, popperElement]) => {
    destroy()
    if (!referenceElement || !popperElement) return

    instanceRef.value = createPopper(referenceElement, popperElement, unref(options))
  })

  onBeforeUnmount(() => {
    destroy()
  })

  return {
    state: computed(() => ({ ...(unref(instanceRef)?.state || {}) })),
    styles: computed(() => unref(states).styles),
    attributes: computed(() => unref(states).attributes),
    update: () => unref(instanceRef)?.update(),
    forceUpdate: () => unref(instanceRef)?.forceUpdate(),
    // Preventing end users from modifying the instance.
    instanceRef: computed(() => unref(instanceRef))
  }
}

function deriveState (state: PopperState): Pick<PopperState, 'styles' | 'attributes'> {
  const elements = Object.keys(state.elements) as unknown as (keyof PopperState['elements'])[]

  const styles = fromPairs(
    elements.map(
      element =>
        [element, state.styles[element] || {}] as [
          string,
          PopperState['styles'][keyof PopperState['styles']]
        ]
    )
  )

  const attributes = fromPairs(
    elements.map(
      element =>
        [element, state.attributes[element]] as [
          string,
          PopperState['attributes'][keyof PopperState['attributes']]
        ]
    )
  )

  return {
    styles,
    attributes
  }
}

export const popperPlacements = placements;

export type UsePopperReturn = ReturnType<typeof usePopper>
