<script lang="ts" setup>
import { ref } from 'vue'
const size = ref('default')
</script>

<template>
  <fz-space direction="vertical" alignment="start" :size="30">
    <fz-radio-group v-model="size">
      <fz-radio :label="'large'">large</fz-radio>
      <fz-radio :label="'default'">default</fz-radio>
      <fz-radio :label="'small'">small</fz-radio>
    </fz-radio-group>

    <fz-space wrap :size="size">
      <fz-card v-for="i in 3" :key="i" class="box-card" style="width: 250px">
        <template #header>
          <div class="card-header">
            <span>Card name</span>
            <fz-button class="button" text>Operation button</fz-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">
          {{ 'List item ' + o }}
        </div>
      </fz-card>
    </fz-space>
  </fz-space>
</template>
