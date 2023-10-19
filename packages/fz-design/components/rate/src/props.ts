import type { ExtractPropTypes, PropType } from 'vue'
import { IconStar } from '@fz-design/fz-design-icon'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { isNumber } from '../../../utils'
import type { RateSize } from './interface'
import type { IconSlotType } from '../../../types'

export const Props = {
  /**
   * @description binding value
   */
  modelValue: {
    type: Number,
    default: 0
  },
  /**
   * @description native `id` attribute
   */
  id: {
    type: String,
    default: undefined
  },
  /**
   * @description threshold value between low and medium level. The value itself will be included in low level
   */
  lowThreshold: {
    type: Number,
    default: 2
  },
  /**
   * @description threshold value between medium and high level. The value itself will be included in high level
   */
  highThreshold: {
    type: Number,
    default: 4
  },
  /**
   * @description max rating score
   */
  max: {
    type: Number,
    default: 5
  },
  /**
   * @description colors for icons. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding color
   */
  colors: {
    type: [Array, Object] as PropType<string[] | Record<number, string>>,
    default: () => ['', '', '']
  },
  /**
   * @description color of unselected icons
   */
  voidColor: {
    type: String,
    default: ''
  },
  /**
   * @description color of unselected read-only icons
   */
  disabledVoidColor: {
    type: String,
    default: ''
  },
  /**
   * @description icon components. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding icon component
   */
  icons: {
    type: [Array, Object] as PropType<
      (string | IconSlotType)[] | Record<number, string | IconSlotType>
    >,
    default: () => [IconStar, IconStar, IconStar]
  },
  /**
   * @description component of unselected icons
   */
  voidIcon: {
    type: Object as PropType<IconSlotType>,
    default: () => IconStar
  },
  /**
   * @description component of unselected read-only icons
   */
  disabledVoidIcon: {
    type: Object as PropType<IconSlotType>,
    default: () => IconStar
  },
  /**
   * @description whether Rate is read-only
   */
  disabled: Boolean,
  /**
   * @description whether picking half start is allowed
   */
  allowHalf: Boolean,
  /**
   * @description whether to display texts
   */
  showText: Boolean,
  /**
   * @description whether to display current score. show-score and show-text cannot be true at the same time
   */
  showScore: Boolean,
  /**
   * @description color of texts
   */
  textColor: {
    type: String,
    default: ''
  },
  /**
   * @description text array
   */
  texts: {
    type: Array as PropType<string[]>,
    default: () => ['一星', '二星', '三星', '四星', '五星']
  },
  /**
   * @description score template
   */
  scoreTemplate: {
    type: String,
    default: '{value}'
  },
  /**
   * @description size of Rate
   */
  size: {
    type: String as PropType<RateSize>,
    default: ''
  },
  /**
   * @description same as `aria-label` in Rate
   */
  label: {
    type: String,
    default: undefined
  },
  /**
   * @description whether value can be reset to `0`
   */
  clearable: {
    type: Boolean,
    default: false
  }
} as const

export const Emits = {
  [CHANGE_EVENT]: (value: number): boolean => isNumber(value),
  [UPDATE_MODEL_EVENT]: (value: number): boolean => isNumber(value)
}

export type RateProps = ExtractPropTypes<typeof Props>
