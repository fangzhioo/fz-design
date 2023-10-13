import Textarea from './src/textarea.vue'

import { install } from '../../utils'

export const FzTextarea = install(Textarea)

export type TextareaInstance = InstanceType<typeof Textarea>

export * from './src/interface'

export default FzTextarea
