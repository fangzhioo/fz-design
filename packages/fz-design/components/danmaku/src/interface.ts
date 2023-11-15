export type { DanmakuProps } from './props'

/**
 * 自定义弹幕
 */
export type CustomDanmu = Record<string, any>

/**
 * 弹幕类型
 */
export type Danmu = string | CustomDanmu

/**
 * 弹幕轨道
 */
export type DanChannel = Record<number, [HTMLDivElement]>;

/**
 * 弹幕元素属性
 */
export interface DanmuItem {
  height: number
  fontSize: number
  speeds: number
  top: number
  right: number
}

/**
 * 弹幕库属性
 */
export interface DanmakuItem {
  channels: number
  autoplay: boolean
  loop: boolean
  useSlot: boolean
  debounce: number
  randomChannel: boolean
}
