import Alert from './src/alert.vue'

import { install } from '../../utils'

export const FzAlert = install(Alert)

export type AlertInstance = InstanceType<typeof Alert>

export * from './src/interface'

export default FzAlert
