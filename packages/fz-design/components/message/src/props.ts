import type { ExtractPropTypes } from 'vue'

export const Props = {} as const

export type MessageProps = ExtractPropTypes<typeof Props>
