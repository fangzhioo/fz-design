<script setup lang="ts">
import { computed, inject } from 'vue'
import { isNumber, isObject } from '../../../utils'

import { Props } from './props'
import { FZ_LAYOUT_ROW_INJECT_KEY } from '../../../constants';
import type { CSSProperties } from 'vue'
import type { RowContext } from '../../row'

defineOptions({
  name: 'FzCol'
})

const props = defineProps(Props)

const { gutter } = inject<RowContext>(FZ_LAYOUT_ROW_INJECT_KEY, { gutter: computed(() => 0) })

const style = computed(() => {
  const styles: CSSProperties = {}
  if (gutter.value) {
    styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`
  }
  return styles
})

const colKls = computed(() => {
  const classes: string[] = []
  const pos = ['span', 'offset', 'pull', 'push'] as const

  pos.forEach((prop) => {
    const size = props[prop]
    if (isNumber(size)) {
      if (prop === 'span') classes.push(`fz-col-${props[prop]}`)
      else if (size > 0) classes.push(`fz-col-${prop}-${props[prop]}`)
    }
  })

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  sizes.forEach((size) => {
    if (isNumber(props[size])) {
      classes.push(`fz-col-${size}-${props[size]}`)
    } else if (isObject(props[size])) {
      Object.entries(props[size]).forEach(([prop, sizeProp]) => {
        classes.push(
          prop !== 'span'
            ? `fz-col-${size}-${prop}-${sizeProp}`
            : `fz-col-${size}-${sizeProp}`
        )
      })
    }
  })

  // this is for the fix
  if (gutter.value) {
    classes.push('is-guttered')
  }
  return ['fz-col', classes]
})
</script>

<template>
  <component :is="tag" :class="colKls" :style="style">
    <slot />
  </component>
</template>
