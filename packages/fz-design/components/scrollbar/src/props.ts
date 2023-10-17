import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import { isNumber } from '../../../utils'

export const Props = {
  /**
   * @description height of scrollbar
   */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   * @description max height of scrollbar
   */
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   * @description whether to use the native scrollbar
   */
  native: {
    type: Boolean,
    default: false
  },
  /**
   * @description style of wrap
   */
  wrapStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: ''
  },
  /**
   * @description class of wrap
   */
  wrapClass: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  /**
   * @description class of view
   */
  viewClass: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  /**
   * @description style of view
   */
  viewStyle: {
    type: [String, Array, Object] as PropType<StyleValue>,
    default: ''
  },
  /**
   * @description do not respond to container size changes, if the container size does not change, it is better to set it to optimize performance
   */
  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  /**
   * @description element tag of the view
   */
  tag: {
    type: String,
    default: 'div'
  },
  /**
   * @description always show
   */
  always: Boolean,
  /**
   * @description minimum size of scrollbar
   */
  minSize: {
    type: Number,
    default: 20
  },
  /**
   * @description id of view
   */
  id: String,
  /**
   * @description role of view
   */
  role: String,
  /**
   * @description aria-label of view
   */
  ariaLabel: String,
  /**
   * @description aria-orientation of view
   */
  ariaOrientation: {
    type: String as PropType<'horizontal' | 'vertical'>
  }
} as const

export const Emits = {
  scroll: ({ scrollTop, scrollLeft }: { scrollTop: number; scrollLeft: number }): boolean =>
    [scrollTop, scrollLeft].every(isNumber)
}

export type ScrollbarProps = ExtractPropTypes<typeof Props>
