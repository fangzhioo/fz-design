import Message from './src/message.vue'

import { install } from '../../utils'

export const FzMessage = install(Message)

export type MessageInstance = InstanceType<typeof Message>

export * from './src/interface'

export default FzMessage
