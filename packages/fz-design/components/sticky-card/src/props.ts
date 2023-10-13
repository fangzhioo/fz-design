import type { ExtractPropTypes } from 'vue'

export const Props = {
  /** 是否展开 */
  open: {
    type: Boolean,
    default: false
  },
  /** 操作栏展开时的文字 */
  openText: {
    type: String,
    default: ''
  },
  /**操作栏关闭时的文字 */
  closeText: {
    type: String,
    default: ''
  },
  /** 自定义边框颜色 */
  borderColor: {
    type: String,
    default: ''
  }
} as const

/** sticky-card 组件 props 类型 */
export type StickyCardProps = ExtractPropTypes<typeof Props>
