<template>
  <div :class="switchKls" role="switch" :aria-checked="checked" :aria-disabled="switchDisabled" @click.prevent="switchValue">
    <input
      :id="id"
      ref="input"
      class="fz-switch__input"
      type="checkbox"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      @change="handleChange"
      @keydown.enter="switchValue"
    />
    <span v-if="!inlinePrompt && (inactiveIcon || inactiveText)" :class="['fz-switch__label', 'fz-switch__label--left', { 'is-active': !checked }]">
      <fz-icon v-if="inactiveIcon" :name="inactiveIcon"></fz-icon>
      <span v-if="!inactiveIcon && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>
    <span ref="core" class="fz-switch__core" :style="{ width: (width || 40) + 'px' }">
      <div v-if="inlinePrompt" class="fz-switch__inner">
        <template v-if="activeIcon || inactiveIcon">
          <fz-icon v-if="activeIcon" :name="activeIcon" :class="['is-icon', checked ? 'is-show' : 'is-hide']"> </fz-icon>
          <fz-icon v-if="inactiveIcon" :name="inactiveIcon" :class="['is-icon', !checked ? 'is-show' : 'is-hide']"> </fz-icon>
        </template>
        <template v-else-if="activeText || inactiveIcon">
          <span v-if="activeText" :class="['is-text', checked ? 'is-show' : 'is-hide']" :aria-hidden="!checked">
            {{ activeText.substring(0, 3) }}
          </span>
          <span v-if="inactiveText" :class="['is-text', !checked ? 'is-show' : 'is-hide']" :aria-hidden="checked">
            {{ inactiveText.substring(0, 3) }}
          </span>
        </template>
      </div>
      <div class="fz-switch__action">
        <fz-icon v-if="loading" class="is-loading" name="loading"></fz-icon>
      </div>
    </span>
    <span v-if="!inlinePrompt && (activeIcon || activeText)" :class="['fz-switch__label', 'fz-switch__label--right', { 'is-active': checked }]">
      <fz-icon v-if="activeIcon" :name="activeIcon"></fz-icon>
      <span v-if="!activeIcon && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import { useSize } from '@/hooks/useSize';
import { Icon } from '@fzui/components/Icon';
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { useDisabled, useForm } from '@fzui/hooks';
import { debugWarn, isBoolean, isPromise, throwError } from '@fzui/utils';
import { computed, defineComponent, nextTick, onMounted, ref, watch } from 'vue';
import { switchEmits, switchProps } from './Switch';

export default defineComponent({
  name: 'FzSwitch',
  components: {
    FzIcon: Icon,
  },
  props: switchProps,
  emits: switchEmits,
  setup(props, { emit }) {
    const { formItem } = useForm();
    const switchDisabled = useDisabled(computed(() => props.loading));

    const switchSize = useSize();
    const isModelValue = ref(props.modelValue !== false);
    const input = ref<HTMLInputElement>();
    const core = ref<HTMLSpanElement>();

    const switchKls = computed(() => [
      'fz-switch',
      'fz-switch--' + switchSize.size.value,
      {
        'is-disabled': switchDisabled.value,
        'is-checked': checked.value,
      },
    ]);

    watch(
      () => props.modelValue,
      () => {
        isModelValue.value = true;
      },
    );

    watch(
      () => props.value,
      () => {
        isModelValue.value = false;
      },
    );

    const actualValue = computed(() => {
      return isModelValue.value ? props.modelValue : props.value;
    });

    const checked = computed(() => actualValue.value === props.activeValue);

    if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
      emit(UPDATE_MODEL_EVENT, props.inactiveValue);
      emit(CHANGE_EVENT, props.inactiveValue);
      emit(INPUT_EVENT, props.inactiveValue);
    }

    watch(checked, () => {
      input.value!.checked = checked.value;

      if (props.activeColor || props.inactiveColor) {
        setBackgroundColor();
      }

      if (props.validateEvent) {
        formItem?.validate?.('change').catch((err) => debugWarn(err));
      }
    });

    const handleChange = (): void => {
      const val = checked.value ? props.inactiveValue : props.activeValue;
      emit(UPDATE_MODEL_EVENT, val);
      emit(CHANGE_EVENT, val);
      emit(INPUT_EVENT, val);
      nextTick(() => {
        input.value!.checked = checked.value;
      });
    };

    const switchValue = (): void => {
      if (switchDisabled.value) {
        return;
      }

      const { beforeChange } = props;
      if (!beforeChange) {
        handleChange();
        return;
      }

      const shouldChange = beforeChange();

      const isExpectType = [isPromise(shouldChange), isBoolean(shouldChange)].some((i) => i);
      if (!isExpectType) {
        throwError('Switch', 'beforeChange must return type `Promise<boolean>` or `boolean`');
      }

      if (isPromise(shouldChange)) {
        shouldChange
          .then((result) => {
            if (result) {
              handleChange();
            }
          })
          .catch((e) => {
            debugWarn('Switch', `some error occurred: ${e}`);
          });
      } else if (shouldChange) {
        handleChange();
      }
    };

    const setBackgroundColor = (): void => {
      const newColor = checked.value ? props.activeColor : props.inactiveColor;
      const coreEl = core.value;
      if (props.borderColor) {
        coreEl!.style.borderColor = props.borderColor;
      } else if (!props.borderColor) {
        coreEl!.style.borderColor = newColor;
      }
      coreEl!.style.backgroundColor = newColor;
      (coreEl!.children[0] as HTMLDivElement).style.color = newColor;
    };

    const focus = (): void => {
      input.value?.focus?.();
    };

    onMounted(() => {
      if (props.activeColor || props.inactiveColor || props.borderColor) {
        setBackgroundColor();
      }

      input.value!.checked = checked.value;
    });

    return {
      input,
      core,
      switchDisabled,
      checked,
      switchKls,
      handleChange,
      switchValue,
      focus,
    };
  },
});
</script>
