import Checkbox from './src/checkbox.vue'

import { install } from '../../utils'

export const FzCheckbox = install(Checkbox)

export type CheckboxInstance = InstanceType<typeof Checkbox>

export * from './src/interface'

export default FzCheckbox
