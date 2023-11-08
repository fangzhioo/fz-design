// import { useDelayedToggleProps } from '@element-plus/hooks'

import { useDelayedToggleProps } from '../../../../hooks'
import { popperContentProps } from '../../../popper/src/components/content'
import type TooltipContent from './content.vue'
import type { ExtractPropTypes, PropType } from 'vue'

export const useTooltipContentProps = {
  ...useDelayedToggleProps,
  ...popperContentProps,
  /**
   * @description which element the tooltip CONTENT appends to
   */
  appendTo: {
    type: [String, Object] as PropType<string | HTMLElement>
  },
  /**
   * @description display content, can be overridden by `slot#content`
   */
  content: {
    type: String,
    default: ''
  },
  /**
   * @description whether `content` is treated as HTML string
   */
  rawContent: {
    type: Boolean,
    default: false
  },
  /**
   * @description when tooltip inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent: Boolean,
  /**
   * @description same as `aria-label`
   */
  ariaLabel: String,
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type: Boolean, default: null }
  // so we need to declare that again for type checking.
  /**
   * @description visibility of Tooltip
   * https://github.com/vuejs/vue/issues/4792#issuecomment-275396426
   */
  visible: {
    type: Boolean,
    default: undefined
  },
  /**
   * @description animation name
   */
  transition: String,
  /**
   * @description whether tooltip content is teleported, if `true` it will be teleported to where `append-to` sets
   */
  teleported: {
    type: Boolean,
    default: true
  },
  /**
   * @description whether Tooltip is disabled
   */
  disabled: Boolean
} as const

export type FzTooltipContentProps = ExtractPropTypes<typeof useTooltipContentProps>

export type TooltipContentInstance = InstanceType<typeof TooltipContent>
