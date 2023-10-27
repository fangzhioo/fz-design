import type { ExtractPropTypes, PropType } from 'vue'
import type { BadgeType } from './interface'

export const Props = {
  /**
   *  display value.
   */
  value: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   *  maximum value, shows `{max}+` when exceeded. Only works if value is a number.
   */
  max: {
    type: Number,
    default: 99
  },
  /**
   *  if a little dot is displayed.
   */
  dot: Boolean,
  /**
   *  hidden badge.
   */
  hidden: Boolean,
  /**
   *  badge type.
   */
  type: {
    type: String as PropType<BadgeType>,
    default: 'error'
  }
} as const

export type BadgeProps = ExtractPropTypes<typeof Props>
