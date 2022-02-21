<template>
  <fz-button type="text" @click="dialogVisible = true">Click to open Dialog </fz-button>

  <fz-dialog v-model="dialogVisible" title="Tips" width="30%" draggable>
    <span>It's a draggable Dialog</span>
    <template #footer>
      <span class="dialog-footer">
        <fz-button @click="dialogVisible = false">Cancel</fz-button>
        <fz-button type="primary" @click="dialogVisible = false">Confirm</fz-button>
      </span>
    </template>
  </fz-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
</script>
