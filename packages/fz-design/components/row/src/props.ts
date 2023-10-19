import type { ExtractPropTypes, PropType } from 'vue'
import type { RowAlign, RowJustify } from './interface'

export const Props = {
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: 'div'
  },
  /**
   * @description grid spacing
   */
  gutter: {
    type: Number,
    default: 0
  },
  /**
   * @description horizontal alignment of flex layout
   */
  justify: {
    type: String as PropType<RowJustify>,
    default: 'start'
  },
  /**
   * @description vertical alignment of flex layout
   */
  align: {
    type: String as PropType<RowAlign>
  }
} as const

export type RowProps = ExtractPropTypes<typeof Props>
