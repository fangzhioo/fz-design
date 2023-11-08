<script setup lang="ts">
  import { IconBell } from '@fz-design/fz-design-icon'
</script>

<template>
  <fz-popconfirm
    width="220"
    confirm-button-text="OK"
    cancel-button-text="No, Thanks"
    :icon="IconBell"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
  >
    <template #reference>
      <fz-button>Delete</fz-button>
    </template>
  </fz-popconfirm>
</template>
