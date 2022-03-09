<template>
  <div>
    <fz-radio-group v-model="radio1" size="large">
      <fz-radio-button label="New York"></fz-radio-button>
      <fz-radio-button label="Washington"></fz-radio-button>
      <fz-radio-button label="Los Angeles"></fz-radio-button>
      <fz-radio-button label="Chicago"></fz-radio-button>
    </fz-radio-group>
  </div>
  <div style="margin-top: 20px">
    <fz-radio-group v-model="radio2">
      <fz-radio-button label="New York"></fz-radio-button>
      <fz-radio-button label="Washington"></fz-radio-button>
      <fz-radio-button label="Los Angeles"></fz-radio-button>
      <fz-radio-button label="Chicago"></fz-radio-button>
    </fz-radio-group>
  </div>
  <div style="margin-top: 20px">
    <fz-radio-group v-model="radio3" size="small">
      <fz-radio-button label="New York"></fz-radio-button>
      <fz-radio-button label="Washington" disabled></fz-radio-button>
      <fz-radio-button label="Los Angeles"></fz-radio-button>
      <fz-radio-button label="Chicago"></fz-radio-button>
    </fz-radio-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const radio1 = ref('New York');
const radio2 = ref('New York');
const radio3 = ref('New York');
</script>
