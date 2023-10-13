import Empty from './src/empty.vue'

import { install } from '../../utils'

export const FzEmpty = install(Empty)

export type EmptyInstance = InstanceType<typeof Empty>

export * from './src/interface'

export default FzEmpty
