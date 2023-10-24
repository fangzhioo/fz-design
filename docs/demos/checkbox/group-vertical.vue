<script lang="ts" setup>
    import { ref } from 'vue'
  
    const value = ref([])
  </script>
  
<template>
  <fz-checkbox-group v-model="value" vertical>
    <fz-checkbox label="1">备选项1</fz-checkbox>
    <fz-checkbox label="2">备选项2</fz-checkbox>
    <fz-checkbox label="3">备选项3</fz-checkbox>
  </fz-checkbox-group>
</template>
