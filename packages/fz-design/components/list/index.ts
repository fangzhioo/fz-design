import List from './src/list.vue'

import { install } from '../../utils'

export const FzList = install(List)

export type ListInstance = InstanceType<typeof List>

export * from './src/interface'

export default FzList
