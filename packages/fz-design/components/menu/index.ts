import Menu from './src/menu.vue'

import { install } from '../../utils'

export const FzMenu = install(Menu)

export type MenuInstance = InstanceType<typeof Menu>

export * from './src/interface'

export default FzMenu
