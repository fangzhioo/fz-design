<script setup lang="ts">
  import { IconBell } from '@fz-design/fz-design-icon'

  const confirmEvent = () => {
    console.log('confirm!')
  }
  const cancelEvent = () => {
    console.log('cancel!')
  }
</script>

<template>
  <fz-popconfirm
    confirm-button-text="Yes"
    cancel-button-text="No"
    :icon="IconBell"
    icon-color="#626AEF"
    title="Are you sure to delete this?"
    @confirm="confirmEvent"
    @cancel="cancelEvent"
  >
    <template #reference>
      <fz-button>Delete</fz-button>
    </template>
  </fz-popconfirm>
</template>
