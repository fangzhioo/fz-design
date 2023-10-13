import Badge from './src/badge.vue'

import { install } from '../../utils'

export const FzBadge = install(Badge)

export type BadgeInstance = InstanceType<typeof Badge>

export * from './src/interface'

export default FzBadge
