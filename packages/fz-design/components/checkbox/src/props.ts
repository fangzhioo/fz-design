import type { ExtractPropTypes, PropType } from 'vue'
import type { CheckboxLabel, CheckboxModelValue, CheckboxSize } from './interface'

export const Props = {
    /** 绑定值 */
  modelValue: {
    type: Boolean as PropType<CheckboxModelValue>,
    default: (): boolean => false
  },
  /** label 绑定值 */
  label: {
    type: [String, Number, Boolean] as PropType<CheckboxLabel>,
    default: (): null => null
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean 
  },
  /** 是否展示边框 */
  border: {
    type: Boolean
  },
  /** 是否展示 label */
  showLabel: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<CheckboxSize>
  }
} as const

export type CheckboxProps = ExtractPropTypes<typeof Props>
