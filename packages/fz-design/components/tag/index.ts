import Tag from './src/tag.vue'

import { install } from '../../utils'

export const FzTag = install(Tag)

export type TagInstance = InstanceType<typeof Tag>

export * from './src/interface'

export default FzTag
