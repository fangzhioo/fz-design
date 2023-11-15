import type { ExtractPropTypes, PropType } from 'vue'
import type { Danmu } from './interface'

export const Props = {
  modelValue: {
    type: Array as PropType<Danmu[]>
  },
  /**
   * 轨道数量，0为最大轨道数量（撑满容器）
   */
  channels: {
    type: Number,
    default: 0
  },
  /**
   * 是否自动播放
   */
  autoplay: {
    type: Boolean,
    default: true
  },
  /**
   * 是否隐藏
   */
  hidden: {
    type: Boolean,
    default: false
  },
  /**
   * 是否循环播放
   */
  loop: {
    type: Boolean,
    default: false
  },
  /**
   * 是否开启弹幕插槽，默认否
   */
  useSlot: {
    type: Boolean,
    default: false
  },
  /**
   * 弹幕刷新频率(ms)
   */
  debounce: {
    type: Number,
    default: 100
  },
  /**
   * 弹幕速度（像素/秒）
   */
  speeds: {
    type: Number,
    default: 200
  },
  /**
   * 是否开启随机轨道注入弹幕
   */
  randomChannel: {
    type: Boolean,
    default: false
  },
  /**
   * 弹幕字号（仅文本模式）
   */
  fontSize: {
    type: Number,
    default: 18
  },
  /**
   * 弹幕垂直间距
   */
  top: {
    type: Number,
    default: 4
  },
  /**
   * 弹幕水平间距
   */
  right: {
    type: Number,
    default: 0
  },
  /**
   * 是否开启悬浮暂停
   */
  isSuspend: {
    type: Boolean,
    default: true
  },
  /**
   * 弹幕额外样式
   */
  extraStyle: {
    type: String,
    default: ''
  }
} as const

export const Emits = ['list-end', 'play-end', 'dm-over', 'dm-out', 'update:danmus']

export type DanmakuProps = ExtractPropTypes<typeof Props>
