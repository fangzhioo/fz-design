// import { popperTriggerProps } from '@element-plus/components/popper'
import type { ExtractPropTypes, PropType } from 'vue'
import { popperTriggerProps } from '../../../popper/src/components/trigger'
import type { Arrayable } from '../../../../types'
import { EVENT_CODE } from '../../../../constants'

export type TooltipTriggerType = 'hover' | 'focus' | 'click' | 'contextmenu'

export const useTooltipTriggerProps = {
  ...popperTriggerProps,
  /**
   * @description whether Tooltip is disabled
   */
  disabled: Boolean,
  /**
   * @description How should the tooltip be triggered (to show)
   */
  trigger: {
    type: [String, Array] as PropType<Arrayable<TooltipTriggerType>>,
    default: 'hover'
  },
  /**
   * @description When you click the mouse to focus on the trigger element, you can define a set of keyboard codes to control the display of tooltip through the keyboard
   */
  triggerKeys: {
    type: Array as PropType<string[]>,
    default: () => [EVENT_CODE.enter, EVENT_CODE.space]
  }
} as const

export type FzTooltipTriggerProps = ExtractPropTypes<typeof useTooltipTriggerProps>
