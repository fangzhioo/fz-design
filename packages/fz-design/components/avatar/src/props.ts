import type { ExtractPropTypes, PropType } from 'vue'
import type { AvatarSize } from './interface'
import type { IconSlotType } from '../../../types'
import type { ImageFit } from '../../image'

export const Props = {
  /**
   * avatar size.
   */
  size: {
    type: [Number, String] as PropType<AvatarSize>,
    default: ''
  },
  /**
   * avatar shape.
   */
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle'
  },
  /**
   * representation type to icon, more info on icon component.
   */
  icon: {
    type: Object as PropType<IconSlotType>
  },
  /**
   * the source of the image for an image avatar.
   */
  src: {
    type: String,
    default: ''
  },
  /**
   * native attribute `alt` of image avatar.
   */
  alt: String,
  /**
   * native attribute srcset of image avatar.
   */
  srcSet: String,
  /**
   * set how the image fit its container for an image avatar.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
   */
  fit: {
    type: String as PropType<ImageFit>,
    default: 'cover'
  }
} as const

export const Emits = {
  error: (evt: Event): evt is Event => evt instanceof Event
}

export type AvatarEmits = typeof Emits

export type AvatarProps = ExtractPropTypes<typeof Props>
