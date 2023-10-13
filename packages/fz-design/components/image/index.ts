import Image from './src/image.vue'

import { install } from '../../utils'

export const FzImage = install(Image)

export type ImageInstance = InstanceType<typeof Image>

export * from './src/interface'

export default FzImage
