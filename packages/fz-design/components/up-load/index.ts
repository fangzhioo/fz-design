import UpLoad from './src/up-load.vue'

import { install } from '../../utils'

export const FzUpLoad = install(UpLoad)

export type UpLoadInstance = InstanceType<typeof UpLoad>

export * from './src/interface'

export default FzUpLoad
