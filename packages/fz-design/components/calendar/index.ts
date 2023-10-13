import Calendar from './src/calendar.vue'

import { install } from '../../utils'

export const FzCalendar = install(Calendar)

export type CalendarInstance = InstanceType<typeof Calendar>

export * from './src/interface'

export default FzCalendar
