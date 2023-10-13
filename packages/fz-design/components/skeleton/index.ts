import Skeleton from './src/skeleton.vue'

import { install } from '../../utils'

export const FzSkeleton = install(Skeleton)

export type SkeletonInstance = InstanceType<typeof Skeleton>

export * from './src/interface'

export default FzSkeleton
