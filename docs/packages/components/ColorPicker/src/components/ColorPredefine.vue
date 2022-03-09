<template>
  <div class="fz-color-predefine">
    <div class="fz-color-predefine__colors">
      <div
        v-for="(item, index) in rgbaColors"
        :key="colors[index]"
        class="fz-color-predefine__color-selector"
        :class="{ selected: item.selected, 'is-alpha': item._alpha < 100 }"
        @click="handleSelect(index)"
      >
        <div :style="{ backgroundColor: item.value }"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, watchEffect, defineComponent, inject } from 'vue';
import Color from '../utils';

import type { PropType } from 'vue';
import { IUseOptions } from '../ColorPicker';
import { FZ_COLOR_PICKER_OPTIONS_KEY_INJECT_KEY } from '@fzui/constants';

export default defineComponent({
  name: 'ColorPredefine',
  props: {
    colors: { type: Array as PropType<string[]>, required: true },
    color: {
      type: Object as PropType<Color>,
      required: true,
    },
  },
  setup(props) {
    const { currentColor } = inject<IUseOptions>(FZ_COLOR_PICKER_OPTIONS_KEY_INJECT_KEY)!;
    // data
    const rgbaColors = ref(parseColors(props.colors, props.color));

    // watch
    watch(
      () => currentColor.value,
      (val) => {
        const color = new Color();
        color.fromString(val);

        rgbaColors.value.forEach((item) => {
          item.selected = color.compare(item);
        });
      },
    );
    watchEffect(() => {
      rgbaColors.value = parseColors(props.colors, props.color);
    });

    function handleSelect(index: number) {
      props.color.fromString(props.colors[index]);
    }
    function parseColors(colors: any[], color: Color) {
      return colors.map((value) => {
        const c = new Color();
        c.enableAlpha = true;
        c.format = 'rgba';
        c.fromString(value);
        c.selected = c.value === color.value;
        return c;
      });
    }
    return {
      rgbaColors,
      handleSelect,
    };
  },
});
</script>
