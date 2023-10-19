<script setup lang="ts">
  import { computed, provide } from 'vue'
  import { FZ_LAYOUT_ROW_INJECT_KEY } from '../../../constants'

  import { Props } from './props'
  import type { CSSProperties } from 'vue'
  import type { RowContext } from './interface';

  defineOptions({
    name: 'FzRow'
  })

  const props = defineProps(Props)

  const gutter = computed(() => props.gutter)

  provide<RowContext>(FZ_LAYOUT_ROW_INJECT_KEY, {
    gutter
  })

  const style = computed(() => {
    const styles: CSSProperties = {}
    if (!props.gutter) {
      return styles
    }

    styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`
    return styles
  })

  const rowKls = computed(() => [
    'fz-row',
    {
      [`is-justify-${props.justify}`]: props.justify !== 'start',
      [`is-align-${props.align}`]: !!props.align
    }
  ])
</script>

<template>
  <component :is="tag" :class="rowKls" :style="style">
    <slot />
  </component>
</template>
