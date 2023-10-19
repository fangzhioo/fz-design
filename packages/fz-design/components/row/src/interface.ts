import type { ComputedRef } from 'vue'

export type { RowProps } from './props'

export type RowJustify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'

export type RowAlign = 'top' | 'middle' | 'bottom'

export interface RowContext {
  gutter: ComputedRef<number>
}
