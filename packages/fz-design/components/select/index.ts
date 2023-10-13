import Select from './src/select.vue'

import { install } from '../../utils'

export const FzSelect = install(Select)

export type SelectInstance = InstanceType<typeof Select>

export * from './src/interface'

export default FzSelect
