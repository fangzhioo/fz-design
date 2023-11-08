import MessageVue from './src/message.vue'

import { installFn } from '../../utils'

import { useMessage } from './src/hooks'

const { Message } = useMessage(MessageVue, 'message')

export const FzMessage = installFn(Message, 'FzMessage')

export * from './src/interface'

export * from './src/hooks'

export default FzMessage
