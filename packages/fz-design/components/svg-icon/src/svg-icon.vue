<script lang="ts" setup>
  import { computed } from 'vue'
  import { addUnit } from '../../../utils'
  import { Props } from './props'
  import type { CSSProperties } from 'vue'
  import { useNamespace } from '../../../hooks'

  defineOptions({ name: 'FzSvgIcon' })

  const ns = useNamespace('svg-icon')

  const prop = defineProps(Props)

  const styles = computed<CSSProperties>(() => {
    /** 样式列表 */
    const styleList: CSSProperties = {}
    if (prop.color) {
      styleList[ns.cssVarBlockName('color') as any] = prop.color
    }
    if (prop.size) {
      styleList[ns.cssVarBlockName('size') as any] = addUnit(prop.size)
    }
    return styleList
  })
</script>

<template>
  <i role="img" :class="ns.b()" :style="styles" text-indent="middle">
    <component :is="icon" v-if="icon" />
    <slot v-else />
  </i>
</template>
