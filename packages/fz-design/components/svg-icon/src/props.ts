import type { ExtractPropTypes, PropType } from 'vue'

export const Props = {
  /** icon 内容 */
    icon: {
        type: Object as PropType<any>
    },
    color: {
        type: String,
        default: ''
    },
    size: {
        type: [String, Number] as PropType<string | number>
    }

} as const

export type SvgIconProps = ExtractPropTypes<typeof Props>
