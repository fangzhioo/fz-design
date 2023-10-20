import Swap from './src/swap.vue'

import { install } from '../../utils'

export const FzSwap = install(Swap)

export type SwapInstance = InstanceType<typeof Swap>

export * from './src/interface'

export default FzSwap
