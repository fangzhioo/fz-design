import type { ExtractPropTypes, PropType } from 'vue'
import type { RoleTypes } from './interface'

export const Props = {
  role: {
    type: String as PropType<RoleTypes>,
    default: 'tooltip'
  }
} as const

export type PopperProps = ExtractPropTypes<typeof Props>
