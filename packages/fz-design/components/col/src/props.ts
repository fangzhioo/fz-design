import type { ExtractPropTypes, PropType } from 'vue'
import type { ColSize } from './interface'

export const Props = {
  /**
   * @description custom element tag
   */
  tag: {
    type: String,
    default: 'div'
  },
  /**
   * @description number of column the grid spans
   */
  span: {
    type: Number,
    default: 24
  },
  /**
   * @description number of spacing on the left side of the grid
   */
  offset: {
    type: Number,
    default: 0
  },
  /**
   * @description number of columns that grid moves to the left
   */
  pull: {
    type: Number,
    default: 0
  },
  /**
   * @description number of columns that grid moves to the right
   */
  push: {
    type: Number,
    default: 0
  },
  /**
   * @description `<768px` Responsive columns or column props object
   */
  xs: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({} as const)
  },
  /**
   * @description `≥768px` Responsive columns or column props object
   */
  sm: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({} as const)
  },
  /**
   * @description `≥992px` Responsive columns or column props object
   */
  md: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({} as const)
  },
  /**
   * @description `≥1200px` Responsive columns or column props object
   */
  lg: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({} as const)
  },
  /**
   * @description `≥1920px` Responsive columns or column props object
   */
  xl: {
    type: [Number, Object] as PropType<ColSize>,
    default: () => ({} as const)
  }
} as const

export type ColProps = ExtractPropTypes<typeof Props>
