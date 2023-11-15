<script setup lang="ts">
import { ref } from 'vue'
import { IconSearch } from '@fz-design/fz-design-icon'
const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>

<template>
  <div>
    <fz-input v-model="input1" placeholder="Please input">
      <template #prepend>Http://</template>
    </fz-input>
  </div>
  <div class="mt-4">
    <fz-input v-model="input2" placeholder="Please input">
      <template #append>.com</template>
    </fz-input>
  </div>
  <div class="mt-4">
    <fz-input
      v-model="input3"
      placeholder="Please input"
      class="input-with-select"
    >
      <template #prepend>
        <fz-button>头部</fz-button>
      </template>
      <template #append>
        <fz-svg-icon :icon="IconSearch" />
      </template>
    </fz-input>
  </div>
  <div class="mt-4">
    <fz-input
      v-model="input3"
      placeholder="Please input"
      class="input-with-select"
    >
      <template #prepend>
        <fz-svg-icon :icon="IconSearch" />
      </template>
      <template #append>
        <fz-button>尾部</fz-button>
      </template>
    </fz-input>
  </div>
</template>

<style>
.input-with-select .fz-input-group__prepend {
  background-color: var(--fz-fill-color-blank);
}
</style>

<style scoped>
.mt-4 {
  margin-top: 16px;
}
</style>
