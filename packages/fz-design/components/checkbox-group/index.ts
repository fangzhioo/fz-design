import CheckboxGroup from './src/checkbox-group.vue'

import { install } from '../../utils'

export const FzCheckboxGroup = install(CheckboxGroup)

export type CheckboxGroupInstance = InstanceType<typeof CheckboxGroup>

export * from './src/interface'

export default FzCheckboxGroup
