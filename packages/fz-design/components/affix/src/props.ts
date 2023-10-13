import type { ExtractPropTypes } from 'vue'

export const Props = {} as const

export type AffixProps = ExtractPropTypes<typeof Props>
