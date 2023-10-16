import type { ExtractPropTypes, PropType } from 'vue'
import type { ButtonNative, ButtonSize, ButtonType } from './interface'

export const Props = {
  size: {
    type: String as PropType<ButtonSize>,
    default: ''
  },
  type: {
    type: String as PropType<ButtonType>,
    default: ''
  },
  text: {
    type: Boolean,
    default: false
  },
  nativeType: {
    type: String as PropType<ButtonNative>,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  }
} as const

/** button 组件 props 类型 */
export type ButtonProps = ExtractPropTypes<typeof Props>
