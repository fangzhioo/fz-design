<script lang="ts">
  import { defineComponent, provide, reactive, toRef } from 'vue'
  import { FZ_BUTTON_GROUP_INJECT_KEY } from '../../../constants'
  import { Props } from './props'

  export default defineComponent({
    name: 'FzButtonGroup',
    props: Props,
    setup (props) {
      provide(
        FZ_BUTTON_GROUP_INJECT_KEY,
        reactive({
          size: toRef(props, 'size'),
          type: toRef(props, 'type')
        })
      )
    }
  })
</script>

<template>
  <div class="fz-button-group">
    <slot></slot>
  </div>
</template>
