<template>
  <main class="fz-main">
    <slot></slot>
  </main>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FzMain',
});
</script>
