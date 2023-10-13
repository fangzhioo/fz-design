import Divider from './src/divider.vue'

import { install } from '../../utils'

export const FzDivider = install(Divider)

export type DividerInstance = InstanceType<typeof Divider>

export * from './src/interface'

export default FzDivider
