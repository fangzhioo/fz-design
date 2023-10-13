import type { ExtractPropTypes, PropType } from 'vue'
import type { LinkType } from './interface'
import type { IconSlotType } from '../../../types';

export const Props = {
    /**
   * 类型
   */
  type: {
    type: String as PropType<LinkType>,
    default: 'default'
  },
  /**
   * 是否下划线
   */
  underline: {
    type: Boolean,
    default: true
  },
  /**
   * 是否禁用
   */
  disabled: { type: Boolean, default: false },
  /**
   * 和原生 ‘href’ 属性一致
   */
  href: { type: String, default: '' },
  /**
   * 图表
   */
  icon: {
    type: Object as PropType<IconSlotType>
  }
} as const

export type LinkProps = ExtractPropTypes<typeof Props>
