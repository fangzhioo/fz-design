export type { ColProps } from './props'

export interface ColSizeObject {
  span?: number
  offset?: number
  pull?: number
  push?: number
}

export type ColSize = number | ColSizeObject
