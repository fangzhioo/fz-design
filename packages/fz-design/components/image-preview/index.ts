import ImagePreview from './src/image-preview.vue'

import { install } from '../../utils'

export const FzImagePreview = install(ImagePreview)

export type ImagePreviewInstance = InstanceType<typeof ImagePreview>

export * from './src/interface'

export default FzImagePreview
