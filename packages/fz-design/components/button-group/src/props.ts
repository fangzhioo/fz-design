import type { ExtractPropTypes } from 'vue'
import { Props as ButtonProps } from '../../button/src/props';

export const Props = {
    size: ButtonProps.size,
    type: ButtonProps.type
} as const

export type ButtonGroupProps = ExtractPropTypes<typeof Props>
