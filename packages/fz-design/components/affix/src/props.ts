import { isBoolean, isNumber } from '../../../utils'
import { CHANGE_EVENT } from '../../../constants'
import type { ExtractPropTypes, PropType } from 'vue'

export const Props = {
  /**
   * @description affix element zIndex value
   * */
  zIndex: {
    type: [Number, String] as PropType<number | string>,
    default: 100
  },
  /**
   * @description target container. (CSS selector)
   */
  target: {
    type: String,
    default: ''
  },
  /**
   * @description offset distance
   * */
  offset: {
    type: Number,
    default: 0
  },
  /**
   * @description position of affix
   * */
  position: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top'
  }
} as const

export const Emits = {
  scroll: ({ scrollTop, fixed }: { scrollTop: number; fixed: boolean }): boolean =>
    isNumber(scrollTop) && isBoolean(fixed),
  [CHANGE_EVENT]: (fixed: boolean): boolean => isBoolean(fixed)
}
export type AffixEmits = typeof Emits

export type AffixProps = ExtractPropTypes<typeof Props>
