import { unrefElement } from '@vueuse/core'

import type { ComponentPublicInstance } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import type { Measurable } from '../interface'
import type { PopperCoreConfigProps } from '../components/content'
import { isClient } from '../../../../utils'

export const buildPopperOptions = (
  props: PopperCoreConfigProps,
  modifiers: any[] = []
): Partial<PopperCoreConfigProps> => {
  const { placement, strategy, popperOptions } = props
  const options = {
    placement,
    strategy,
    ...popperOptions,
    modifiers: [...genModifiers(props), ...modifiers]
  }

  return deriveExtraModifiers(options, popperOptions?.modifiers) as any
}

export const unwrapMeasurableEl = (
  $el: MaybeRef<Measurable | undefined | ComponentPublicInstance>
): HTMLElement | undefined => {
  if (!isClient) return
  return unrefElement($el as HTMLElement)
}

function genModifiers (options: PopperCoreConfigProps): any[] {
  const { offset, gpuAcceleration, fallbackPlacements } = options
  return [
    {
      name: 'offset',
      options: {
        offset: [0, offset ?? 12]
      }
    },
    {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: 'flip',
      options: {
        padding: 5,
        fallbackPlacements
      }
    },
    {
      name: 'computeStyles',
      options: {
        gpuAcceleration
      }
    }
  ]
}

function deriveExtraModifiers (
  options: any,
  modifiers: PopperCoreConfigProps['popperOptions']['modifiers']
): void {
  // if (modifiers) {
  //   options.modifiers = [...options.modifiers, ...(modifiers ?? [])]
  // }
  return {
    ...options,
    modifiers: modifiers ? [...options.modifiers, ...(modifiers ?? [])] : options.modifiers
  }
}
