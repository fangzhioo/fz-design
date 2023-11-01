import type { ExtractPropTypes, PropType } from 'vue'
import type { WatermarkFontType } from './interface'

export const Props = {
  /**
   * @description The z-index of the appended watermark element
   */
  zIndex: {
    type: Number,
    default: 9
  },
  /**
   * @description The rotation angle of the watermark
   */
  rotate: {
    type: Number,
    default: -22
  },
  /**
   * @description The width of the watermark
   */
  width: Number,
  /**
   * @description The height of the watermark
   */
  height: Number,
  /**
   * @description Image source, it is recommended to export 2x or 3x image, high priority (support base64 format)
   */
  image: String,
  /**
   * @description Watermark text content
   */
  content: {
    type: [String, Array] as PropType<string | string[]>,
    default: 'Fz Design'
  },
  /**
   * @description Text style
   */
  font: {
    type: Object as PropType<WatermarkFontType>
  },
  /**
   * @description The spacing between watermarks
   */
  gap: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [100, 100]
  },
  /**
   * @description The offset of the watermark from the upper left corner of the container. The default is gap/2
   */
  offset: {
    type: Array as unknown as PropType<[number, number]>
  }
} as const

export type WatermarkProps = ExtractPropTypes<typeof Props>
