import type { ExtractPropTypes, PropType } from 'vue'
import { Props as RadioProps } from '../../radio/src/props'
import type { RadioModelValue } from '../../radio'

export const Props = {
  /** 绑定值 */
  modelValue: {
    type: [String, Number, Boolean] as PropType<RadioModelValue>,
    default: (): null => null
  },
  /** 是否纵向排列 */
  vertical: {
    type: Boolean
  },
  /** 横向排列的间距 */
  columnGap: {
    type: [String, Number] as PropType<string | number>
  },
  /** 纵向排列的间距 */
  rowGap: {
    type: [String, Number] as PropType<string | number>
  },
  /** 背景状态 */
  background: {
    type: Boolean
  },
  /** 尺寸 */
  size: RadioProps.size,
  /** 是否禁用 */
  disabled: RadioProps.disabled
} as const

export type RadioGroupProps = ExtractPropTypes<typeof Props>
