import type { ExtractPropTypes, PropType } from 'vue'
import type { ComponentSize } from '../../../types'
import type { Language } from '../../../locale'
import type { Theme } from '../../../hooks'

export const Props = {
  locale: {
    type: Object as PropType<Language>
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: 'medium'
  },
  theme: {
    type: String as PropType<Theme>,
    default: ''
  },
  zIndex: {
    type: Number,
    default: 2000
  }
} as const

export type ConfigProviderProps = ExtractPropTypes<typeof Props>
