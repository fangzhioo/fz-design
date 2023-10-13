import Notification from './src/notification.vue'

import { install } from '../../utils'

export const FzNotification = install(Notification)

export type NotificationInstance = InstanceType<typeof Notification>

export * from './src/interface'

export default FzNotification
