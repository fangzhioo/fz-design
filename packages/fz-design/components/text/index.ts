import Text from './src/text.vue'

import { install } from '../../utils'

export const FzText = install(Text)

export type TextInstance = InstanceType<typeof Text>

export * from './src/interface'

export default FzText
