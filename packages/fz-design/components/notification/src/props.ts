import type { ExtractPropTypes } from 'vue'

export const Props = {} as const

export type NotificationProps = ExtractPropTypes<typeof Props>
