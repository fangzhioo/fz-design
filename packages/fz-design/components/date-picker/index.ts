import DatePicker from './src/date-picker.vue'

import { install } from '../../utils'

export const FzDatePicker = install(DatePicker)

export type DatePickerInstance = InstanceType<typeof DatePicker>

export * from './src/interface'

export default FzDatePicker
