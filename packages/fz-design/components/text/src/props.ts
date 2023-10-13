import type { ExtractPropTypes } from 'vue'

export const Props = {} as const

export type TextProps = ExtractPropTypes<typeof Props>
