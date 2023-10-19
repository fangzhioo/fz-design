<script lang="ts" setup>
import { ref } from 'vue'
import { IconFrown, IconMeh, IconSmile } from '@fz-design/fz-design-icon'

const value = ref()
const icons = [IconFrown, IconMeh, IconSmile] // same as { 2: ChatRound, 4: { value: ChatLineRound, excluded: true }, 5: ChatDotRound }
</script>

<template>
  <fz-rate
    v-model="value"
    :icons="icons"
    :void-icon="IconMeh"
    :colors="['#409eff', '#67c23a', '#FF9900']"
  />
</template>
