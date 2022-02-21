<template>
  <fz-button type="text" @click="outerVisible = true">open the outer Dialog</fz-button>

  <fz-dialog v-model="outerVisible" title="Outer Dialog">
    <template #default>
      <fz-dialog v-model="innerVisible" width="30%" title="Inner Dialog" append-to-body> </fz-dialog>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <fz-button @click="outerVisible = false">Cancel</fz-button>
        <fz-button type="primary" @click="innerVisible = true">open the inner Dialog</fz-button>
      </div>
    </template>
  </fz-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const outerVisible = ref(false);
const innerVisible = ref(false);
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
