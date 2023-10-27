import type { ExtractPropTypes, PropType } from 'vue'
import type { IconSlotType } from '../../../types'

export const Props = {
  /** icon 内容 */
  icon: {
    type: Object as PropType<IconSlotType>
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: [String, Number] as PropType<string | number>
  }
} as const

export type SvgIconProps = ExtractPropTypes<typeof Props>
