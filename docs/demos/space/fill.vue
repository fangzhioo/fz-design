<script lang="ts" setup>
import { ref } from 'vue'

const fill = ref(true)
</script>

<template>
  <div>
    <div style="margin-bottom: 15px">fill: <fz-switch v-model="fill" /></div>
    <fz-space :fill="fill" wrap>
      <fz-card v-for="i in 3" :key="i" class="box-card">
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
