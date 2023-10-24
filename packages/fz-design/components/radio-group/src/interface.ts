import type { RadioModelValue } from '../../radio'
import type { RadioGroupProps } from './props'
export type { RadioGroupProps } from './props'

/**
 * 注入的依赖项类型接口
 */
export type RadioGroupInjectContext = RadioGroupProps & {
  changeEvent: (value: RadioModelValue) => void
}
