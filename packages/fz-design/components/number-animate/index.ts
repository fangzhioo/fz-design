import NumberAnimate from './src/number-animate.vue'

import { install } from '../../utils'

export const FzNumberAnimate = install(NumberAnimate)

export type NumberAnimateInstance = InstanceType<typeof NumberAnimate>

export * from './src/interface'

export default FzNumberAnimate
