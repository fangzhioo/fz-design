<template>
  <div>
    <fz-check-tag checked style="margin-right: 8px">Checked</fz-check-tag>
    <fz-check-tag :checked="checked" @change="onChange">Toggle me</fz-check-tag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(false);

const onChange = (status: boolean) => {
  checked.value = status;
};
</script>
