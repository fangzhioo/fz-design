import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import { isNumber } from '../../../utils'
import type { NumberAnimateSize, NumberAnimateType } from './interface'

export const Props = {
  /** 开始的动画数字 */
  from: {
    type: Number,
    default: 0
  },
  /** 结束的动画数字 */
  to: {
    type: Number
  },
  /** 尺寸 */
  size: {
    type: String as PropType<NumberAnimateSize>,
    default: ''
  },
  /** 类型 */
  type: {
    type: String as PropType<NumberAnimateType>,
    default: ''
  },
  /**
   * 执行动画结束的大概时间
   *
   * 准确时间由浏览器的下一侦渲染决定
   */
  duration: {
    type: Number,
    default: 2000
  },
  /** 对数字决定金额格式化 */
  formatter: Boolean,
  /** 样式列表 */
  styles: {
    type: Object as PropType<CSSProperties>
  },
  /** 是否初始化自动播放 */
  automatic: {
    type: Boolean,
    default: true
  }
} as const

export const Emits = {
    /** 动画结束触发函数 */
  end: (elapsed: number): elapsed is number => isNumber(elapsed)
}

export type NumberAnimateProps = ExtractPropTypes<typeof Props>
