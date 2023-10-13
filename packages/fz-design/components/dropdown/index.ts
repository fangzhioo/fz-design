import Dropdown from './src/dropdown.vue'

import { install } from '../../utils'

export const FzDropdown = install(Dropdown)

export type DropdownInstance = InstanceType<typeof Dropdown>

export * from './src/interface'

export default FzDropdown
