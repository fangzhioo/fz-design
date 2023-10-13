import Radio from './src/radio.vue'

import { install } from '../../utils'

export const FzRadio = install(Radio)

export type RadioInstance = InstanceType<typeof Radio>

export * from './src/interface'

export default FzRadio
