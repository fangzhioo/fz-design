<script lang="ts" setup>
  import { computed } from 'vue'
  import ImgEmpty from './img-empty.vue'
  import { Props } from './props'

  import type { CSSProperties } from 'vue'
  import { useLocale, useNamespace } from '../../../hooks'
  import { addUnit } from '../../../utils'

  defineOptions({
    name: 'FzEmpty'
  })

  const props = defineProps(Props)

  const { t } = useLocale()
  const ns = useNamespace('empty')
  const emptyDescription = computed(() => props.description || t('fz.table.emptyText'))
  const imageStyle = computed<CSSProperties>(() => ({
    width: addUnit(props.imageSize)
  }))
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('image')" :style="imageStyle">
      <img v-if="image" :src="image" ondragstart="return false" />
      <slot v-else name="image">
        <img-empty />
      </slot>
    </div>
    <div :class="ns.e('description')">
      <slot v-if="$slots.description" name="description" />
      <p v-else>{{ emptyDescription }}</p>
    </div>
    <div v-if="$slots.default" :class="ns.e('bottom')">
      <slot />
    </div>
  </div>
</template>
