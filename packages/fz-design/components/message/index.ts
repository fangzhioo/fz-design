import MessageVue from './src/message.vue'

import { installFn } from '../../utils'

import { useMessage } from './src/hooks/use-message'

const { Message } = useMessage(MessageVue, 'message')

export const FzMessage = installFn(Message, 'FzMessage')

export * from './src/interface'

export default FzMessage
