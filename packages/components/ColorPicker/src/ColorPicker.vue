<template>
  <fz-tooltip
    ref="popper"
    v-model:visible="showPicker"
    :show-arrow="false"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :offset="0"
    :gpu-acceleration="false"
    :popper-class="['fz-color-picker__panel', 'fz-color-dropdown', popperClass]"
    :stop-popper-mouse-event="false"
    effect="light"
    trigger="click"
    transition="fz-zoom-in-top"
    persistent
  >
    <template #content>
      <div v-click-outside="hide">
        <div class="fz-color-dropdown__main-wrapper">
          <hue-slider ref="hue" class="hue-slider" :color="color" vertical />
          <sv-panel ref="svPanel" :color="color" />
        </div>
        <alpha-slider v-if="showAlpha" ref="alpha" :color="color" />
        <color-predefine v-if="predefine" ref="predefine" :color="color" :colors="predefine" />
        <div class="fz-color-dropdown__btns">
          <span class="fz-color-dropdown__value">
            <fz-input v-model="customInput" :validate-event="false" size="small" @keyup.enter="handleConfirm" @blur="handleConfirm" />
          </span>
          <fz-button size="small" type="text" class="fz-color-dropdown__link-btn" @click="clear">
            {{ t('fz.colorpicker.clear') }}
          </fz-button>
          <fz-button plain size="small" class="fz-color-dropdown__btn" @click="confirmValue">
            {{ t('fz.colorpicker.confirm') }}
          </fz-button>
        </div>
      </div>
    </template>
    <template #default>
      <div :class="['fz-color-picker', { 'is-disabled': colorDisabled }, `fz-color-picker--${colorSize}`]">
        <div v-if="colorDisabled" class="fz-color-picker__mask"></div>
        <div class="fz-color-picker__trigger" @click="handleTrigger">
          <span :class="['fz-color-picker__color', { 'is-alpha': showAlpha }]">
            <span
              class="fz-color-picker__color-inner"
              :style="{
                backgroundColor: displayedColor,
              }"
            >
              <fz-icon v-show="modelValue || showPanelColor" class="fz-color-picker__icon is-icon-arrow-down" name="arrow-down-bold" />
              <fz-icon v-if="!modelValue && !showPanelColor" class="fz-color-picker__empty is-icon-close" name="close-bold" />
            </span>
          </span>
        </div>
      </div>
    </template>
  </fz-tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, inject, nextTick, onMounted, provide, reactive, ref, watch } from 'vue';
import { useLocale, useSize } from '@fzui/hooks';
import { ClickOutside } from '@fzui/directives';
import { debounce, debugWarn } from '@fzui/utils';
import { FZ_COLOR_PICKER_OPTIONS_KEY_INJECT_KEY, FZ_FORMITEM_INJECT_KEY, FZ_FORM_INJECT_KEY, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { Button, Icon, Input, Tooltip } from '@fzui/components';
import AlphaSlider from './components/AlphaSlider.vue';
import ColorPredefine from './components/ColorPredefine.vue';
import HueSlider from './components/HueSlider.vue';
import SvPanel from './components/SvPanel.vue';
import { colorPickerEmits, colorPickerProps, IUseOptions } from './ColorPicker';
import Color from './utils';

export default defineComponent({
  name: 'FzColorPicker',
  props: colorPickerProps,
  emits: colorPickerEmits,
  directives: {
    ClickOutside,
  },
  components: {
    FzTooltip: Tooltip,
    FzInput: Input,
    FzButton: Button,
    FzIcon: Icon,
    AlphaSlider,
    ColorPredefine,
    HueSlider,
    SvPanel,
  },
  setup(props, { emit }) {
    const { t } = useLocale();
    const elForm = inject<any>(FZ_FORM_INJECT_KEY, {} as any);
    const elFormItem = inject<any>(FZ_FORMITEM_INJECT_KEY, {} as any);

    const hue = ref<any>(null);
    const svPanel = ref<any>(null);
    const alpha = ref<any>(null);
    const popper = ref<HTMLElement | null>(null);
    // data
    const color = reactive(
      new Color({
        enableAlpha: props.showAlpha,
        format: props.colorFormat || '',
        value: props.modelValue,
      }),
    );
    const showPicker = ref(false);
    const showPanelColor = ref(false);
    const customInput = ref('');
    // computed
    const displayedColor = computed(() => {
      if (!props.modelValue && !showPanelColor.value) {
        return 'transparent';
      }
      return displayedRgb(color, props.showAlpha);
    });
    const colorSize = useSize();
    const colorDisabled = computed(() => {
      return Boolean(props.disabled || elForm.disabled);
    });

    const currentColor = computed(() => {
      return !props.modelValue && !showPanelColor.value ? '' : color.value;
    });
    // watch
    watch(
      () => props.modelValue,
      (newVal) => {
        if (!newVal) {
          showPanelColor.value = false;
        } else if (newVal && newVal !== color.value) {
          color.fromString(newVal);
        }
      },
    );
    watch(
      () => currentColor.value,
      (val) => {
        customInput.value = val;
        emit('active-change', val);
      },
    );

    watch(
      () => color.value,
      () => {
        if (!props.modelValue && !showPanelColor.value) {
          showPanelColor.value = true;
        }
      },
    );

    // methods
    function displayedRgb(color: Color, showAlpha: boolean) {
      if (!(color instanceof Color)) {
        throw Error('color should be instance of _color Class');
      }

      const { r, g, b } = color.toRgb();
      return showAlpha ? `rgba(${r}, ${g}, ${b}, ${color.get('alpha') / 100})` : `rgb(${r}, ${g}, ${b})`;
    }

    function setShowPicker(value: boolean) {
      showPicker.value = value;
    }

    const debounceSetShowPicker = debounce(setShowPicker, 100);

    function hide() {
      debounceSetShowPicker(false);
      resetColor();
    }

    function resetColor() {
      nextTick(() => {
        if (props.modelValue) {
          color.fromString(props.modelValue);
        } else {
          showPanelColor.value = false;
        }
      });
    }

    function handleTrigger() {
      if (colorDisabled.value) {
        return;
      }
      debounceSetShowPicker(!showPicker.value);
    }

    function handleConfirm() {
      color.fromString(customInput.value);
    }

    function confirmValue() {
      const value = color.value;
      emit(UPDATE_MODEL_EVENT, value);
      emit('change', value);
      elFormItem.validate?.('change').catch((err: any) => debugWarn(err));
      debounceSetShowPicker(false);
      // check if modelValue change, if not change, then reset color.
      nextTick(() => {
        const newColor = new Color({
          enableAlpha: props.showAlpha,
          format: props.colorFormat,
          value: props.modelValue,
        });
        if (!color.compare(newColor)) {
          resetColor();
        }
      });
    }

    function clear() {
      debounceSetShowPicker(false);
      emit(UPDATE_MODEL_EVENT, null);
      emit('change', null);
      if (props.modelValue !== null) {
        elFormItem.validate?.('change').catch((err: any) => debugWarn(err));
      }
      resetColor();
    }

    onMounted(() => {
      if (props.modelValue) {
        customInput.value = currentColor.value;
      }
    });
    watch(
      () => showPicker.value,
      () => {
        nextTick(() => {
          hue.value?.update();
          svPanel.value?.update();
          alpha.value?.update();
        });
      },
    );

    provide<IUseOptions>(FZ_COLOR_PICKER_OPTIONS_KEY_INJECT_KEY, {
      currentColor,
    });

    return {
      color: color as Color,
      colorDisabled,
      colorSize,
      displayedColor,
      showPanelColor,
      showPicker,
      customInput,
      handleConfirm,
      hide,
      handleTrigger,
      clear,
      confirmValue,
      t,
      hue,
      svPanel,
      alpha,
      popper,
    };
  },
});
</script>
