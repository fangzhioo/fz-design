import type { ExtractPropTypes, PropType, StyleValue } from 'vue'
import type { CardShadow } from './interface'

export const Props = {
  header: {
    type: String,
    default: ''
  },
  bodyStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: ''
  },
  shadow: {
    type: String as PropType<CardShadow>,
    default: 'hover'
  }
} as const

export type CardProps = ExtractPropTypes<typeof Props>
