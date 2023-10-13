import CountDown from './src/count-down.vue'

import { install } from '../../utils'

export const FzCountDown = install(CountDown)

export type CountDownInstance = InstanceType<typeof CountDown>

export * from './src/interface'

export default FzCountDown
