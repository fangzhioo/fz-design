import Tooltip from './src/tooltip.vue'
import TooltipContent from './src/components/content.vue'
import TooltipTrigger from './src/components/trigger.vue'

import { install } from '../../utils'

export const FzTooltip = install(Tooltip)

export type TooltipInstance = InstanceType<typeof Tooltip>

export * from './src/interface'

export { Tooltip, TooltipContent, TooltipTrigger }

export default FzTooltip
