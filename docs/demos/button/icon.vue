<script lang='ts' setup>
  import { IconBox, IconHeart, IconMic } from '@fz-design/fz-design-icon';
</script>

<template>
  <div>
    <fz-button type="primary" :icon="IconHeart">IconHeart</fz-button>
    <fz-button :icon="IconBox">IconBox</fz-button>
    <fz-button>
      <template #icon>
        <fz-svg-icon :icon="IconMic" />
      </template>
      IconMic
    </fz-button>
  </div>
</template>
