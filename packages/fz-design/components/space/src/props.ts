import {
  isVNode,
  type ExtractPropTypes,
  type PropType,
  type StyleValue,
  type VNodeChild
} from 'vue'
import { isArray, isNumber, isString } from '../../../utils'

import type { Arrayable } from '../../../types'

export const Props = {
  /**
   *  Placement direction
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  /**
   *  Classname
   */
  class: {
    type: [String, Object, Array] as PropType<
      Arrayable<Record<string, boolean> | string>
    >,
    default: ''
  },
  /**
   *  Extra style rules
   */
  style: {
    type: [String, Array, Object] as PropType<StyleValue>,
    default: ''
  },
  /**
   *  Controls the alignment of items
   */
  alignment: {
    type: String, // AlignItemsProperty
    default: 'center'
  },
  /**
   * Prefix for space-items
   */
  prefixCls: {
    type: String
  },
  /**
   *  Spacer
   */
  spacer: {
    type: [Object, String, Number, Array] as PropType<VNodeChild>,
    default: null,
    validator: (val: unknown) => isVNode(val) || isNumber(val) || isString(val)
  },
  /**
   *  Auto wrapping
   */
  wrap: Boolean,
  /**
   *  Whether to fill the container
   */
  fill: Boolean,
  /**
   *  Ratio of fill
   */
  fillRatio: {
    type: Number,
    default: 100
  },
  /**
   * Spacing size
   */
  size: {
    type: [String, Array, Number] as PropType<Arrayable<number>>,
    validator: (val: unknown): val is [number, number] | number => {
      return isNumber(val) || (isArray(val) && val.length === 2 && val.every(isNumber))
    }
  }
} as const

export type SpaceProps = ExtractPropTypes<typeof Props>
