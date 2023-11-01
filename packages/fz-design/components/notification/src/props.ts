import type { ExtractPropTypes, PropType, VNode } from 'vue'
import type { NotificationPlacement, NotificationType } from './interface'
import type { IconSlotType } from '../../../types'

export const Props = {
  /** 通知标题 */
  title: {
    type: [String, Object] as PropType<VNode | string>,
    default: (): null => null
  },
  /** 通知文本 */
  message: {
    type: [String, Object] as PropType<VNode | string>,
    default: (): null => null
  },
  /**
   * 消息类型
   *
   * @values default primary success danger warning
   */
  type: {
    type: String as PropType<NotificationType>,
    default: 'default'
  },
  /** 是否可关闭 */
  closable: Boolean,
  /** 显示时间，单位为毫秒。 设为 0 则不会自动关闭 */
  duration: {
    type: Number,
    default: 2500
  },
  /** 是否为圆角类型 */
  round: Boolean,
  /** 是否显示按钮 */
  showIcon: {
    type: Boolean,
    default: true
  },
  /** 消息 icon */
  icon: {
    type: Object as PropType<IconSlotType>,
    default: (): null => null
  },
  /** 字体颜色 */
  color: String,
  /** 自定义背景色 */
  background: String,
  /** 偏移距离 */
  offset: {
    type: Number,
    default: 20
  },
  /**
   * 弹出位置
   */
  placement: {
    type: String as PropType<NotificationPlacement>,
    default: 'top'
  },
  /** 层级 */
  zIndex: Number,
  /** 关闭按钮 */
  closeBtn: {
    type: [String, Object] as PropType<string | VNode>,
    default: (): null => null
  },
  /** 关闭回调 */
  onClose: {
    type: Function as PropType<(evt?: MouseEvent) => void>,
    default: (): null => null
  }
} as const

export type NotificationProps = ExtractPropTypes<typeof Props>
