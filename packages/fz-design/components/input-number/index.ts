import InputNumber from './src/input-number.vue'

import { install } from '../../utils'

export const FzInputNumber = install(InputNumber)

export type InputNumberInstance = InstanceType<typeof InputNumber>

export * from './src/interface'

export default FzInputNumber
