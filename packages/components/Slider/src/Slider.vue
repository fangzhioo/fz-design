<template>
  <div
    :id="range ? inputId : undefined"
    ref="sliderWrapper"
    :class="sliderKls"
    :role="range ? 'group' : undefined"
    :aria-label="range && !isLabeledByFormItem ? groupLabel : undefined"
    :aria-labelledby="range && isLabeledByFormItem ? elFormItem.labelId : undefined"
    @touchstart="onSliderWrapperPrevent"
    @touchmove="onSliderWrapperPrevent"
  >
    <div
      ref="slider"
      :class="['fz-slider__runway', { 'show-input': showInput && !range, 'is-disabled': sliderDisabled }]"
      :style="runwayStyle"
      @mousedown="onSliderDown"
      @touchstart="onSliderDown"
    >
      <div class="fz-slider__bar" :style="barStyle" />
      <slider-button
        :id="!range ? inputId : undefined"
        ref="firstButton"
        :model-value="firstValue"
        :vertical="vertical"
        :tooltip-class="tooltipClass"
        role="slider"
        :aria-label="range || !isLabeledByFormItem ? firstButtonLabel : undefined"
        :aria-labelledby="!range && isLabeledByFormItem ? elFormItem.labelId : undefined"
        :aria-valuemin="min"
        :aria-valuemax="range ? secondValue : max"
        :aria-valuenow="firstValue"
        :aria-valuetext="firstValueText"
        :aria-orientation="vertical ? 'vertical' : 'horizontal'"
        :aria-disabled="sliderDisabled"
        @update:model-value="setFirstValue"
      />
      <slider-button
        v-if="range"
        ref="secondButton"
        :model-value="secondValue"
        :vertical="vertical"
        :tooltip-class="tooltipClass"
        role="slider"
        :aria-label="secondButtonLabel"
        :aria-valuemin="firstValue"
        :aria-valuemax="max"
        :aria-valuenow="secondValue"
        :aria-valuetext="secondValueText"
        :aria-orientation="vertical ? 'vertical' : 'horizontal'"
        :aria-disabled="sliderDisabled"
        @update:model-value="setSecondValue"
      />
      <div v-if="showStops">
        <div v-for="(item, key) in stops" :key="key" class="fz-slider__stop" :style="getStopStyle(item)" />
      </div>
      <template v-if="markList.length > 0">
        <div>
          <div v-for="(item, key) in markList" :key="key" :style="getStopStyle(item.position)" :class="['fz-slider__stop', 'fz-slider__marks-stop']" />
        </div>
        <div class="fz-slider__marks">
          <slider-marker v-for="(item, key) in markList" :key="key" :mark="item.mark" :style="getStopStyle(item.position)" />
        </div>
      </template>
    </div>
    <fz-input-number
      v-if="showInput && !range"
      ref="input"
      :model-value="firstValue"
      class="fz-slider__input"
      :step="step"
      :disabled="sliderDisabled"
      :controls="showInputControls"
      :min="min"
      :max="max"
      :debounce="debounce"
      :size="sliderInputSize"
      @update:model-value="setFirstValue"
      @change="emitChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, reactive, toRefs } from 'vue';
import { useFormItemInputId, useSize, useLocale } from '@fzui/hooks';
import { FZ_SLIDER_INJECT_KEY } from '@fzui/constants';
import { useSlide, useWatch, useLifecycle } from './hooks/useSlide';
import { InputNumber } from '@fzui/components';
import SliderMarker from './SliderMarker.vue';
import SliderButton from './SliderButton.vue';
import { useStops } from './hooks/useStops';
import { useMarks } from './hooks/useMarks';
import { sliderEmits, sliderProps } from './Slider';

import type { ISliderProps, ISliderInitData } from './Slider';

export default defineComponent({
  name: 'FzSlider',
  components: {
    FzInputNumber: InputNumber,
    SliderButton,
    SliderMarker,
  },
  props: sliderProps,
  emits: sliderEmits,
  setup(props, { emit }) {
    const { t } = useLocale();
    const initData = reactive<ISliderInitData>({
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      dragging: false,
      sliderSize: 1,
    });

    const {
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
      emitChange,
      onSliderWrapperPrevent,
      onSliderClick,
      onSliderDown,
      setFirstValue,
      setSecondValue,
    } = useSlide(props as ISliderProps, initData, emit);

    const { stops, getStopStyle } = useStops(props as any, initData, minValue, maxValue);

    const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: elFormItem,
    });

    const sliderWrapperSize = useSize();
    const sliderInputSize = computed(() => props.inputSize || sliderWrapperSize.value);

    const groupLabel = computed<string>(() => {
      return (
        props.label ||
        t('el.slider.defaultLabel', {
          min: props.min,
          max: props.max,
        })
      );
    });

    const firstButtonLabel = computed<string>(() => {
      if (props.range) {
        return props.rangeStartLabel || t('el.slider.defaultRangeStartLabel');
      } else {
        return groupLabel.value;
      }
    });

    const firstValueText = computed<string>(() => {
      return props.formatValueText ? props.formatValueText(firstValue.value) : `${firstValue.value}`;
    });

    const secondButtonLabel = computed<string>(() => {
      return props.rangeEndLabel || t('el.slider.defaultRangeEndLabel');
    });

    const secondValueText = computed<string>(() => {
      return props.formatValueText ? props.formatValueText(secondValue.value) : `${secondValue.value}`;
    });

    const sliderKls = computed(() => [
      'fz-slider',
      `fz-slider--${sliderWrapperSize.value}`,
      { 'is-vertical': props.vertical, 'fz-slider--with-input': props.showInput },
    ]);

    const markList = useMarks(props as any);

    useWatch(props, initData, minValue, maxValue, emit, elFormItem);

    const precision = computed(() => {
      const precisions = [props.min, props.max, props.step].map((item) => {
        const decimal = `${item}`.split('.')[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max.apply(null, precisions);
    });

    const { sliderWrapper } = useLifecycle(props, initData, resetSize);

    const { firstValue, secondValue, oldValue, dragging, sliderSize } = toRefs(initData);

    const updateDragging = (val: boolean) => {
      initData.dragging = val;
    };

    provide(FZ_SLIDER_INJECT_KEY, {
      ...toRefs(props),
      sliderSize,
      disabled: sliderDisabled,
      precision,
      emitChange,
      resetSize,
      updateDragging,
    });

    return {
      firstValue,
      secondValue,
      oldValue,
      dragging,
      sliderSize,

      inputId,
      isLabeledByFormItem,
      elFormItem,

      slider,
      groupLabel,
      firstButton,
      firstButtonLabel,
      firstValueText,
      secondButton,
      secondButtonLabel,
      secondValueText,
      sliderDisabled,
      runwayStyle,
      barStyle,
      emitChange,
      onSliderClick,
      onSliderWrapperPrevent,
      onSliderDown,
      getStopStyle,
      setFirstValue,
      setSecondValue,

      stops,
      markList,

      sliderWrapper,
      sliderWrapperSize,
      sliderInputSize,
      sliderKls,
    };
  },
});
</script>
