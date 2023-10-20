import type { ExtractPropTypes, PropType } from 'vue'
import type { SwapType } from './interface'
import type { IconSlotType } from '../../../types'
import { IconBell, IconBellOff } from '@fz-design/fz-design-icon'

export const Props = {
  /** 绑定值 */
  modelValue: {
    type: Boolean,
    require: true
  },
  /** 组件尺寸 */
  size: {
    type: [Number, String] as PropType<number | string>
  },
  /**
   * 动画类型
   *
   * @values sound swap
   */
  type: {
    type: String as PropType<SwapType>
  },
  /** 打开展示的图标 */
  iconOn: {
    type: Object as PropType<IconSlotType>,
    default: () => IconBell
  },
  /** 关闭展示的图标 */
  iconOff: {
    type: Object as PropType<IconSlotType>,
    default: () => IconBellOff
  }
} as const

export type SwapProps = ExtractPropTypes<typeof Props>
