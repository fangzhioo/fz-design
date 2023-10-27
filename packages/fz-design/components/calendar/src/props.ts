import type { ExtractPropTypes, PropType } from 'vue'
import { isNumber } from '../../../utils'
import { CHANGE_EVENT } from '../../../constants'

export const Props = {
  /** 绑定日期 */
  date: {
    type: Date,
    default: (): Date => new Date(),
    required: true
  },
  /** 是否显示农历或节日，仅支持 1900 ~ 2100 */
  lunar: {
    type: Boolean
  },
  /** 是否隐藏头部 */
  hiddenHeader: {
    type: Boolean,
    default: false
  },
  /** 是否显示边框 */
  border: {
    type: Boolean
  },
  /** 自定义边框颜色 */
  borderColor: {
    type: String
  },
  /** 日期单元格高度 */
  dayCellHeight: {
    type: [Number, String] as PropType<string | number>
  },
  /** 星期单元格高度 */
  weekCellHeight: {
    type: [Number, String] as PropType<string | number>
  }
} as const

export const Emits = {
  [CHANGE_EVENT]: (year: number, month: number, date: number): boolean => isNumber(date)
}

export type CalendarProps = ExtractPropTypes<typeof Props>
