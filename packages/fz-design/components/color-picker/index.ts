import ColorPicker from './src/color-picker.vue'

import { install } from '../../utils'

export const FzColorPicker = install(ColorPicker)

export type ColorPickerInstance = InstanceType<typeof ColorPicker>

export * from './src/interface'

export default FzColorPicker
