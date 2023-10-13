import Tooltip from './src/tooltip.vue'

import { install } from '../../utils'

export const FzTooltip = install(Tooltip)

export type TooltipInstance = InstanceType<typeof Tooltip>

export * from './src/interface'

export default FzTooltip
