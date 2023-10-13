<script lang="ts" setup>
  import { Props } from './props'

  defineOptions({name: 'Fz<%= displayName %>'})

  const prop = defineProps(Props)
</script>

<template>
  <div class="fz-<%= name %>">Fz<%= displayName %></div>
</template>
