import Loading from './src/loading.vue'

import { install } from '../../utils'

export const FzLoading = install(Loading)

export type LoadingInstance = InstanceType<typeof Loading>

export * from './src/interface'

export default FzLoading
