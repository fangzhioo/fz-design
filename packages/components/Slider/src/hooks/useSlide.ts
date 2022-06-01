import { computed, ComputedRef, inject, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { FZ_FORM_INJECT_KEY, FZ_FORMITEM_INJECT_KEY, CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import type { CSSProperties, ComponentInternalInstance, Ref } from 'vue';
import type { ButtonRefs, ISliderButton, ISliderInitData, ISliderProps, SliderProps } from '../Slider';
import type { FzFormContext, FzFormItemContext } from '@fzui/hooks';
import { AnyFunction, debugWarn, throwError, isEqual } from '@fzui/utils';

export const useSlide = (props: ISliderProps, initData: ISliderInitData, emit: ComponentInternalInstance['emit']) => {
  const elForm = inject(FZ_FORM_INJECT_KEY, {} as FzFormContext);
  const elFormItem = inject(FZ_FORMITEM_INJECT_KEY, {} as FzFormItemContext);

  const slider = shallowRef<HTMLElement>();

  const firstButton = ref<ISliderButton>();

  const secondButton = ref<ISliderButton>();

  const buttonRefs: ButtonRefs = {
    firstButton,
    secondButton,
  };

  const sliderDisabled = computed(() => {
    return props.disabled || elForm.disabled || false;
  });

  const minValue = computed(() => {
    return Math.min(initData.firstValue, initData.secondValue);
  });

  const maxValue = computed(() => {
    return Math.max(initData.firstValue, initData.secondValue);
  });

  const barSize = computed(() => {
    return props.range
      ? `${(100 * (maxValue.value - minValue.value)) / (props.max - props.min)}%`
      : `${(100 * (initData.firstValue - props.min)) / (props.max - props.min)}%`;
  });

  const barStart = computed(() => {
    return props.range ? `${(100 * (minValue.value - props.min)) / (props.max - props.min)}%` : '0%';
  });

  const runwayStyle = computed<CSSProperties>(() => {
    return props.vertical ? { height: props.height } : {};
  });

  const barStyle = computed<CSSProperties>(() => {
    return props.vertical
      ? {
          height: barSize.value,
          bottom: barStart.value,
        }
      : {
          width: barSize.value,
          left: barStart.value,
        };
  });

  const resetSize = () => {
    if (slider.value) {
      initData.sliderSize = slider.value[`client${props.vertical ? 'Height' : 'Width'}`];
    }
  };

  const getButtonRefByPercent = (percent: number): Ref<ISliderButton | undefined> => {
    const targetValue = props.min + (percent * (props.max - props.min)) / 100;
    if (!props.range) {
      return firstButton;
    }
    let buttonRefName: 'firstButton' | 'secondButton';
    if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) {
      buttonRefName = initData.firstValue < initData.secondValue ? 'firstButton' : 'secondButton';
    } else {
      buttonRefName = initData.firstValue > initData.secondValue ? 'firstButton' : 'secondButton';
    }
    return buttonRefs[buttonRefName];
  };

  const setPosition = (percent: number): Ref<ISliderButton | undefined> => {
    const buttonRef = getButtonRefByPercent(percent);
    buttonRef.value!.setPosition(percent);
    return buttonRef;
  };

  const setFirstValue = (firstValue: number | null | undefined): any => {
    initData.firstValue = typeof firstValue === 'number' ? firstValue : 0;
    _emit(props.range ? [minValue.value, maxValue.value] : initData.firstValue);
  };

  const setSecondValue = (secondValue: number) => {
    initData.secondValue = secondValue;

    if (props.range) {
      _emit([minValue.value, maxValue.value]);
    }
  };

  const _emit = (val: number | number[]) => {
    emit(UPDATE_MODEL_EVENT, val);
    emit(INPUT_EVENT, val);
  };

  const emitChange = async () => {
    await nextTick();
    emit(CHANGE_EVENT, props.range ? [minValue.value, maxValue.value] : props.modelValue);
  };

  const handleSliderPointerEvent = (event: MouseEvent | TouchEvent): Ref<ISliderButton | undefined> | undefined => {
    if (sliderDisabled.value || initData.dragging) return;
    resetSize();
    let newPercent = 0;
    if (props.vertical) {
      const clientY = (event as TouchEvent).touches?.item(0)?.clientY ?? (event as MouseEvent).clientY;
      const sliderOffsetBottom = slider.value!.getBoundingClientRect().bottom;
      newPercent = ((sliderOffsetBottom - clientY) / initData.sliderSize) * 100;
    } else {
      const clientX = (event as TouchEvent).touches?.item(0)?.clientX ?? (event as MouseEvent).clientX;
      const sliderOffsetLeft = slider.value!.getBoundingClientRect().left;
      newPercent = ((clientX - sliderOffsetLeft) / initData.sliderSize) * 100;
    }
    if (newPercent < 0 || newPercent > 100) return;
    return setPosition(newPercent);
  };

  const onSliderWrapperPrevent = (event: TouchEvent) => {
    if (buttonRefs['firstButton'].value?.dragging || buttonRefs['secondButton'].value?.dragging) {
      event.preventDefault();
    }
  };

  const onSliderDown = async (event: MouseEvent | TouchEvent) => {
    const buttonRef = handleSliderPointerEvent(event);
    if (buttonRef) {
      await nextTick();
      buttonRef.value!.onButtonDown(event);
    }
  };

  const onSliderClick = (event: MouseEvent | TouchEvent) => {
    const buttonRef = handleSliderPointerEvent(event);
    if (buttonRef) {
      emitChange();
    }
  };

  return {
    elFormItem,
    slider,
    firstButton,
    secondButton,
    sliderDisabled,
    minValue,
    maxValue,
    runwayStyle,
    barStyle,
    resetSize,
    setPosition,
    emitChange,
    onSliderWrapperPrevent,
    onSliderClick,
    onSliderDown,
    setFirstValue,
    setSecondValue,
  };
};

export const useWatch = (
  props: SliderProps,
  initData: ISliderInitData,
  minValue: ComputedRef<number>,
  maxValue: ComputedRef<number>,
  emit: any,
  elFormItem: FzFormItemContext,
) => {
  const _emit = (val: number | number[]) => {
    emit(UPDATE_MODEL_EVENT, val);
    emit(INPUT_EVENT, val);
  };

  const valueChanged = () => {
    if (props.range) {
      return !isEqual([minValue.value, maxValue.value], initData.oldValue);
    } else {
      return props.modelValue !== initData.oldValue;
    }
  };

  const setValues = () => {
    if (props.min > props.max) {
      throwError('Slider', 'min should not be greater than max.');
      return;
    }
    const val = props.modelValue;
    if (props.range && Array.isArray(val)) {
      if (val[1] < props.min) {
        _emit([props.min, props.min]);
      } else if (val[0] > props.max) {
        _emit([props.max, props.max]);
      } else if (val[0] < props.min) {
        _emit([props.min, val[1]]);
      } else if (val[1] > props.max) {
        _emit([val[0], props.max]);
      } else {
        initData.firstValue = val[0];
        initData.secondValue = val[1];
        if (valueChanged()) {
          elFormItem.validate?.('change').catch((err) => debugWarn(err));
          initData.oldValue = val.slice();
        }
      }
    } else if (!props.range && typeof val === 'number' && !Number.isNaN(val)) {
      if (val < props.min) {
        _emit(props.min);
      } else if (val > props.max) {
        _emit(props.max);
      } else {
        initData.firstValue = val;
        if (valueChanged()) {
          elFormItem.validate?.('change').catch((err) => debugWarn(err));
          initData.oldValue = val;
        }
      }
    }
  };

  setValues();

  watch(
    () => initData.dragging,
    (val) => {
      if (!val) {
        setValues();
      }
    },
  );

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
        return;
      }
      setValues();
    },
    {
      deep: true,
    },
  );

  watch(
    () => [props.min, props.max],
    () => {
      setValues();
    },
  );
};

export const useLifecycle = (props: SliderProps, initData: ISliderInitData, resetSize: AnyFunction) => {
  const sliderWrapper = ref<HTMLElement>();

  onMounted(async () => {
    if (props.range) {
      if (Array.isArray(props.modelValue)) {
        initData.firstValue = Math.max(props.min, props.modelValue[0]);
        initData.secondValue = Math.min(props.max, props.modelValue[1]);
      } else {
        initData.firstValue = props.min;
        initData.secondValue = props.max;
      }
      initData.oldValue = [initData.firstValue, initData.secondValue];
    } else {
      if (typeof props.modelValue !== 'number' || Number.isNaN(props.modelValue)) {
        initData.firstValue = props.min;
      } else {
        initData.firstValue = Math.min(props.max, Math.max(props.min, props.modelValue));
      }
      initData.oldValue = initData.firstValue;
    }

    window.addEventListener('resize', resetSize);

    await nextTick();
    resetSize();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', resetSize);
  });

  return {
    sliderWrapper,
  };
};
