<script lang="ts">
import { defineComponent, provide, ref, h } from 'vue';
import { timePickerEmits, timePickerProps } from './TimePicker';
import CommonPicker from './common/CommonPicker.vue';
import PanelTimePick from './components/PanelTimePick.vue';
import PanelTimeRange from './components/PanelTimeRange.vue';
import { CommonPickerInstance } from './common/CommonPicker';
import { FZ_POPPER_OPTIONS_INJECT_KEY, UPDATE_MODEL_EVENT } from '@fzui/constants';
import { DEFAULT_FORMATS_TIME } from './common/date';

export default defineComponent({
  name: 'FzTimePicker',
  install: null,
  props: timePickerProps,
  emits: timePickerEmits,
  setup(props, context) {
    const commonPicker = ref<CommonPickerInstance | null>(null);
    const type = props.isRange ? 'timerange' : 'time';
    const panel = props.isRange ? PanelTimeRange : PanelTimePick;
    const refProps = {
      ...props,
      focus: () => {
        commonPicker.value?.handleFocus();
      },
      blur: () => {
        commonPicker.value?.handleBlur();
      },
    };
    provide(FZ_POPPER_OPTIONS_INJECT_KEY, props.popperOptions);
    context.expose(refProps);
    return () => {
      const format = props.format ?? DEFAULT_FORMATS_TIME;
      return h(
        CommonPicker,
        {
          ...props, // allow format to be overwrite
          format,
          type,
          ref: commonPicker,
          'onUpdate:modelValue': (value) => context.emit(UPDATE_MODEL_EVENT, value),
        },
        {
          default: (scopedProps: any) => h(panel, scopedProps),
        },
      );
    };
  },
});
</script>
