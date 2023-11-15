import Form from './src/form.vue'

import { install } from '../../utils'

export const FzForm = install(Form)

export type FormInstance = InstanceType<typeof Form>

export * from './src/interface'

export * from './src/hooks'

export default FzForm
