<script lang="ts" setup>
  import { ref } from 'vue'

  import type { TagProps } from 'fz-design'

  interface Item {
    type: TagProps['type']
    label: string
  }

  const items = ref<Item[]>([
    { type: '', label: 'Tag 1' },
    { type: 'success', label: 'Tag 2' },
    { type: 'info', label: 'Tag 3' },
    { type: 'error', label: 'Tag 4' },
    { type: 'warning', label: 'Tag 5' }
  ])
</script>

<template>
  <fz-space>
    <span class="m-1">Dark</span>
    <fz-tag
      v-for="item in items"
      :key="item.label"
      :type="item.type"
      class="mx-1"
      effect="dark"
    >
      {{ item.label }}
    </fz-tag>
  </fz-space>

  <fz-space>
    <span class="m-1">Light</span>
    <fz-tag
      v-for="item in items"
      :key="item.label"
      class="mx-1"
      :type="item.type"
      effect="light"
    >
      {{ item.label }}
    </fz-tag>
  </fz-space>

  <fz-space>
    <span class="m-1">Plain</span>
    <fz-tag
      v-for="item in items"
      :key="item.label"
      class="mx-1"
      :type="item.type"
      effect="plain"
    >
      {{ item.label }}
    </fz-tag>
  </fz-space>
</template>

<style scoped>
  .mx-1 {
    margin-left: 4px;
  }

  .m-1 {
    margin: 4px;
  }
</style>
