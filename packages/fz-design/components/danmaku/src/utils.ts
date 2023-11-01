import type { WritableComputedRef} from 'vue';
import { computed } from 'vue'

export function useModelWrapper<T> (
  props: any,
  emit: Function,
  name = 'modelValue',
  translater?: Function
): WritableComputedRef<T> {
  return computed<T>({
    get: () => props[name],
    set: value => {
      emit(`update:${name}`, translater ? translater(value) : value)
    }
  })
}
