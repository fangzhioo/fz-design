<template>
  <div v-if="isAutoWidth" ref="el" class="fz-form-item__label-wrap" :style="labelStyle">
    <slot />
  </div>
  <slot ref="el" v-else />
</template>

<script lang="ts">
import { computed, CSSProperties, defineComponent, inject, nextTick, onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { FZ_FORMITEM_INJECT_KEY, FZ_FORM_INJECT_KEY } from '@fzui/constants';
import { FzFormContext, FzFormItemContext } from '@fzui/hooks';
import { throwError } from '@fzui/utils';

const COMPONENT_NAME = 'FzFormItemLabel';

export default defineComponent({
  name: COMPONENT_NAME,
  props: {
    isAutoWidth: {
      type: Boolean,
    },
    updateAll: {
      type: Boolean,
    },
  },
  setup(props, { slots }) {
    const formContext = inject<FzFormContext | undefined>(FZ_FORM_INJECT_KEY, undefined);
    const formItemContext = inject<FzFormItemContext>(FZ_FORMITEM_INJECT_KEY);
    if (!formItemContext) throwError(COMPONENT_NAME, 'usage: <el-form-item><label-wrap /></el-form-item>');

    const el = ref<HTMLElement>();
    const computedWidth = ref(0);

    const getLabelWidth = () => {
      if (el.value?.firstElementChild) {
        const width = window.getComputedStyle(el.value.firstElementChild).width;
        return Math.ceil(Number.parseFloat(width));
      } else {
        return 0;
      }
    };

    const updateLabelWidth = (action: 'update' | 'remove' = 'update') => {
      nextTick(() => {
        if (slots.default && props.isAutoWidth) {
          if (action === 'update') {
            computedWidth.value = getLabelWidth();
          } else if (action === 'remove') {
            formContext?.deregisterLabelWidth(computedWidth.value);
          }
        }
      });
    };
    const updateLabelWidthFn = () => updateLabelWidth('update');

    onMounted(() => {
      updateLabelWidthFn();
    });
    onBeforeUnmount(() => {
      updateLabelWidth('remove');
    });
    onUpdated(() => updateLabelWidthFn());

    watch(computedWidth, (val, oldVal) => {
      if (props.updateAll) {
        formContext?.registerLabelWidth(val, oldVal);
      }
    });

    useResizeObserver(
      computed(() => (el.value?.firstElementChild ?? null) as HTMLElement | null),
      updateLabelWidthFn,
    );

    const labelStyle = computed<CSSProperties>(() => {
      const autoLabelWidth = formContext?.autoLabelWidth;
      const style: CSSProperties = {};
      if (autoLabelWidth && autoLabelWidth !== 'auto') {
        const marginWidth = Math.max(0, Number.parseInt(autoLabelWidth, 10) - computedWidth.value);
        const marginPosition = formContext.labelPosition === 'left' ? 'marginRight' : 'marginLeft';
        if (marginWidth) {
          style[marginPosition] = `${marginWidth}px`;
        }
      }
      return style;
    });

    return {
      el,
      labelStyle,
    };
  },
});
</script>
