import BackTop from './src/back-top.vue'

import { install } from '../../utils'

export const FzBackTop = install(BackTop)

export type BackTopInstance = InstanceType<typeof BackTop>

export * from './src/interface'

export default FzBackTop
