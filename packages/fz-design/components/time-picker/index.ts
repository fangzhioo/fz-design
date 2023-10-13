import TimePicker from './src/time-picker.vue'

import { install } from '../../utils'

export const FzTimePicker = install(TimePicker)

export type TimePickerInstance = InstanceType<typeof TimePicker>

export * from './src/interface'

export default FzTimePicker
