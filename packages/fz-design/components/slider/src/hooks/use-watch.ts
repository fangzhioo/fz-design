import { watch } from 'vue'
import type { ComputedRef, SetupContext } from 'vue'
// import type { FormItemContext } from '@element-plus/components/form'
import type { SliderEmits, SliderProps } from '../props';
import type { SliderInitData } from '../interface';
import { INPUT_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants';
import type { Arrayable } from '../../../../types';
import { throwError, warning } from '../../../../utils';

type FormItemContext = any

export const useWatch = (
  props: SliderProps,
  initData: SliderInitData,
  minValue: ComputedRef<number>,
  maxValue: ComputedRef<number>,
  emit: SetupContext<SliderEmits>['emit'],
  elFormItem: FormItemContext
): any => {
  const _emit = (val: Arrayable<number>): void => {
    emit(UPDATE_MODEL_EVENT, val)
    emit(INPUT_EVENT, val)
  }

  const valueChanged = (): boolean => {
    if (props.range) {
      return ![minValue.value, maxValue.value].every(
        (item, index) => item === (initData.oldValue as number[])[index]
      )
    } else {
      return props.modelValue !== initData.oldValue
    }
  }

  const setValues = (): void => {
    if (props.min > props.max) {
      throwError('Slider', 'min should not be greater than max.')
    }
    const val = props.modelValue
    if (props.range && Array.isArray(val)) {
      if (val[1] < props.min) {
        _emit([props.min, props.min])
      } else if (val[0] > props.max) {
        _emit([props.max, props.max])
      } else if (val[0] < props.min) {
        _emit([props.min, val[1]])
      } else if (val[1] > props.max) {
        _emit([val[0], props.max])
      } else {
        initData.firstValue = val[0]
        initData.secondValue = val[1]
        if (valueChanged()) {
          if (props.validateEvent) {
            elFormItem?.validate?.('change').catch((err: any) => warning('slider', err))
          }
          initData.oldValue = val.slice()
        }
      }
    } else if (!props.range && typeof val === 'number' && !Number.isNaN(val)) {
      if (val < props.min) {
        _emit(props.min)
      } else if (val > props.max) {
        _emit(props.max)
      } else {
        initData.firstValue = val
        if (valueChanged()) {
          if (props.validateEvent) {
            elFormItem?.validate?.('change').catch((err: any) => warning('slider', err))
          }
          initData.oldValue = val
        }
      }
    }
  }

  setValues()

  watch(
    () => initData.dragging,
    (val) => {
      if (!val) {
        setValues()
      }
    }
  )

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (
        initData.dragging ||
        (Array.isArray(val) &&
          Array.isArray(oldVal) &&
          val.every((item, index) => item === oldVal[index]) &&
          initData.firstValue === val[0] &&
          initData.secondValue === val[1])
      ) {
        return
      }
      setValues()
    },
    {
      deep: true
    }
  )

  watch(
    () => [props.min, props.max],
    () => {
      setValues()
    }
  )
}
