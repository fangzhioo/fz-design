import Scrollbar from './src/scrollbar.vue'

import { install } from '../../utils'

export const FzScrollbar = install(Scrollbar)

export type ScrollbarInstance = InstanceType<typeof Scrollbar>

export * from './src/interface'

export default FzScrollbar
