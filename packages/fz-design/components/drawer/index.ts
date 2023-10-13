import Drawer from './src/drawer.vue'

import { install } from '../../utils'

export const FzDrawer = install(Drawer)

export type DrawerInstance = InstanceType<typeof Drawer>

export * from './src/interface'

export default FzDrawer
