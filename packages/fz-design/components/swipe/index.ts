import Swipe from './src/swipe.vue'

import { install } from '../../utils'

export const FzSwipe = install(Swipe)

export type SwipeInstance = InstanceType<typeof Swipe>

export * from './src/interface'

export default FzSwipe
