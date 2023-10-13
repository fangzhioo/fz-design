import type { ExtractPropTypes } from 'vue'

export const Props = {} as const

export type CountDownProps = ExtractPropTypes<typeof Props>
