import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { SliderProps } from '../props'
import type { SliderMarkerProps } from '../components/marker'

export interface Mark extends SliderMarkerProps {
  point: number
  position: number
}

export const useMarks = (props: SliderProps): ComputedRef<any> => {
  return computed(() => {
    if (!props.marks) {
      return []
    }

    const marksKeys = Object.keys(props.marks)
    return marksKeys
      .map(Number.parseFloat)
      .sort((a, b) => a - b)
      .filter(point => point <= props.max && point >= props.min)
      .map(
        (point): Mark => ({
          point,
          position: ((point - props.min) * 100) / (props.max - props.min),
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          mark: (props.marks)![point]
        })
      )
  })
}
