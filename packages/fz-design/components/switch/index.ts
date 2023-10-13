import Switch from './src/switch.vue'

import { install } from '../../utils'

export const FzSwitch = install(Switch)

export type SwitchInstance = InstanceType<typeof Switch>

export * from './src/interface'

export default FzSwitch
