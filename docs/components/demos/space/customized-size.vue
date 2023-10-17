<script lang="ts" setup>
import { ref } from 'vue'

const size = ref(20)
</script>

<template>
  <fz-slider v-model="size" />
  <fz-space wrap :size="size">
    <fz-card v-for="i in 2" :key="i" class="box-card" style="width: 250px">
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
</template>
