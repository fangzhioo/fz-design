import Layout from './src/layout.vue'

import { install } from '../../utils'

export const FzLayout = install(Layout)

export type LayoutInstance = InstanceType<typeof Layout>

export * from './src/interface'

export default FzLayout
