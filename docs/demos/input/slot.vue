<script lang="ts" setup>
  import { ref } from 'vue'

  const value = ref('')
</script>

<template>
  <fz-input v-model="value" placeholder="请输入....">
    <template #before>
      <fz-button>用户</fz-button>
    </template>
  </fz-input>
  <fz-input v-model="value" placeholder="请输入....">
    <template #after>
      <fz-button>查询</fz-button>
    </template>
  </fz-input>
  <fz-input v-model="value" placeholder="请输入....">
    <template #before>
      <fz-button>用户</fz-button>
    </template>
    <template #after>
      <fz-button>查询</fz-button>
    </template>
  </fz-input>
</template>

<style scoped>
.fz-input {
  margin-bottom: 20px;
}
</style>
