import Slider from './src/slider.vue'

import { install } from '../../utils'

export const FzSlider = install(Slider)

export type SliderInstance = InstanceType<typeof Slider>

export * from './src/interface'

export default FzSlider
