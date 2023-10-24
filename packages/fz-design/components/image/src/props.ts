import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber } from '../../../utils'
import type { ImageFit, ImageLoading } from './interface'

export const Props = {
  /**
   * when enabling preview, use this flag to control whether clicking on backdrop can exit preview mode.
   */
  hideOnClickModal: Boolean,
  /**
   * image source, same as native.
   */
  src: {
    type: String,
    default: ''
  },
  /**
   * indicate how the image should be resized to fit its container, same as [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
   */
  fit: {
    type: String as PropType<ImageFit>
  },
  /**
   * Indicates how the browser should load the image, same as [native](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)
   */
  loading: {
    type: String as PropType<ImageLoading>
  },
  /**
   * whether to use lazy load.
   */
  lazy: Boolean,
  /**
   * the container to add scroll listener when using lazy load.
   */
  scrollContainer: {
    type: [String, Object] as PropType<string | HTMLElement | undefined>
  },
  /**
   * allow big image preview.
   */
  previewSrcList: {
    type: Array as PropType<string[]>,
    default: () => [] as const
  },
  /**
   * whether to append image-viewer to body. A nested parent element attribute transform should have this attribute set to `true`.
   */
  previewTeleported: Boolean,
  /**
   * set image preview z-index.
   */
  zIndex: {
    type: Number
  },
  /**
   * initial preview image index, less than the length of `url-list`.
   */
  initialIndex: {
    type: Number,
    default: 0
  },
  /**
   * whether the viewer preview is infinite.
   */
  infinite: {
    type: Boolean,
    default: true
  },
  /**
   * whether the image-viewer can be closed by pressing ESC.
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
   * the zoom rate of the image viewer zoom event
   */
  zoomRate: {
    type: Number,
    default: 1.2
  },
  /**
   * the min scale of the image viewer zoom event.
   */
  minScale: {
    type: Number,
    default: 0.2
  },
  /**
   * the max scale of the image viewer zoom event.
   */
  maxScale: {
    type: Number,
    default: 7
  }
} as const

export const Emits = {
  load: (evt: Event): boolean => evt instanceof Event,
  error: (evt: Event): boolean => evt instanceof Event,
  switch: (val: number): boolean => isNumber(val),
  close: (): boolean => true,
  show: (): boolean => true
}

export type ImageProps = ExtractPropTypes<typeof Props>
