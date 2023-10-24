import type { ExtractPropTypes, PropType } from 'vue'
import type { TagSize, TagTheme, TagType } from './interface'

export const Props = {
  /**
   *  type of Tag
   */
  type: {
    type: String as PropType<TagType>
  },
  /**
   *  size of Tag
   */
  size: {
    type: String as PropType<TagSize>,
    default: ''
  },
  /**
   *  theme of Tag
   */
  effect: {
    type: String as PropType<TagTheme>,
    default: 'light'
  },
  /**
   *  whether Tag can be removed
   */
  closable: Boolean,
  /**
   *  whether to disable animations
   */
  disableTransitions: Boolean,
  /**
   *  whether Tag has a highlighted border
   */
  hit: Boolean,
  /**
   *  background color of the Tag
   */
  color: {
    type: String,
    default: ''
  },

  /**
   *  whether Tag is rounded
   */
  round: Boolean
} as const

export const Emits = {
  close: (evt: MouseEvent): boolean => evt instanceof MouseEvent,
  click: (evt: MouseEvent): boolean => evt instanceof MouseEvent
}

export type TagProps = ExtractPropTypes<typeof Props>
