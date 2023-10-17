<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(3)

const add = (): void => {
  count.value++
}
const onDelete = (): void => {
  if (count.value > 0) {
    count.value--
  }
}
</script>

<template>
  <fz-button @click="add">Add Item</fz-button>
  <fz-button @click="onDelete">Delete Item</fz-button>
  <fz-scrollbar max-height="400px">
    <p v-for="item in count" :key="item" class="scrollbar-demo-item">
      {{ item }}
    </p>
  </fz-scrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--fz-color-primary-light-9);
  color: var(--fz-color-primary);
}
</style>
