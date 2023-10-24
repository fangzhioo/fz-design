import type { CheckboxLabel } from '../../checkbox'
import type { CheckboxGroupProps } from './props'

export type { CheckboxGroupProps } from './props'

/** 注入的依赖项类型 */
export type CheckboxGroupProvide = CheckboxGroupProps & {
  setChange: (val: CheckboxLabel[] | CheckboxLabel) => void
}
