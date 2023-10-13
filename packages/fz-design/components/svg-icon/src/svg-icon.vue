<script lang="ts" setup>
  import { computed } from 'vue';
  import { addUnit } from '../../../utils';
  import { Props } from './props';
  import type { CSSProperties } from 'vue';

  defineOptions({ name: 'FzSvgIcon' })

  const prop = defineProps(Props)

  const styles = computed<CSSProperties>(() => {
     /** 样式列表 */
     const styleList: CSSProperties = {}
    if (prop.color) {
      styleList['--svg-icon-color'] = prop.color
    }
    if (prop.size) {
      styleList['--svg-icon-size'] = addUnit(prop.size)
    }
     return styleList;
  })
</script>

<template>
  <i role="img" class="fz-svg-icon" :style="styles" text-indent="middle">
    <component :is="icon" v-if="icon" />
    <slot v-else />
  </i>
</template>
