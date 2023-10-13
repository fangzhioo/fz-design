import Progress from './src/progress.vue'

import { install } from '../../utils'

export const FzProgress = install(Progress)

export type ProgressInstance = InstanceType<typeof Progress>

export * from './src/interface'

export default FzProgress
