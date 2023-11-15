<script setup lang="ts">
  import { ref } from 'vue'
  import { IconCalendar, IconSearch } from '@fz-design/fz-design-icon'
  const input1 = ref('')
  const input2 = ref('')
  const input3 = ref('')
  const input4 = ref('')
</script>

<template>
  <div class="demo-input-suffix">
    <fz-space>
      <fz-text type="info">使用属性</fz-text>
      <fz-input
        v-model="input1"
        class="w-50 m-2"
        placeholder="Pick a date"
        :suffix-icon="IconCalendar"
      />
      <fz-input
        v-model="input2"
        class="w-50 m-2"
        placeholder="Type something"
        :prefix-icon="IconSearch"
      />
    </fz-space>
  </div>
  <div class="demo-input-suffix">
    <fz-space :gutter="20">
      <fz-text type="info">使用插槽</fz-text>
      <fz-input v-model="input3" class="w-50 m-2" placeholder="Pick a date">
        <template #suffix>
          <fz-svg-icon class="fz-input__icon" :icon="IconCalendar" />
        </template>
      </fz-input>
      <fz-input v-model="input4" class="w-50 m-2" placeholder="Type something">
        <template #prefix>
          <fz-svg-icon class="fz-input__icon" :icon="IconSearch" />
        </template>
      </fz-input>
    </fz-space>
  </div>
</template>

<style scoped>
  .w-50 {
    width: 200px;
  }
  .m-2 {
    margin: 8px;
  }
</style>
