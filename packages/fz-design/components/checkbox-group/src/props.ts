import type { ExtractPropTypes, PropType } from 'vue'
import type { CheckboxSize, CheckboxLabel } from '../../checkbox'

export const Props = {
  /** 绑定值 */
  modelValue: {
    type: Array as PropType<CheckboxLabel[]>
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean
  },
  /** 是否纵向排列 */
  vertical: {
    type: Boolean
  },
  /** label */
  label: {
    type: String
  },
  /** 是否显示边框 */
  background: {
    type: Boolean
  },
  /**
   * 尺寸
   */
  size: {
    type: String as PropType<CheckboxSize>
  },
  /** 横向排列的间距 */
  columnGap: {
    type: [String, Number] as PropType<string | number>
  },
  /** 纵向排列的间距 */
  rowGap: {
    type: [String, Number] as PropType<string | number>
  }
} as const

export type CheckboxGroupProps = ExtractPropTypes<typeof Props>
