<script lang="ts" setup>
  import { Props } from './props'

  defineOptions({name: 'FzCountDown'})

  const prop = defineProps(Props)
</script>

<template>
  <div class="fz-count-down">FzCountDown</div>
</template>
