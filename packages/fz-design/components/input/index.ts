import Input from './src/input.vue'

import { install } from '../../utils'

export const FzInput = install(Input)

export type InputInstance = InstanceType<typeof Input>

export * from './src/interface'

export default FzInput
