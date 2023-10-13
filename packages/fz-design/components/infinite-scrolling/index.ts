import InfiniteScrolling from './src/infinite-scrolling.vue'

import { install } from '../../utils'

export const FzInfiniteScrolling = install(InfiniteScrolling)

export type InfiniteScrollingInstance = InstanceType<typeof InfiniteScrolling>

export * from './src/interface'

export default FzInfiniteScrolling
