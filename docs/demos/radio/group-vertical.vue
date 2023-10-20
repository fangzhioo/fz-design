<script lang="ts" setup>
    import { ref } from 'vue'
  
    const value = ref('1')
  </script>
  
<template>
  <fz-radio-group v-model="value" vertical>
    <fz-radio label="1">备选项1</fz-radio>
    <fz-radio label="2">备选项2</fz-radio>
    <fz-radio label="3">备选项3</fz-radio>
  </fz-radio-group>
</template>
