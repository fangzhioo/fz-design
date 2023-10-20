import RadioGroup from './src/radio-group.vue'

import { install } from '../../utils'

export const FzRadioGroup = install(RadioGroup)

export type RadioGroupInstance = InstanceType<typeof RadioGroup>

export * from './src/interface'

export default FzRadioGroup
