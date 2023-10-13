import Tabs from './src/tabs.vue'

import { install } from '../../utils'

export const FzTabs = install(Tabs)

export type TabsInstance = InstanceType<typeof Tabs>

export * from './src/interface'

export default FzTabs
