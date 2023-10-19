import type { ExtractPropTypes } from 'vue'

export const Props = {
    /** 绑定值 */
  modelValue: {
    type: Number,
    default: 0
  },
  /** 步长 */
  step: {
    type: Number,
    default: 1
  },
  /** 最小值 */
  min: {
    type: Number,
    default: 0
  },
  /** 最大值 */
  max: {
    type: Number,
    default: 100
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type SliderProps = ExtractPropTypes<typeof Props>
