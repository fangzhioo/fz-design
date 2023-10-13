import Rate from './src/rate.vue'

import { install } from '../../utils'

export const FzRate = install(Rate)

export type RateInstance = InstanceType<typeof Rate>

export * from './src/interface'

export default FzRate
