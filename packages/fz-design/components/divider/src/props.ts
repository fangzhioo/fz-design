import type { ExtractPropTypes, PropType } from 'vue'

export const Props = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  contentPosition: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  borderStyle: {
    type: String as PropType<CSSStyleDeclaration['borderStyle']>,
    default: 'solid'
  }
} as const

export type DividerProps = ExtractPropTypes<typeof Props>
