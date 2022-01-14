<template>
  <div>
    <fz-checkbox-group v-model="checkList">
      <fz-checkbox label="Option A" />
      <fz-checkbox label="Option B" />
      <fz-checkbox label="Option C" />
      <fz-checkbox label="disabled" disabled />
      <fz-checkbox label="selected and disabled" disabled />
    </fz-checkbox-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const checkList = ref(['selected and disabled', 'Option A']);
</script>
