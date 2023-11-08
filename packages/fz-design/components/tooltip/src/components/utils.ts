import { unref } from 'vue'
import type { Ref } from 'vue'
import type { TooltipTriggerType } from './trigger'
import type { Arrayable } from '../../../../types'
import { isArray } from '../../../../utils'

export const isTriggerType = (
  trigger: Arrayable<TooltipTriggerType>,
  type: TooltipTriggerType
): boolean => {
  if (isArray(trigger)) {
    return trigger.includes(type)
  }
  return trigger === type
}

export const whenTrigger = (
  trigger: Ref<Arrayable<TooltipTriggerType>>,
  type: TooltipTriggerType,
  handler: (e: Event) => void
) => {
  return (e: Event): void => {
    isTriggerType(unref(trigger), type) && handler(e)
  }
}
