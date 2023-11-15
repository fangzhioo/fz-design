import { isString } from '../../../../utils'
import { useNamespace } from '../../../../hooks'
import { computed, defineComponent, h } from 'vue'
import type { CSSProperties, ExtractPropTypes, PropType, VNode } from 'vue'

interface MarkObj {
  style: CSSProperties
  label: any
}

export const sliderMarkerProps = {
  mark: {
    type: [String, Object] as PropType<string | MarkObj>,
    default: undefined
  }
} as const
export type SliderMarkerProps = ExtractPropTypes<typeof sliderMarkerProps>

export default defineComponent({
  name: 'FzSliderMarker',
  props: sliderMarkerProps,
  setup (props) {
    const ns = useNamespace('slider')
    const label = computed(() => {
      const mark = props.mark || ''
      return isString(mark) ? mark : mark.label
    })
    const style = computed(() => {
      const mark = props.mark || ''
      return isString(mark) ? undefined : mark.style
    })

    return (): VNode =>
      h(
        'div',
        {
          class: ns.e('marks-text'),
          style: style.value
        },
        label.value
      )
  }
})
