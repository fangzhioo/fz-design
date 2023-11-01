import type { ComponentType } from '../../../types'

export type { NotificationProps } from './props'

export type NotificationType = ComponentType

/** 不同弹出位置类型 */
export type NotificationPlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
