import CollapseTransition from './src/collapse-transition.vue'

import { install } from '../../utils'

export const FzCollapseTransition = install(CollapseTransition)

export type CollapseTransitionInstance = InstanceType<typeof CollapseTransition>

export * from './src/interface'

export default FzCollapseTransition
