import ButtonGroup from './src/button-group.vue'

import { install } from '../../utils'

export const FzButtonGroup = install(ButtonGroup)

export type ButtonGroupInstance = InstanceType<typeof ButtonGroup>

export * from './src/interface'

export default FzButtonGroup
