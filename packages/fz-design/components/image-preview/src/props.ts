import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber } from '../../../utils'

export const Props = {
  /**
   *  preview link list.
   */
  urlList: {
    type: Array as PropType<string[]>,
    default: () => [] as const
  },
  /**
   *  preview backdrop z-index.
   */
  zIndex: {
    type: Number
  },
  /**
   *  the initial preview image index, less than or equal to the length of `url-list`.
   */
  initialIndex: {
    type: Number,
    default: 0
  },
  /**
   *  whether preview is infinite.
   */
  infinite: {
    type: Boolean,
    default: true
  },
  /**
   *  whether user can emit close event when clicking backdrop.
   */
  hideOnClickModal: Boolean,
  /**
   *  whether to append image itself to body. A nested parent element attribute transform should have this attribute set to `true`.
   */
  teleported: Boolean,
  /**
   *  whether the image-viewer can be closed by pressing ESC.
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
   *  the zoom rate of the image viewer zoom event.
   */
  zoomRate: {
    type: Number,
    default: 1.2
  },
  /**
   *  the min scale of the image viewer zoom event.
   */
  minScale: {
    type: Number,
    default: 0.2
  },
  /**
   *  the max scale of the image viewer zoom event.
   */
  maxScale: {
    type: Number,
    default: 7
  }
} as const

export const Emits = {
  close: (): boolean => true,
  switch: (index: number): boolean => isNumber(index),
  rotate: (deg: number): boolean => isNumber(deg)
}

export type ImagePreviewProps = ExtractPropTypes<typeof Props>
