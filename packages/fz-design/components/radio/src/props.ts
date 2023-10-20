import type { ExtractPropTypes, PropType } from 'vue'
import type { RadioModelValue, RadioSize } from './interface'

export const Props = {
  /** 绑定值 */
  modelValue: {
    type: [String, Number, Boolean] as PropType<RadioModelValue>,
    default: (): null => null
  },
  /**是否禁用 */
  disabled: {
    type: Boolean
  },
  /**尺寸 */
  size: {
    type: String as PropType<RadioSize>
  },
  /**
   * 原生 name
   *
   * @see name https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#attr-name
   */
  name: {
    type: String
  },
  /** 选框对应的值 */
  label: {
    type: [String, Number, Boolean] as PropType<RadioModelValue>,
    default: (): null => null
  }
} as const

export type RadioProps = ExtractPropTypes<typeof Props>
