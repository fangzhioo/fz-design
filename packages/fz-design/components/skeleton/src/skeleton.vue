<script lang="ts" setup>
  import { Props } from './props'

  defineOptions({name: 'FzSkeleton'})

  const prop = defineProps(Props)
</script>

<template>
  <div class="fz-skeleton">FzSkeleton</div>
</template>
