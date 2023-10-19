import type { ExtractPropTypes, PropType } from 'vue'
import type { TextType, TextSize } from './interface'

export const Props = {
  /**
   *  text type
   */
  type: {
    type: String as PropType<TextType>,
    default: ''
  },
  /**
   *  text size
   */
  size: {
    type: String as PropType<TextSize>,
    default: ''
  },
  /**
   * ellipsis
   */
  ellipsis: {
    type: Boolean,
    default: false
  },
  /**
   *  maximum lines
   */
  lineClamp: {
    type: [String, Number] as PropType<number|string>
  },
  /**
   *  custom element tag
   */
  tag: {
    type: String,
    default: 'span'
  }
} as const

export type TextProps = ExtractPropTypes<typeof Props>
