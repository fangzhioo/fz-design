<script lang="ts" setup>
import { ref } from 'vue'

const direction = ref('horizontal')
const fillRatio = ref(30)
</script>

<template>
  <div>
    <div style="margin-bottom: 15px">
      direction:
      <fz-radio v-model="direction" label="horizontal">horizontal</fz-radio>
      <fz-radio v-model="direction" label="vertical">vertical</fz-radio>
    </div>
    <div style="margin-bottom: 15px">
      fillRatio:<fz-slider v-model="fillRatio" />
    </div>
    <fz-space
      fill
      wrap
      :fill-ratio="fillRatio"
      :direction="direction"
      style="width: 100%"
    >
      <fz-card v-for="i in 5" :key="i" class="box-card">
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
  </div>
</template>
