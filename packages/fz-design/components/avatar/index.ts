import Avatar from './src/avatar.vue'

import { install } from '../../utils'

export const FzAvatar = install(Avatar)

export type AvatarInstance = InstanceType<typeof Avatar>

export * from './src/interface'

export default FzAvatar
